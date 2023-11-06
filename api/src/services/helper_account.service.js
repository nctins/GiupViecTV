import bcrypt from "bcrypt";
import db from "../models/index";
import uniqid from 'uniqid';
import Password from "../utils/Password";
import IDGenerator from "../utils/IDGenerator";
import { DateObj2TimeStr } from "../utils/Dateformater";
import { MIN_WORK_MINUS, SEVEN_DAY_IN_MS } from "../constants/system_constants";
import { POST_STATE } from "../constants/db_constants";
const { Op, Sequelize } = require("sequelize");

const HelperAccountModel = db.helper_account;
const WorkingScheduleModel = db.working_schedule;
const ServiceModal = db.services;
const HelperServiceWorkModal = db.helper_service_work;
const PostsModel = db.posts;
const HelperService = {};

HelperService.handleSignin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helper = await HelperAccountModel.findOne({
        where: { email: email },
      });
      if (!helper) {
        resolve(false);
      }
      let result = await bcrypt.compare(password, helper.password);
      if (result) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.findOne = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helper = await HelperAccountModel.findOne({
        where: { email: email },
      });
      if (helper) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.createHelper = (data) => {
  return new Promise(async (resolve, reject) => {
    data.password = Password.hash(data.password);
    data.helper_id = IDGenerator("HEL_");
    data.credits = 70;

    const cur_date = new Date();
    const default_schedule = [
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 2",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 3",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 4",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 5",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 6",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Thứ 7",
        "value": true,
      },
      {
        "time_list": [
        {
          "from": new Date(cur_date.setHours(7, 30, 0)),
          "to": new Date(cur_date.setHours(11, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(13, 30, 0)),
          "to": new Date(cur_date.setHours(17, 30, 0)),
        },
        {
          "from": new Date(cur_date.setHours(17, 0, 0)),
          "to": new Date(cur_date.setHours(22, 0, 0)),
        },
        ],
        "title": "Chủ nhật",
        "value": true,
      },
    ];
    const schedule_data = default_schedule.map((day, idx) => {
      return {
        helper_id: data.helper_id,
        day: idx,
        is_working: day.value,
        time_from_1: day.time_list[0].from ? DateObj2TimeStr(day.time_list[0].from) : null,
        time_to_1: day.time_list[0].to ? DateObj2TimeStr(day.time_list[0].to) : null,
        time_from_2: day.time_list[1].from ? DateObj2TimeStr(day.time_list[1].from) : null,
        time_to_2: day.time_list[1].to ? DateObj2TimeStr(day.time_list[1].to) : null,
        time_from_3: day.time_list[2].from ? DateObj2TimeStr(day.time_list[2].from) : null,
        time_to_3: day.time_list[2].to ? DateObj2TimeStr(day.time_list[2].to) : null,
      }
    });

    const t = await db.sequelize.transaction();
    try {
      let result = await HelperAccountModel.create(data, {transaction: t});
      if (!result) {
        reject(false);
      }
      for(const day of schedule_data){
        let create_schedule = await WorkingScheduleModel.create(
            day,
            {transaction: t});
        if(!create_schedule){
          reject(false);
          return;
        }
      }

      const services = await ServiceModal.findAll({
        where: {
          is_active: 1,
          is_delete: 0,
        }
      });
      const destroyServiceWork = await HelperServiceWorkModal.destroy({
        where:{
          helper_id: data.helper_id,
        },
        transaction: t,
      });

      if(Array.isArray(services) && services.length > 0){
        for(const service of services){
          let updateServiceWork = await HelperServiceWorkModal.create(
            {
              helper_id: data.helper_id,
              service_id: service.service_id,
            },
            {transaction: t}
          );
          if(!updateServiceWork){
            reject(false);
            return;
          }
        }
      }

      t.commit();
      resolve(result);
    } catch (error) {
      t.rollback();
      reject(error);
    }
  });
};

HelperService.getAll = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helpers = await HelperAccountModel.findAll({
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
      if (helpers) {
        resolve(helpers);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.getAllHelperActive = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let helpers = await HelperAccountModel.findAll({
        where: {
          is_active: 1,
          is_delete: 0,
        }
      });
      if (helpers) {
        resolve(helpers);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.getOneById = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helper = await HelperAccountModel.findOne({
        where: { helper_id: helper_id },
      });
      if (helper) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.getOneByEmail = (helper_email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helper = await HelperAccountModel.findOne({
        where: { email: helper_email },
      });
      if (helper) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.checkCurrentPassword = (helper,currentPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await bcrypt.compare(currentPassword, helper.password);
      if(result){
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};

HelperService.updateById = (helper_id,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(data.password){
        data.password = Password.hash(data.password);
      }
      // console.log(data);
      let helper = await HelperAccountModel.update(data,{
        where: { helper_id: helper_id },
      });
      if (helper) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};
HelperService.addCredit = (helper_id, num) => {
  return new Promise(async (resolve, reject) => {
    try {
      let helper = await HelperAccountModel.findOne({
        where: { helper_id: helper_id },
      });
      const credits = helper.credits + num;
      helper.update({credits: credits});
      if (helper) {
        resolve(helper);
      }
      resolve(false);
    } catch (error) {
      reject(false);
    }
  });
};


// check ngv làm việc đủ giờ trong tuần không
HelperService.checkTimeContraint  = async ({is_lock_user = true}) => {
  const current_date = new Date();
  current_date.setHours(23,0,0,0); // current day is 23h00
  const last_7_date = new Date(current_date.valueOf() - SEVEN_DAY_IN_MS);

  try {
    const violate_helpers = await HelperAccountModel.findAll({
      attributes: [
        "helper_id", 
        [Sequelize.fn(
          "IFNULL", 
          Sequelize.literal(`SUM(post.total_estimate_time)`), 0),
          "time_work"
        ]
      ],
      include: [{
        model: PostsModel,
        source: "helper_id",
        target: "helper_id",
        attributes: [],
        where: {
          date: {
            [Op.between]: [last_7_date, current_date],
          },
          post_state: POST_STATE.COMPLETE,
        },
        as: "post",
        required: false,
      }],
      having: {
        "time_work": {
          [Op.lt]: MIN_WORK_MINUS
        }
      },
      group: "helper_account.helper_id",
    })
  
    // console.log(violate_helpers);
    if (is_lock_user) {
      // lock helper
      for (let helper of violate_helpers) {
        await helper.update({is_active: false});
      }
    } else {
      // create notification to helper
    }
    return violate_helpers;
  } catch (error) {
    console.log(error);
    return [];
  }

}

export default HelperService;
