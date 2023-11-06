import db from "../models/index";
import Password from "../utils/Password";
import IDGenerator from "../utils/IDGenerator";
const { Op } = require("sequelize");

const system_control_model = db.system_control;
const SystemControl = {};

SystemControl.create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await system_control_model.create(data);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

SystemControl.getAll = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await system_control_model.findAll();
        if (result) {
          resolve(result);
        }
        resolve(false);
      } catch (error) {
        reject(false);
      }
    });
  };

SystemControl.getByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await system_control_model.findOne({
        where: { 
            name: name,
        },
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

SystemControl.updateValue = (name, value) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await system_control_model.update({
            value: value
        },{
            where: { 
                name: name,
            },
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

export default SystemControl;
