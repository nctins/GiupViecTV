import { INPUT_FORMAT } from "../constants/db_constants";
import db from "../models";
const { Op } = require("sequelize");

const ServicesService = {};
const ServicesModel = db.services;
const ServiceDetailModel = db.service_detail;

ServicesService.getServices = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const services = await ServicesModel.findAll({
        where: {
          is_active: {
            [Op.in]: filter.is_active,
          },
          is_delete: {
            [Op.in]: filter.is_delete,
          },
        },
        order:[
          ['is_active','DESC'],
          ['service_type','ASC'],
          ['service_name','ASC'],
        ]
      });
      if (!services || services.length == 0) {
        resolve([]);
      }
      
      const result = services.map(async (service) => {
        const service_detail = await service.getDetail();
        let service_obj = {
          service_id: service.service_id,
          name: service.service_name,
          description: service.service_description,
          service_type: service.service_type,
          is_active: service.is_active,
          input_format: service.input_format,
          dram: service_detail[0] ? service_detail[0].dram : "",
        };
  
        if (service.input_format == INPUT_FORMAT.TEXTBOX && service_detail[0]) {
          const detail = service_detail[0];
          service_obj.unit_price_title = detail.unit_price_title;
          service_obj.dram_unit = detail.dram_unit;
          service_obj.unit_price = detail.unit_price;
          service_obj.seq_nb = detail.seq_nb;
          service_obj.multiple_field_title = detail.multiple_field_title;
          service_obj.estimate_time = detail.estimate_time;
        }
  
        if (service.input_format == INPUT_FORMAT.RADIO) {
          service_obj.items = service_detail.map((detail) => {
            return {
              unit_price: detail.unit_price,
              string_value: detail.string_value,
              seq_nb: detail.seq_nb,
              estimate_time: detail.estimate_time,
            }
          });
        }
        return service_obj;
      });
      // console.log(result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

ServicesService.getServiceById = (service_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const service = await ServicesModel.findOne({
        where: {
          is_active: true,
          is_delete: false,
          service_id: service_id,
        },
      });
      if (!service) {
        resolve({});
      }
      const service_detail = await service.getDetail();
      let result = {
        service_id: service.service_id,
        name: service.service_name,
        description: service.service_description,
        service_type: service.service_type,
        input_format: service.input_format,
        dram: service_detail[0] ? service_detail[0].dram : "",
      };

      if (service.input_format == INPUT_FORMAT.TEXTBOX && service_detail[0]) {
        const detail = service_detail[0];
        result.unit_price_title = detail.unit_price_title;
        result.dram_unit = detail.dram_unit;
        result.unit_price = detail.unit_price;
        result.seq_nb = detail.seq_nb;
        result.multiple_field_title = detail.multiple_field_title;
        result.dram = detail.dram;
        result.estimate_time = detail.estimate_time;
      }

      if (service.input_format == INPUT_FORMAT.RADIO) {
        result.items = service_detail.map((detail) => {
          return {
            unit_price: detail.unit_price,
            string_value: detail.string_value,
            seq_nb: detail.seq_nb,
            estimate_time: detail.estimate_time,
          }
        });
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

ServicesService.createService = (service) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ServicesModel.create(service);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

ServicesService.createServiceDetail = (service_detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ServiceDetailModel.create(service_detail);
      if (result) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

ServicesService.setValidService = (service_id, service) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ServicesModel.update(service,{
        where: {
          service_id: service_id,
        },
      });
      // console.log(result);
      if (result && result[0] > 0) {
        resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

ServicesService.updateService = (service_id, service, lst_service_detail) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      const updateService = await ServicesModel.update(service, {
        where: {
          service_id: service_id,
        },
        transaction: t,
      });
      if(!updateService){
        reject(false);
        return;
      }
      try {
        const destroyServiceDetail = await ServiceDetailModel.destroy({
          where:{
            service_id: service_id,
          },
          transaction: t,
        });
      } catch (error) {
        console.log(error);
      }
      
      for(const service_detail of lst_service_detail){
        let rs = await ServiceDetailModel.create(service_detail, {transaction: t});
        if(!rs){
          reject(false);
          return;
        }
      }
      // lst_service_detail.map(async (service_detail) => {
      //   // const updateServiceDetail = await ServiceDetailModel.create(service_detail,{
      //   //   transaction: t,
      //   // });
      //   const updateServiceDetail = await ServiceDetailModel.create(service_detail);
      //   return updateServiceDetail;
      // });
      t.commit();
      resolve(true);
    } catch (error) {
      t.rollback();
      reject(error);
    }
  });
};

export default ServicesService;
