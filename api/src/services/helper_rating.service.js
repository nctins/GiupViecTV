import db from "../models/index";

const HelperRatingModel = db.helper_rating;
const HelperRatingService = {};

HelperRatingService.create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await HelperRatingModel.create(data);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
HelperRatingService.getCustomerRank = (customer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ratings = await HelperRatingModel.findAll({where: {target_id: customer_id}});
      if(!ratings || ratings.length == 0) {
        resolve(0);
      }
      const count = ratings.length;
      let total_rank  = 0;
      ratings.forEach((ele)=>{
        total_rank += parseInt(ele.rank);
      });
      if (count == 0) {
        resolve(0);
        return;
      }
      const rank = total_rank / count;
      resolve(rank);
    } catch (error) {
      reject(error);
    }
  })
}

HelperRatingService.getCustomerRating = (customer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ratings = await HelperRatingModel.findAll({where: {target_id: customer_id}});
      if (!ratings || ratings.length == 0) {
        resolve([]);
      }
      let result = [];
      for (const rating of ratings) {
        const helper = await rating.getHelper();
        result.push({
          rank: rating.rank,
          content: rating.content,
          date_time: rating.date_time,
          user_name: helper.name
        })
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}

HelperRatingService.getRating = (where_condition) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const rating = await HelperRatingModel.findOne({where: where_condition});
      if (!rating) {
        resolve(null);
      }
      resolve(rating.dataValues);
    } catch (error) {
      reject(error)
    }
  })
}

export default HelperRatingService;
