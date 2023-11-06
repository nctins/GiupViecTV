import db from "../models/index";

const CustomerRatingModel = db.customer_rating;
const CustomerRatingService = {};

CustomerRatingService.create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await CustomerRatingModel.create(data);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

CustomerRatingService.getHelperRank = (helper_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ratings = await CustomerRatingModel.findAll({where: {target_id: helper_id}});
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

CustomerRatingService.getHelperRating = (helper_id) =>{
  return new Promise(async (resolve, reject)=>{
    try {
      const ratings = await CustomerRatingModel.findAll({where:{target_id: helper_id}});
      if (!ratings || ratings.length == 0) {
        resolve([]);
      }
      let result = [];
      for (const rating of ratings) {
        const customer = await rating.getCustomer();
        result.push({
          rank: rating.rank,
          content: rating.content,
          date_time: rating.date_time,
          user_name: customer.name
        })
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  })
}

CustomerRatingService.getRating = (where_condition) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const rating = await CustomerRatingModel.findOne({where: where_condition});
      if (!rating) {
        resolve(null);
      }
      resolve(rating.dataValues);
    } catch (error) {
      reject(error)
    }
  })
}

export default CustomerRatingService;
