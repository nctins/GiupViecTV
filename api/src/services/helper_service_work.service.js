import db from "../models/index";

const ServiceWork = db.helper_service_work;
const HelperServiceWork = {};

HelperServiceWork.create = (helper_id, service_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await ServiceWork.create({
        helper_id: helper_id,
        service_id: service_id,
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

HelperServiceWork.getAll = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const services = await ServiceWork.findAll({where: {helper_id: helper_id}});
      if(!services || services.length == 0) {
        resolve(0);
      }
      resolve(services);
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  })
}

HelperServiceWork.getOne = (helper_id, service_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const service = await ServiceWork.findOne({where: {helper_id: helper_id, service_id: service_id}});
        if(service) {
          resolve(service);
        }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    })
  }

HelperServiceWork.checkAllService = (helper_id, data) => {
  return new Promise(async (resolve, reject) => {
    const t = await db.sequelize.transaction();
    try {
      const destroyServiceWork = await ServiceWork.destroy({
        where:{
          helper_id: helper_id,
        },
        transaction: t,
      });
      for(const service of data){
        let updateServiceWork = await ServiceWork.create(
              {
                helper_id: helper_id,
                service_id: service.service_id,
              },
              {transaction: t});
        if(!updateServiceWork){
          reject(false);
          return;
        }
      }

      t.commit();
      resolve(true);
    } catch (error) {
      t.rollback();
      reject(error);
    }
  })
}

HelperServiceWork.deleteServiceById = (helper_id, service_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const destroyServiceWork = await ServiceWork.destroy({
            where:{
              helper_id: helper_id,
              service_id: service_id,
            }
        });
        resolve(destroyServiceWork);
      } catch (error) {
          reject(error);
      }
    })
  }

HelperServiceWork.deleteAll = (helper_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const destroyServiceWork = await ServiceWork.destroy({
            where:{
              helper_id: helper_id,
            }
        });
        resolve(destroyServiceWork);
      } catch (error) {
          reject(error);
      }
    })
  }

export default HelperServiceWork;
