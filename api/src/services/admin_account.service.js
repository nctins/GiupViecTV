import bcrypt from "bcrypt";
import db from "../models/index";

const AdminAccountModel = db.admin_account;
const AdminService = {};

AdminService.handleSignin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let admin = await AdminAccountModel.findOne({
        where: { user_name: username },
      });
      if (!admin) {
        resolve(false);
      }
      let result = await bcrypt.compare(password, admin.password);
      if (result) {
        resolve(admin);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

export default AdminService;
