import db from "../models/index";

const { Op } = require("sequelize");
const AddressModel = db.customer_address;
const AddressService = {};

AddressService.getAllByCustomerId = (customer_id,filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let addresses = await AddressModel.findAll({
        where: {    
          customer_id: customer_id,
          address:{
            [Op.like]: filter.address
          },
          address_title:{
            [Op.like]: filter.address_title
          },
          is_delete: false,
        },
      });
      if (addresses) {
        resolve(addresses);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

AddressService.getOneById = (customer_address_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let address = await AddressModel.findOne({
          where: {
            customer_address_id: customer_address_id
          },
        });
        if (address) {
          resolve(address);
        }
        resolve(false);
      } catch (error) {
        reject(false);
      }
    });
  };

AddressService.updateById = (customer_address_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await AddressModel.update(data,{
        where: { customer_address_id: customer_address_id},
      });
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

AddressService.create = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await AddressModel.create(data)
        if (result) {
          resolve(result);
        }
        resolve(false);
      } catch (error) {
        reject(false);
      }
    });
  };

export default AddressService;
