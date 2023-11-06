import bcrypt from "bcrypt";
import db from "../models/index";
import { DateObj2TimeStr } from "../utils/Dateformater";
const { Op } = require("sequelize");

const WorkingScheduleModel = db.working_schedule;
const WorkingScheduleService = {};

WorkingScheduleService.getAll = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const working_schedule = await WorkingScheduleModel.findAll({ where: { helper_id: helper_id }});
      if (!working_schedule) {
        resolve([]);
        return;
      }
      resolve(working_schedule);
    } catch (error) {
      reject(error);
    }
  })
}

WorkingScheduleService.updateOrInsert = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const day_schedule = await WorkingScheduleModel.findOne({where:{helper_id: values.helper_id, day: values.day}});
      if (day_schedule) {
        resolve(day_schedule.update(values));
        return;
      }
      WorkingScheduleModel.create(values);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

WorkingScheduleService.setDefaultSchedule = (helper_id) => {
  return new Promise(async (resolve, reject) => {
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
    const data = default_schedule.map((day, idx) => {
      return {
        helper_id: helper_id,
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
      let delete_schedule = await WorkingScheduleModel.destroy({
        where:{
          helper_id: helper_id
        },
        transaction: t
      });
      if (!delete_schedule) {
        reject(false);
        return;
      }
      for(const day of data){
        let create_schedule = await WorkingScheduleModel.create(
            day,
            {transaction: t});
        if(!create_schedule){
          reject(false);
          return;
        }
      }
      t.commit();
      resolve(true);
    } catch (error) {
      t.rollback();
      console.log(error);
      reject(error);
    }
  })
}


export default WorkingScheduleService;
