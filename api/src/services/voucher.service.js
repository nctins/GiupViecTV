import db from "../models/index";
const { Op } = require("sequelize");

const voucherModel = db.vouchers;
const customerVoucherModel = db.customer_voucher;
const VoucherService = {};

VoucherService.getAll = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vouchers = await voucherModel.findAll({
        where: {
          voucher_name:{
            [Op.like]: filter.voucher_name
          },
          // start_date:{
          //   [Op.lte]: filter.date_use
          // },
          // end_date:{
          //   [Op.gte]: filter.date_use
          // },
          is_delete: {
            [Op.in]: filter.is_delete
          }
        },
        order:[
          ['is_delete','DESC'],
          ['voucher_type','DESC'],
          ['quantity','DESC'],
          ['start_date','ASC'],
          ['end_date','ASC']
        ]
      });
      if (vouchers && vouchers.length > 0) {
        resolve(vouchers);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

VoucherService.getOne = (condition) => {
    return new Promise(async (resolve, reject) => {
      try {
        let voucher = await voucherModel.findOne({where: condition});
        if (voucher) {
            resolve(voucher);
          }
          resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  };

VoucherService.getOneWithVoucherCode = (voucher_code,currentDate) => {
    return new Promise(async (resolve, reject) => {
      try {
        let voucher = await voucherModel.findOne(
          {
            where: {
              voucher_code: voucher_code,
              start_date:{
                [Op.lte]: currentDate
              },
              end_date: {
                [Op.gte]: currentDate
              }
            }
          });
        if (voucher) {
            resolve(voucher);
          }
          resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  };

VoucherService.getVoucherOfCustomer = (voucher_id,customer_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await customerVoucherModel.findOne({
          where:{
            voucher_id: voucher_id,
            customer_id: customer_id,
          }
        });
        if (result) {
            resolve(true);
          }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
};

VoucherService.addVoucherToCustomer = (voucherOfCustomer) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await customerVoucherModel.create(voucherOfCustomer);
        if (result) {
            resolve(result);
          }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
};

VoucherService.create = (voucher) => {
    return new Promise(async (resolve, reject) => {
      try {
        // let result = await voucherModel.create({voucher_id: voucher.voucher_id, voucher_name: voucher.voucher_name
        //                                   , voucher_type: voucher.voucher_type, voucher_description: voucher.voucher_description
        //                                   , discount_percent: voucher.discount_percent, discount_price: voucher.discount_price
        //                                   , max_discount_price: voucher.max_discount_price, quantity: voucher.quantity
        //                                   , payment_method_condition: voucher.payment_method_condition
        //                                   , start_date: voucher.start_date, end_date: voucher.end_date
        //                                   , create_user: voucher.create_user, create_date: voucher.create_date
        //                                   , update_user: voucher.update_user, update_date: voucher.update_date
        //                                   , is_delete: voucher.is_delete });
        // console.log(voucher);
        let result = await voucherModel.create(voucher);
        if (result) {
            resolve(result);
          }
        resolve(false);
      } catch (error) {
        // console.log(error);
        reject(error);
      }
    });
};

VoucherService.updateById = (id,voucher) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(voucher);
        let result = await voucherModel.update(voucher,
                                            {
                                                where: {
                                                    voucher_id: id
                                                }
                                            }
                                            );
      
      if (result) {
          resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

VoucherService.getAllbyCustomerId = (customer_id,filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vouchers = await customerVoucherModel.findAll({
        where: {
          customer_id: customer_id,
          is_used:{
            [Op.in]: filter.is_used
          }
        }
      });
      if (vouchers && vouchers.length > 0) {
        resolve(vouchers);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

VoucherService.isUseByCustomer = (customer_id, voucher_id) => {
  return new Promise(async(resolve, reject ) => {
    try {
      const voucher = await customerVoucherModel.findOne({where: {voucher_id, customer_id}});
      if(!voucher) {
        resolve(false);
      }
      await voucher.update({is_used: true});
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

export default VoucherService;
