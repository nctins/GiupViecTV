import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import HelperService from "../services/helper_account.service";
import WorkingScheduleService from "../services/working_schedule.service";
import { DAYS, PAYMENT_METHOD, POST_STATE } from "../constants/db_constants";
import RestScheduleService from "../services/rest_schedule.service";
import HelperServiceWork from "../services/helper_service_work.service";
import HelperIncomeService from "../services/helper_income.service";
import PostsService from "../services/posts.service";
import { DateObj2String, DateObj2TimeStr } from "../utils/Dateformater";

const HelperController = {}

HelperController.getAll = async (req, res) => {
  let filter = {};
  let helpers = [];

  if(req.body.email){
    filter.email = "%" + req.body.email + "%";
  }else{
    filter.email = "%";
  }

  if(req.body.name){
    filter.name = "%" + req.body.name + "%";
  }else{
    filter.name = "%";
  }

  helpers = await HelperService.getAll(filter);

  if(helpers && helpers.length == 0){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: [],
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: helpers,
  });
};

HelperController.getOneById = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let helper_id = req.params.helper_id;

  if(!helper_id){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Chưa nhập ID!"
    );
  }

  let helper = await HelperService.getOneById(helper_id);
  
  if(helper){
    if(USER_ROLE.ADMIN === role || auth_info.id === helper_id){
        const ratings = await helper.getRating();
        const posts = await helper.getPost();

        const num_complete_post = posts.filter((post)=>post.post_state == POST_STATE.COMPLETE).length;
        const num_cancel_post = posts.filter((post)=>post.post_state == POST_STATE.CANCEL).length;
        let avg_rating = 0;
        if (ratings.length > 0) {
          const total = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rank, 0);
          avg_rating = total / ratings.length;
        }

        return res.status(HTTP_STATUS_CODE.OK).json({
            data: {
              ...helper.dataValues,
              num_complete_posting: num_complete_post,
              num_cancel_post: num_cancel_post,
              avg_rating: avg_rating,
            }
        });
    }else{
        return res.status(HTTP_STATUS_CODE.OK).json({
          data: {
            name: helper.name,
            address: helper.address,
            place_id: helper.place_id,
            avatar_url: helper.avatar_url
          },
        });
    }
  }

  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: "Không tìm thấy user!",
  });
};

HelperController.updateById = async (req,res) => {
    let auth_info = req.auth_info;
    let role = auth_info.role;
    let helper_id = req.params.helper_id;
    let data = {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      MSDD: req.body.MSDD,
      address: req.body.address,
      place_id: req.body.placeID,
    };
    let image = req.body.image;
    let imageUrl;

    if(USER_ROLE.ADMIN !== role && auth_info.id !== helper_id){
        return ErrorResponse(
            res,
            HTTP_STATUS_CODE.FORBIDDEN ,
            "Không có quyền truy cập!"
        );
    }

    let helper = await HelperService.getOneById(helper_id);
    if(!helper){
        return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
        data: "Id không tồn tại!",
        });
    }
    
    if(helper.avatar_url && helper.avatar_url.length > 0){
      imageUrl = helper.avatar_url;
    }else{
      imageUrl = "https://reactnative.dev/img/tiny_logo.png";
    }
    if(image){
      const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        console.log(result);
        if(result.url){
          imageUrl = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
    }
    data.avatar_url = imageUrl;
    data.update_user = auth_info.id;
    data.update_date = new Date();
    let result = await HelperService.updateById(helper_id,data);
    if(result){
        return res.status(HTTP_STATUS_CODE.OK).json({
          data: "Cập nhật tài khoản thành công!",
        });
    }

    return ErrorResponse(
        res,
        HTTP_STATUS_CODE.EXPECTATION_FAILED ,
        "Cập nhật tài khoản không thành công!"
    );
};

HelperController.updatePassword = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let helper_id = req.params.helper_id;
  let data = {};
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  if(USER_ROLE.ADMIN !== role && auth_info.id !== helper_id){
      return ErrorResponse(
          res,
          HTTP_STATUS_CODE.FORBIDDEN ,
          "Không có quyền truy cập!"
      );
  }

  let helper = await HelperService.getOneById(helper_id);
  if(!helper){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    msg: "Id không tồn tại!",
    });
  }

  let check = await HelperService.checkCurrentPassword(helper,oldPassword);
  if(!check){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Mật khẩu hiện tại không đúng!",
    });
  }

  data.password = newPassword;
  data.update_user = auth_info.id;
  data.update_date = new Date();
  let result = await HelperService.updateById(helper_id,data);
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Cập nhật mật khẩu thành công!",
    });
  }

  return ErrorResponse(
      res,
      HTTP_STATUS_CODE.EXPECTATION_FAILED ,
      "Cập nhật mật khẩu không thành công!"
  );
};

HelperController.getRestSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;
  let rest_schedule = await RestScheduleService.getAll(helper_id);

  return res.status(HTTP_STATUS_CODE.OK).json(rest_schedule);
}

HelperController.updateRestSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;

  const data = {...req.body, helper_id};
  // console.log(data);
  return RestScheduleService.updateOrInsert(data)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({});
    });

}

HelperController.removeRestSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;
  const date = req.body.date;
  const data = {date, helper_id};
  return RestScheduleService.remove(data)
    .then((result) => {
      if (!result) {
        return res.status(HTTP_STATUS_CODE.NOT_MODIFIED).json({msg:"Ngày nghỉ không đúng."})
      }
      return res.status(HTTP_STATUS_CODE.OK).json({});
    })
    .catch((e) => {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({});
    });

}

