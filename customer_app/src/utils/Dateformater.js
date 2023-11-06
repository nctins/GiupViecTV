const DateFormater = (date_text) => {
    const date_obj = new Date(date_text);
    const date = date_obj.getDate() < 10 ? `0${date_obj.getDate()}` : `${date_obj.getDate()}`;
    const month = (date_obj.getMonth() + 1) < 10 ? `0${date_obj.getMonth() + 1}` : `${date_obj.getMonth() + 1}`;
    const year = date_obj.getFullYear();
    return `${date}/${month}/${year}`;
}

export default DateFormater;

export const DateObj2String = (date_obj) => {
    if (! date_obj instanceof Date ) {
        return date_obj;
    }
    const date = date_obj.getDate() < 10 ? `0${date_obj.getDate()}` : `${date_obj.getDate()}`;
    const month = (date_obj.getMonth() + 1) < 10 ? `0${date_obj.getMonth() + 1}` : `${date_obj.getMonth() + 1}`;
    const year = date_obj.getFullYear();
    return `${year}-${month}-${date}`;
}