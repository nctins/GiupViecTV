import { auth } from "google-auth-library";
import {ID_PREFIX, PAYMENT_METHOD, POST_STATE, POST_TYPE} from "../constants/db_constants";
import HTTP_STATUS_CODE from "../constants/http_code";
import SOCKET_ACT from "../constants/socket_action";
import { CANCEL_CREDIT, COMPLETE_CREDIT } from "../constants/system_constants";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";
import NotificationService from "../services/notification.service";
import PostsService from "../services/posts.service";
import VoucherService from "../services/voucher.service";
import RestScheduleService from "../services/rest_schedule.service";
import WorkingScheduleService from "../services/working_schedule.service";
import HelperService from "../services/helper_account.service";
import DistanceService from "../services/distance.service";
import HelperServiceWork from "../services/helper_service_work.service";
import ErrorResponse from "../utils/ErrorResponse";
import IDGenerator from "../utils/IDGenerator";
import { MIN_TIME_FREE_HELPER } from "../constants/db_constants";

const PostController = {};

PostController.getPosts = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let filter = {};
  if (USER_ROLE.CUSTOMER == role || USER_ROLE.ADMIN == role) {
    filter.customer_id = auth_info.id;
    filter.post_state = [
      POST_STATE.CANCEL,
      POST_STATE.COMPLETE,
      POST_STATE.PROCESSING,
      POST_STATE.INCOMPLETE,
    ];
  } else {
    filter.customer_id = "%";
    filter.post_state = [POST_STATE.PROCESSING];
  }

  const posts = await PostsService.getPosts(filter);

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: posts,
  });
};

PostController.getPostsByHelper = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let filter = {};

  filter.helper_id = auth_info.id;

  const posts = await PostsService.getPostsByHelper(filter);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: posts,
  });
};

PostController.getPostsByHelperFilterDate = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let filter = {};
  let now = new Date();
  let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  filter.helper_id = auth_info.id;
  filter.startDate = currentDate;
  filter.endDate = nextDate;

  const posts = await PostsService.getPostsByHelperFilterDate(filter);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: posts,
  });
};

const getDistance = async (origins, destinations) => {
  let distances = [];
  let r_distanse = await DistanceService.calculate_distance(origins, destinations);

  for (var j = 0; j < destinations.length; j++) {
    var origin = r_distanse.origin_addresses[0];
    var destination = r_distanse.destination_addresses[j];
    if (r_distanse.rows[0].elements[j].status == 'OK') {
        //type distance: {text: "5.0 km", value: 5000}
        var distance = r_distanse.rows[0].elements[j].distance;
        // console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance.text + '(' + distance.value + ')');
        distances.push(distance.value);
    } else {
        // console.log(destination + ' is not reachable by land from ' + origin);
        distances.push(-1);
    }
  }
  
  return distances;
}

const getTime = (time) => {
  let hours = time ? parseInt(time.substring(0,2)) : 0;
  let minus = time ? parseInt(time.substring(3,5)) : 0;
  return [hours,minus]
}

const getSecondTime = (time) => {
  let hours = time ? parseInt(time.substring(0,2)) : 0;
  let minus = time ? parseInt(time.substring(3,5)) : 0;
  return (hours * 3600) + (minus * 60);
}

const isDateOff = (post_date, restSchedule, checkRange) => {

  for (const index in restSchedule){
    let restDateObj = restSchedule[index]
    let date = restDateObj.date;
    let dateText = date.toJSON();
      
    if(dateText.substring(0,10) == post_date){
      if(checkRange == 1 && restDateObj.off_time_1){
        return true;
      }else if(checkRange == 2 && restDateObj.off_time_2){
        return true;
      }else if (checkRange == 3 && restDateObj.off_time_3){
        return true;
      }
    }
  }
  return false;
}

const checkValidRangeTime = (time, time_from, time_to, estimate_time) => {
  if(time >= time_from && time + estimate_time <= time_to){
    return true;
  }else{
    return false;
  }
}

