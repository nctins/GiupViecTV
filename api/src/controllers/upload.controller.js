import { ID_PREFIX, INPUT_FORMAT } from "../constants/db_constants";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";
import HelperService from "../services/helper_account.service";
import AdminService from "../services/admin_account.service";

const UploadController = {};

UploadController.uploadImage = async (req, res, next) => {
    // let auth_info = req.auth_info;
    // let role = auth_info.role;
    // let user_id = auth_info.id;
    console.log(req);
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    // if(USER_ROLE.CUSTOMER === role){
    //     CustomerService.updateById(user_id,{});
    // }else if(USER_ROLE.HELPER === role){

    // }else{

    // }
     
    return res.status(HTTP_STATUS_CODE.OK).json({
        data: req.file.path,
    });
};

export default UploadController;