HelperController.getWorkingSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;
  let working_schedule = await WorkingScheduleService.getAll(helper_id);

  return res.status(HTTP_STATUS_CODE.OK).json(working_schedule);
}

HelperController.updateWorkingSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;

  const data = {...req.body, helper_id};
  // console.log(data);
  return WorkingScheduleService.updateOrInsert(data)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({});
    });
}

HelperController.createDefaultWorkingSchedule = async (req, res) => {
  let helper_id = req.params.helper_id;
  return WorkingScheduleService.setDefaultSchedule(helper_id)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({});
    });
}

HelperController.getServiceWork = async (req, res) => {
  let helper_id = req.params.helper_id;
  let service_work = await HelperServiceWork.getAll(helper_id);

  return res.status(HTTP_STATUS_CODE.OK).json({data: service_work});
}

HelperController.createServiceWork = async (req, res) => {
  let helper_id = req.params.helper_id;
  let service_id = req.body.service_id;

  let check = await HelperServiceWork.getOne(helper_id, service_id);
  if(check){
    return res.status(HTTP_STATUS_CODE.EXPECTATION_FAILED).json({msg: "có lỗi xảy ra vui lòng thử lại!"});
  }

  return HelperServiceWork.create(helper_id, service_id)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({msg: "Cập nhật thành công!"});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({msg: "Cập nhật thất bại, vui lòng thử lại!"});
    });
}

HelperController.deleteServiceWork = async (req, res) => {
  let helper_id = req.params.helper_id;
  let service_id = req.body.service_id;

  let check = await HelperServiceWork.getOne(helper_id, service_id);
  if(!check){
    return res.status(HTTP_STATUS_CODE.EXPECTATION_FAILED).json({msg: "có lỗi xảy ra vui lòng thử lại!"});
  }

  return HelperServiceWork.deleteServiceById(helper_id, service_id)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({msg: "Cập nhật thành công!"});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({msg: "Cập nhật thất bại, vui lòng thử lại!"});
    });
}

HelperController.checkAllServiceWork = async (req, res) => {
  let helper_id = req.params.helper_id;
  let services = req.body.services;

  return HelperServiceWork.checkAllService(helper_id, services)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({msg: "Cập nhật thành công!"});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({msg: "Cập nhật thất bại, vui lòng thử lại!"});
    });
}

HelperController.unCheckAllServiceWork = async (req, res) => {
  let helper_id = req.params.helper_id;

  return HelperServiceWork.deleteAll(helper_id)
    .then(() => {
      return res.status(HTTP_STATUS_CODE.OK).json({msg: "Cập nhật thành công!"});
    })
    .catch((e) => {
      console.log(e);
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({msg: "Cập nhật thất bại, vui lòng thử lại!"});
    });
}

HelperController.getHelperIncome = async (req, res) => {
  let helper_id = req.params.helper_id;
  let current_date_time = new Date();
  let current_date = new Date(DateObj2String(current_date_time));  

  let helper = await HelperService.getOneById(helper_id);
  if(!helper){
    return ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST ,
        "User không tồn tại!"
    );
  }

  let helper_income = await HelperIncomeService.getAllHistoryOfHelper(helper_id);
  helper_income = helper_income.map((income) => {
    return {
      helper_id: income.helper_id,
      start_date: income.start_date,
      end_date: income.end_date,
      total_price: income.total_price,
      receive_price: income.receive_price,
      enterprise_price: income.enterprise_price,
      isPayment: true,
    }
  })

  let cur_start_date;
  if(helper_income && helper_income.length > 0){
    cur_start_date = new Date(DateObj2String(helper_income[0].end_date));
    cur_start_date.setDate(cur_start_date.getDate() + 1);
  }else{
    cur_start_date = new Date(helper.create_date);
  }
  
  let cur_helper_income = {
    helper_id: helper_id,
    start_date: cur_start_date,
    end_date: current_date,
    total_price: null,
    receive_price: null,
    enterprise_price: null,
    isPayment: false,
  }

  console.log(cur_helper_income);

  helper_income.unshift(cur_helper_income);

  helper_income = helper_income.map(async (income) => {
    let lst_cart_vnpay = [];
    let lst_cart = [];

    let filter = {
      helper_id: helper.helper_id,
      startDate: income.start_date,
      endDate: income.end_date,
    }
    let posts = await PostsService.getPostsByHelperFilterDate(filter);
    if(posts){
      posts = posts.map((post) => {
          return {
            post_id: post.post_id,
            address: post.address,
            date: post.date,
            time: post.time,
            total: post.total,
            voucher_id: post.voucher_id,
            coupon_price: post.coupon_price,
            post_state: post.post_state,
            post_type: post.post_type,
            payment_method: post.payment_method,
            reason_cancel: post.reason_cancel,
            customer_name: post.customer_name,
          }
        })
      lst_cart = posts.filter((post) => {return post.post_state == POST_STATE.COMPLETE && post.payment_method == PAYMENT_METHOD.COD});
      lst_cart_vnpay = posts.filter((post) => {return post.post_state == POST_STATE.COMPLETE && post.payment_method == PAYMENT_METHOD.VNPAY});
    }
    income.lst_cart = lst_cart;
    income.lst_cart_vnpay = lst_cart_vnpay;

    return income;
  });

  helper_income = await Promise.all(helper_income);

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: helper_income,
  });

}

export default HelperController;