const checkEffectHelper = async (post_date, post_time, workSchedule, restSchedule, helper_id, postServices, total_estimate_time) => {
  const postDate = new Date(post_date);
  let day = postDate.getDay() == 0 ? 6 : postDate.getDay() - 1;
  let [hoursPostTime,minusPostTime] = getTime(post_time);
  let workDateObj = workSchedule.filter(wordDate => wordDate.day == day)[0];
  if(!workDateObj) return false;
  let [hours_from_1,minus_from_1]   = getTime(workDateObj.time_from_1 ? workDateObj.time_from_1 : 0);
  let [hours_to_1,minus_to_1]       = getTime(workDateObj.time_to_1 ? workDateObj.time_to_1 : 0);
  let [hours_from_2,minus_from_2]   = getTime(workDateObj.time_from_2 ? workDateObj.time_from_2 : 0);
  let [hours_to_2,minus_to_2]       = getTime(workDateObj.time_to_2 ? workDateObj.time_to_2 : 0);
  let [hours_from_3,minus_from_3]   = getTime(workDateObj.time_from_3 ? workDateObj.time_from_3 : 0);
  let [hours_to_3,minus_to_3]       = getTime(workDateObj.time_to_3 ? workDateObj.time_to_3 : 0);
  let checkRange = 0;

  let serviceWork = await HelperServiceWork.getAll(helper_id);
  if(serviceWork && serviceWork.length === 0){
    return false;
  }
  if (!Array.isArray(serviceWork)) {
    return false;
  }
  let existServiceNotWork = postServices.filter((service) => {
                              let existService = serviceWork.filter((serviceWork) => {
                                                    return service.service_id === serviceWork.service_id;
                                                  });
                              return existService.length === 0;
                            });
  if(existServiceNotWork.length > 0){
    return false;
  }                        
  
  let postsInDate = await PostsService.getPostsByHelperInSelectDate(helper_id, postDate);
  postsInDate = await Promise.all(postsInDate);
  let isExistPost = false;
  postsInDate.map((post) => {
    let postInDate_second = getSecondTime(post.time);
    let post_second = getSecondTime(post_time);
    if( Math.abs(postInDate_second - post_second) < (total_estimate_time * 60)){
      isExistPost = true;
    }
  });
  if(isExistPost) return false;

  if (checkValidRangeTime(hoursPostTime * 60 + minusPostTime, 
                          hours_from_1 * 60 + minus_from_1, 
                          hours_to_1 * 60 + minus_to_1, 
                          total_estimate_time)
      ) {
    checkRange = 1;
  }else if (checkValidRangeTime(hoursPostTime * 60 + minusPostTime, 
                                hours_from_2 * 60 + minus_from_2, 
                                hours_to_2 * 60 + minus_to_2, 
                                total_estimate_time)
            ) {
    checkRange = 2;
  }else if (checkValidRangeTime(hoursPostTime * 60 + minusPostTime, 
                                hours_from_3 * 60 + minus_from_3, 
                                hours_to_3 * 60 + minus_to_3, 
                                total_estimate_time)
            ) {
    checkRange = 3;
  }

  if(checkRange === 0) return false;
  else return !isDateOff(post_date, restSchedule, checkRange);
}

