const DateFormater = (date_text) => {
    const date = new Date(date_text);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export default DateFormater;