const DateFormater = (date_text) => {
    const date_obj = new Date(date_text);
    const date = date_obj.getDate() < 10 ? `0${date_obj.getDate()}` : `${date_obj.getDate()}`;
    const month = (date_obj.getMonth() + 1) < 10 ? `0${date_obj.getMonth() + 1}` : `${date_obj.getMonth() + 1}`;
    const year = date_obj.getFullYear();
    return `${date}/${month}/${year}`;
}

export default DateFormater;

export const TimeStr2DateObj = (str) => {
    const DateObj = new Date();
    [HH, MM, SS] = str.split(":");
    DateObj.setHours(HH, MM, 0, 0);
    return DateObj;
}

export const DateObj2TimeStr = (dateObj) => {
    return dateObj.toTimeString().slice(0,8);
}