PostController.createPost = async (req, res) => {
  // console.log("Đang tìm người giúp việc");
  // console.time();
  const body = req.body;
  const post_id = IDGenerator(ID_PREFIX.POST);
  const customer_id = req.auth_info.id;
  const current_date = Date();
  const FIRST_DISTANCE = 5000;
  const SECOND_DISTANCE = 10000;
  let helpers = await HelperService.getAllHelperActive();
  let helper_group_1 = [];
  let helper_group_2 = [];
  let helper_group_3 = [];
  let origins = [body.address];
  let r_helper = null;
  let isCreatePost = true;

  helpers = helpers.filter(helper => helper.place_id && helper.place_id.length > 0);
  helpers = helpers.map(async (helper,index) => {
    
    let isFreeHelper = false;
    let workSchedule = await WorkingScheduleService.getAll(helper.helper_id);
    workSchedule = workSchedule.map((ele) => {
      return {
        day: ele.day,
        is_working: ele.is_working,
        time_from_1: ele.time_from_1,
        time_to_1: ele.time_to_1,
        time_from_2: ele.time_from_2,
        time_to_2: ele.time_to_2,
        time_from_3: ele.time_from_3,
        time_to_3: ele.time_to_3,
      }
    });
    let restSchedule = await RestScheduleService.getAll(helper.helper_id);
    restSchedule = restSchedule.map((ele) => {
      return {
        date: ele.date,
        off_time_1: ele.off_time_1,
        off_time_2: ele.off_time_2,
        off_time_3: ele.off_time_3,
      }
    });

    let distance = await getDistance(origins, ['place_id:' + helper.place_id]);

    let result_data = {
      id: helper.helper_id,
      email: helper.email,
      name: helper.name,
      address: helper.address,
      place_id: helper.place_id,
      distance: distance,
      phone: helper.phone,
      credits: helper.credits,
      work_schedule: workSchedule,
      rest_schedule: restSchedule,
    }

    isFreeHelper = await checkEffectHelper(body.date, body.time, workSchedule, restSchedule, helper.helper_id, body.services, body.total_estimate_time);

    if(isFreeHelper && distance){
      if (distance > SECOND_DISTANCE){
        helper_group_3.push(result_data);
      }else if (distance > FIRST_DISTANCE){
        helper_group_2.push(result_data);
      }else {
        helper_group_1.push(result_data);
      }
    }

    return result_data;
  });
  // console.log("Đã tìm xong người giúp việc đủ điều kiện");
  helpers = await Promise.all(helpers);
  // console.log("Đã promise xong");
  if(helper_group_1.length > 0){
    helper_group_1.sort((a, b) => {
      return b.credits - a.credits;
    });
    r_helper = helper_group_1[0];
  }else if(helper_group_2.length > 0){
    helper_group_2.sort((a, b) => {
      return b.credits - a.credits;
    });
    r_helper = helper_group_2[0];
  }else if(helper_group_3.length > 0){
    helper_group_3.sort((a, b) => {
      return b.credits - a.credits;
    });
    r_helper = helper_group_3[0];
  }

  // console.timeEnd();
  // console.log("đã tìm được người giúp việc");

  if(!r_helper){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: null,
    });
  }

  const post = {
    post_id: post_id,
    customer_id: customer_id,
    customer_name: body.customer_name,
    customer_phone: body.customer_phone,
    post_type: body.post_type,
    address: body.address,
    date: body.date,
    time: body.time,
    end_time: new Date(body.end_time),
    note: body.note,
    total_estimate_time: body.total_estimate_time,
    total: body.total,
    coupon_price: body.coupon_price,
    voucher_id: (body.voucher_id.length === 0) ? null : body.voucher_id,
    payment_method: body.payment_method,
    helper_id: r_helper.id,
    post_state: POST_STATE.INCOMPLETE,
    is_delete: 0,
    create_user: customer_id,
    create_date: current_date,
    update_user: customer_id,
    update_date: current_date,
  };

  if (body.voucher_id && body.voucher_id != "") {
    await VoucherService.isUseByCustomer(customer_id, body.voucher_id)
  }

  const post_details = body.services.map((service) => {
    return {
      post_id: post_id,
      service_id: service.service_id,
      service_seq_nb: service.service_seq_nb,
      value: service.value,
      multiple_field_value: service.multiple_field_value,
      total: service.total,
    };
  });

  // create post
  isCreatePost = await PostsService.createPost(post, post_details);

  if(isCreatePost){    
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: {
        post_id: post_id,
        email: r_helper.email,
        name: r_helper.name,
        address: r_helper.address,
        place_id: r_helper.place_id,
        distance: r_helper.distance,
        phone: r_helper.phone,
        credits: r_helper.credits,
      },
    });
  }else{
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Có lỗi xảy ra."
    );
  }

};

PostController.getPostById = async (req, res) => {
  const post_id = req.query.post_id;
  const post = await PostsService.getPostById(post_id);
  return res.status(HTTP_STATUS_CODE.OK).json({
    data: post,
  });
};

