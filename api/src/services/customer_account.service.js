import bcrypt from "bcrypt";
import db from "../models/index";
import uniqid from 'uniqid';
import Password from "../utils/Password";
import IDGenerator from "../utils/IDGenerator";
const { Op } = require("sequelize");

const CustomerAccountModel = db.customer_account;
const CustomerService = {};

CustomerService.handleSignin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await CustomerAccountModel.findOne({
        where: { email: email },
      });
      if (!customer) {
        resolve(false);
      }
      let result = await bcrypt.compare(password, customer.password);
      if (result) {
        resolve(customer);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.findOne = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await CustomerAccountModel.findOne({
        where: { email: email },
      });
      if (customer) {
        resolve(customer);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.createCustomer = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      data.password = Password.hash(data.password);
      data.customer_id = IDGenerator("CUS_");
      let result = await CustomerAccountModel.create(data);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.getAll = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customers = await CustomerAccountModel.findAll({
        where: {
          email: {
            [Op.like]: filter.email
          },
          name: {
            [Op.like]: filter.name
          }
        },
        order:[
          ['is_active','DESC'],
        ]
      });
      if (customers) {
        resolve(customers);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.getOneById = (customer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await CustomerAccountModel.findOne({
        where: { customer_id: customer_id },
      });
      if (customer) {
        resolve(customer);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.checkCurrentPassword = (customer,currentPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await bcrypt.compare(currentPassword, customer.password);
      if(result){
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.updateById = (customer_id,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(data.password){
        data.password = Password.hash(data.password);
      }
      let customer = await CustomerAccountModel.update(data,
        {
        where: { customer_id: customer_id },
        }
      );
      if (customer) {
        resolve(customer);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

CustomerService.isExist = (where_condition) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const customer = await CustomerAccountModel.findOne({where: where_condition});
      if (!customer) {
        resolve(null);
      }
      resolve(customer);
    } catch (error) {
      reject(error);
    }
  })
}

export default CustomerService;
