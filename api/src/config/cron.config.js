const TIME_ZONE = "Asia/Saigon";

// thực thi tác vụ ngay khi hàm schedule được gọi
export const ScheduleConfig = {
    scheduled: true,
    timezone: TIME_ZONE
}; 

// thực thi tác vụ khi gọi hàm start()
export const NotScheduleConfig = {
    scheduled: false,
    timezone: TIME_ZONE
}; 