const cancelPost = async (res, post_info, reason_cancel, auth_info) => {
  return PostsService.cancelPost(post_info, reason_cancel)
    .then(async (result) => {
      // console.log(result);
      if (!result) {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Lịch hẹn không tồn tại"
        );
      }
      if(auth_info.role == USER_ROLE.HELPER) {
        await HelperService.addCredit(auth_info.id, CANCEL_CREDIT);
      }
      return res.status(HTTP_STATUS_CODE.OK).json({
        msg: "Đã hủy lịch hẹn.",
      });
    })
    .catch((error) => {
      console.log(error);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

const completePost = async (res, post_id, user_role) => {
  return PostsService.completePost(post_id, user_role)
    .then(async (result) => {
      // console.log(result);
      if (!result) {
        return ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Lịch hẹn không tồn tại"
        );
      }
      // add credit
      await HelperService.addCredit(result.helper_id, COMPLETE_CREDIT);

      return res.status(HTTP_STATUS_CODE.OK).json({
        msg: "Lịch hẹn đã hoàn thành",
      });
    })
    .catch((error) => {
      console.log(error);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

const acceptPost = async (res, post_id, auth_info) => {
  return PostsService.acceptPost(post_id, auth_info.id)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({
        msg: "Đã chấp nhận lịch hẹn",
      });
    })
    .catch((error) => {
      console.log(error);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

PostController.updatePost = async (req, res) => {
  const auth_info = req.auth_info;
  const body = req.body;

  const role = auth_info.role;
  const post_id = body.post_id;

  switch (role) {
    case USER_ROLE.ADMIN:
      return PostsService.deletePost({ post_id: post_id })
        .then((value) => {
          return res.status(HTTP_STATUS_CODE.OK).json({
            msg: "đã xóa lịch hẹn.",
          });
        })
        .catch((error) => {
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            "có lỗi xảy ra"
          );
        });

    case USER_ROLE.HELPER:
      switch (body.post_state) {
        case POST_STATE.CANCEL:
          const post_info = { post_id: post_id, helper_id: auth_info.id };
          return cancelPost(res, post_info, body.reason_cancel, auth_info);

        case POST_STATE.COMPLETE:
          return completePost( res, post_id, USER_ROLE.HELPER );

        default:
          return acceptPost(res, post_id, auth_info);
      }

    default: // customer
      if (body.post_state == POST_STATE.CANCEL) {
        const post_info = { post_id: post_id, customer_id: auth_info.id };
        return cancelPost(res, post_info, body.reason_cancel, auth_info);
      }
      if (body.post_state == POST_STATE.COMPLETE) {
        return completePost(res, post_id, USER_ROLE.CUSTOMER);
      }
      const current_date = Date();
      const post = {
        post_id: post_id,
        address: body.address,
        date: body.date,
        time: body.time,
        note: body.note,
        total: body.total,
        voucher_id: body.voucher_id,
        payment_method: body.payment_method,
        post_state: POST_STATE.PROCESSING,
        update_user: auth_info.id,
        update_date: current_date,
      };

      const post_details = body.services.map((service) => {
        return {
          post_id: post_id,
          service_id: service.service_id,
          service_seq_nb: service.seq_nb,
          value: service.value,
          multiple_field_value: service.multiple_field_value,
        };
      });

      return PostsService.updatePost(post, post_details)
        .then((value) => {
          return res.status(HTTP_STATUS_CODE.OK).json({
            msg: "Cập nhật lịch hẹn thành công",
          });
        })
        .catch((error) => {
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            "có lỗi xảy ra"
          );
        });
  }
};

PostController.deletePost = async (req, res) => {
  const post_id = req.query.post_id;
  console.log(req.query);
  const customer_id = req.auth_info.id;
  return PostsService.deletePost({
    customer_id: customer_id,
    post_id: post_id,
  })
    .then((result) => {
      if (result) {
        return res.status(HTTP_STATUS_CODE.OK).json({
          msg: "Đã xóa lịch hẹn",
        });
      } else {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          msg: "Lịch hẹn không tồn tại",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return ErrorResponse(
        res,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "có lỗi xảy ra"
      );
    });
};

export default PostController;
