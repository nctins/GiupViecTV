import bcrypt from "bcrypt";
import db from "../models/index";
const { Op } = require("sequelize");

const adsModel = db.advertisement;
const AdsService = {};

AdsService.getAllByAdmin = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let adsLst = await adsModel.findAll({
        where: {
          advertisement_title:{
            [Op.like]: filter.title
          },
          is_delete: {
            [Op.in]: filter.is_delete
          }
        },
        order:[
          ['is_delete','DESC'],
          ['advertisement_title','ASC'],
          ['start_date','ASC'],
          ['end_date','ASC']
        ]
      });
      if (adsLst || adsLst.length > 0) {
        resolve(adsLst);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

AdsService.getAllByUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let adsLst = await adsModel.findAll({
          where: { 
            is_delete: 0 
          },
        });
        if (adsLst || adsLst.length > 0) {
            resolve(adsLst);
          }
          resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  };

AdsService.getOneByIdWithUser = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let ads = await adsModel.findOne({
          where: {advertisement_id: id, is_delete: 0 },
        });
        if (ads) {
            resolve(ads);
          }
          resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  };

AdsService.getOneByIdWithAdmin = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let ads = await adsModel.findOne({
          where: {advertisement_id: id},
        });
        if (ads) {
            resolve(ads);
          }
          resolve(false);
      } catch (error) {
        reject(error);
      }
    });
  };

AdsService.create = (ads) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await adsModel.create({advertisement_id: ads.advertisement_id, poster_path: ads.poster_path
                                          , advertisement_title: ads.advertisement_title, advertisement_content: ads.advertisement_content
                                          , start_date: ads.start_date, end_date: ads.end_date
                                          , create_user: ads.create_user, create_date: ads.create_date
                                          , update_user: ads.update_user, update_date: ads.update_date
                                          , is_delete: ads.is_delete });
        if (result) {
            resolve(result);
          }
        resolve(false);
      } catch (error) {
        reject(error);
      }
    });
};

AdsService.updateById = (id,ads) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await adsModel.update(ads,
                                        {where: {
                                          advertisement_id: id
                                        }});
      
      if (result) {
          resolve(result);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

export default AdsService;
