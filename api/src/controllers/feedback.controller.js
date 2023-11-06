import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import {ID_PREFIX} from "../constants/db_constants"
import IDGenerator from "../utils/IDGenerator";
import FeedbackService from "../services/feedback.service";
import CustomerService from "../services/customer_account.service";
import HelperService from "../services/helper_account.service";

const FeedbackController = {}

FeedbackController.getAll = async (req, res) => {
    let feedbacks = [];

    feedbacks = await FeedbackService.getAll();

    if(feedbacks && feedbacks.length == 0){
        return ErrorResponse(
            res,
            HTTP_STATUS_CODE.BAD_REQUEST ,
            "Chưa có feedback nào!"
            );
    }

    let rs = feedbacks.map(async(fb) => {
        let user_id = fb.user_id;
        let user;
        if(user_id.substr(0,3) === "CUS"){
            user = await CustomerService.getOneById(user_id);
        }else{
            user = await HelperService.getOneById(user_id);
        }

        if(!user){
            return ErrorResponse(
                res,
                HTTP_STATUS_CODE.BAD_REQUEST ,
                "Có lỗi xảy ra vui lòng liên hệ quản lý hệ thống!"
                );
        }

        return {
            feedback_id: fb.feedback_id,
            create_date: fb.create_date,
            content: fb.content,
            user_id: user_id,
            user_name: user.name,
            user_email: user.email,
            user_phone: user.phone,
            user_url: user.avatar_url,
        }
    })
    rs = await Promise.all(rs);

    return res.status(HTTP_STATUS_CODE.OK).json({
        data: rs,
    });
};

FeedbackController.getOne = async (req,res) => {
    let auth_info = req.auth_info;
    let role = auth_info.role;
    let feedback_id = req.params.feedback_id;

    if(!feedback_id){
        return ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST ,
        "Chưa nhập ID!"
        );
    }

    let feedback = await FeedbackService.getOne(feedback_id);
    
    if(feedback){
        return res.status(HTTP_STATUS_CODE.OK).json({
            data: feedback,
        });
    }

    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
        data: "Không tìm thấy feedback!",
    });
};

FeedbackController.create = async (req,res) => {
    let auth_info = req.auth_info;
    let role = auth_info.role;
    let feedback = {};

    feedback.feedback_id = IDGenerator(ID_PREFIX.FEEDBACK);
    feedback.user_id = auth_info.id;
    feedback.content = req.body.content;
    feedback.create_user = auth_info.id;
    feedback.create_date = new Date();

    let result = await FeedbackService.create(feedback);
    
    if(result){
        return res.status(HTTP_STATUS_CODE.OK).json({
            data: "Feedback thành công!",
        });
    }

    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
        data: "Feedback không thành công!",
    });
};

export default FeedbackController;
