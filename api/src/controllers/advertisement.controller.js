import ErrorResponse from "../utils/ErrorResponse";
import HTTP_STATUS_CODE from "../constants/http_code";
import USER_ROLE from "../constants/user_role";
import AdsService from "../services/advertisement.service";
import IDGenerator from "../utils/IDGenerator";

const AdsController = {}

AdsController.getAll = async (req, res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;

  let adsLst = [];

  if(USER_ROLE.ADMIN === role){
    // admin get all advertisement have isDelete
    let filter = {};
    let title = "";

    title = req.body.title;
    if(title.length > 0){
      filter.title = "%" + title + "%";
    }else{
      filter.title = "%";
    }

    if(req.body.is_delete){
      filter.is_delete = [0,1];
    }else{
      filter.is_delete = [0];
    }
    adsLst = await AdsService.getAllByAdmin(filter);

    if(Array.isArray(adsLst) && adsLst.length > 0){
      adsLst = adsLst.map((ads) => {
        return {
          ads_id: ads.advertisement_id,
          ads_title: ads.advertisement_title,
          ads_content: ads.advertisement_content,
          ads_url: ads.poster_path,
          startDate: ads.start_date,
          endDate: ads.end_date,
          is_delete: ads.is_delete,
        }
      })
    }
  }else{
    // user get all advertisement not have isDelete
    adsLst = await AdsService.getAllByUser();
  }

  if(adsLst && adsLst.length == 0){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: [],
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    data: adsLst,
  });
};

AdsController.getOneById = async (req,res) => {
  let auth_info = req.auth_info;
  let role = auth_info.role;
  let ads;
  let id = req.params.advertisement_id;

  if(!id){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST ,
      "Chưa nhập ID!"
    );
  }
  if(USER_ROLE.ADMIN === role){
    // admin get all advertisement have isDelete
    ads = await AdsService.getOneByIdWithAdmin(id);
    ads = {
      ads_id: ads.advertisement_id,
      ads_title: ads.advertisement_title,
      ads_content: ads.advertisement_content,
      ads_url: ads.poster_path,
      start_date: ads.start_date,
      end_date: ads.end_date,
      is_delete: ads.is_delete,
    }
  }else{
    // user get all advertisement not have isDelete
    ads = await AdsService.getOneByIdWithUser(id);
  }

  if(ads){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: ads,
    });
  }
  return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
    data: "Không tìm thấy quảng cáo!",
  });
};

AdsController.updateById = async (req,res) => {
  let auth_info = req.auth_info;
  let advertisement_id = req.params.advertisement_id;
  let ads = await AdsService.getOneByIdWithAdmin(advertisement_id);
  let image = req.body.image;
  let image_url = "";

  if(!ads){
    return res.status(HTTP_STATUS_CODE.NOT_ACCEPTABLE).json({
      data: "Id không tồn tại!",
    });
  }
  image_url = ads.poster_path;

  ads = {
    advertisement_title: req.body.title,
    advertisement_content: req.body.content,
    start_date: new Date(req.body.start_date),
    end_date: new Date(req.body.end_date),
    update_user: auth_info.id,
    update_date: new Date(),
    is_delete: req.body.is_delete,
  };
  
  if(image){
    const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        console.log(result);
        if(result.url){
          image_url = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
  }

  ads.poster_path = image_url;

  let result = await AdsService.updateById(advertisement_id,ads);
  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Cập nhật quảng cáo thành công!",
    });
  }
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED ,
    "Cập nhật quảng cáo không thành công!"
  );
};

AdsController.create = async (req,res) => {
  let auth_info = req.auth_info;
  let advertisement_id = IDGenerator("ADV_");
  let create_date = new Date();
  let image_url = "";
  let image = req.body.image;

  let ads = await AdsService.getOneByIdWithAdmin(advertisement_id);
  if(ads){
    return ErrorResponse(
      res,
      HTTP_STATUS_CODE.EXPECTATION_FAILED ,
      "Id đã tồn tại!"
    );
  }

  if(image){
    const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.upload(image).then(async(result) => {
        console.log(result);
        if(result.url){
          image_url = result.url;
        }else{
          return ErrorResponse(
            res,
            HTTP_STATUS_CODE.EXPECTATION_FAILED ,
            "Cập nhật tài khoản không thành công!"
          );
        }
      });
  }
  
  ads = {
    advertisement_id: advertisement_id, 
    poster_path: image_url,
    advertisement_title: req.body.title, 
    advertisement_content: req.body.content,
    start_date: new Date(req.body.start_date), 
    end_date: new Date(req.body.end_date),
    create_user: auth_info.id, 
    create_date: create_date,
    update_user: auth_info.id, 
    update_date: create_date,
    is_delete: false
  }

  let result = await AdsService.create(ads);

  if(result){
    return res.status(HTTP_STATUS_CODE.OK).json({
      data: "Thêm quảng cáo thành công!",
    });
  }
  return ErrorResponse(
    res,
    HTTP_STATUS_CODE.EXPECTATION_FAILED ,
    "Thêm quảng cáo không thành công!"
  );
};

export default AdsController;
