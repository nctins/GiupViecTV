var DistanceConfig = require('google-distance-matrix');
DistanceConfig.key('AIzaSyDxX01Qp1r3Yb5uVFZcstsY88FmKYPjqNA');
DistanceConfig.mode('driving');

const DistanceService = {};

DistanceService.calculate_distance = (origins, destinations) => {
  return new Promise(async (resolve, reject) => {
    try {
        DistanceConfig.matrix(origins, destinations, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    } catch (error) {
      reject(false);
    }
  });
};

export default DistanceService;
