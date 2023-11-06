// thời gian phục vụ
export const TIMESERVING_HOURS = 3; // 3h
export const TIMESERVING_MILISEC = 10800000; // 3 * 60 * 60 *1000 = 10800000 miliseconds

// điểm tin cậy khi đánh giá
export const CREDIT_RATING = {
    0: -2,
    1: -2,
    2: -1,
    3: 0,
    4: 1,
    5: 2,
};

// điểm tin cậy bắt đầu
export const INIT_CREDIT = 70;

// điểm tin cậy bị trừ khi hủy đơn hàng
export const CANCEL_CREDIT = -1;

// điểm tin cậy khi hoàn thành
export const COMPLETE_CREDIT = 1;

// thời gian quá hạn tối đa của lịch hẹn
export const POST_TIMEOUT_MILISEC = 86400000 // 24 * 60 * 60 * 1000 milisecon
export const POST_TIMEOUT_HOURS = 24 // 24 hours

// thời gian làm việc tối thiểu của người giúp việc trong tuần
export const MIN_WORK_HOUR = 16; // 16 h
export const MIN_WORK_MINUS = 960; // 16 * 60 p

export const  SEVEN_DAY_IN_MS = 604800000 // 7 * 24 * 60 * 60 * 1000 milisecon