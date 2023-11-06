import HTTP_STATUS_CODE from "../constants/http_code";
import { CREDIT_RATING } from "../constants/system_constants";
import USER_ROLE from "../constants/user_role";
import CustomerRatingService from "../services/cutomer_rating.service";
import HelperService from "../services/helper_account.service";
import HelperRatingService from "../services/helper_rating.service";
import ErrorResponse from "../utils/ErrorResponse";

const RatingController = {};

const ErrorHandle = (res) => {
  return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    msg: "có lỗi xảy ra",
  });
};

RatingController.createRating = async (req, res) => {
  const role = req.auth_info.role;
  const user_id = req.auth_info.id;
  const body = req.body;
  const current_date = new Date();
  let data = {
    post_id: body.post_id,
    target_id: body.target_id,
    rank: body.rank,
    date_time: current_date,
    content: body.content,
    create_user: user_id,
    create_date: current_date,
    update_user: user_id,
    update_date: current_date,
  };
  if (role == USER_ROLE.CUSTOMER) {
    data.customer_id = user_id;
    return CustomerRatingService.create(data)
      .then(async (val) => {
        const helper_id = data.target_id;
        await HelperService.addCredit(helper_id, CREDIT_RATING[data.rank])
        return res.status(HTTP_STATUS_CODE.OK).json({
          msg: "Đánh giá thành công.",
        });
      })
      .catch((err) => {
        return ErrorHandle(res);
      });
  } else {
    // role = helper
    data.helper_id = user_id;
    return HelperRatingService.create(data)
      .then((val) => {
        return res.status(HTTP_STATUS_CODE.OK).json({
          msg: "Đánh giá thành công.",
        });
      })
      .catch((err) => {
        return ErrorHandle(res);
      });
  }
};

RatingController.getCustomerRating = async (req, res) => {
  const customer_id = req.params.customer_id;

  if (!customer_id) {
    return ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, "bad request");
  }

  return HelperRatingService.getCustomerRating(customer_id)
    .then((ratings) => {
      return res.status(HTTP_STATUS_CODE.OK).json({
        data: ratings,
      });
    })
    .catch((err) => {
      return ErrorHandle(res);
    });
};

RatingController.getHelperRating = async (req, res) => {
  const helper_id = req.params.helper_id;

  if (!helper_id) {
    return ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, "bad request");
  }

  return CustomerRatingService.getHelperRating(helper_id)
    .then((ratings) => {
      return res.status(HTTP_STATUS_CODE.OK).json({
        data: ratings,
      });
    })
    .catch((err) => {
      console.log(err);
      return ErrorHandle(res);
    });
};

// get my rating on post
RatingController.getRating = async (req, res) => {
  const role = req.auth_info.role;
  const post_id = req.params.post_id;

  if (!post_id) {
    return ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, "bad request");
  }

  if (role == USER_ROLE.CUSTOMER) {
    return CustomerRatingService.getRating({
      post_id: post_id,
      customer_id: req.auth_info.id,
    })
      .then((data) => {
        return res.status(HTTP_STATUS_CODE.OK).json({
          data: data,
        });
      })
      .catch((err) => {
        return ErrorHandle(res);
      });
  } else {
    return HelperRatingService.getRating({
      post_id: post_id,
      helper_id: req.auth_info.id,
    })
      .then((data) => {
        return res.status(HTTP_STATUS_CODE.OK).json({
          data: data,
        });
      })
      .catch((err) => {
        return ErrorHandle(res);
      });
  }
};

export default RatingController;
