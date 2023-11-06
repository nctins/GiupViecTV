const Format = {};

Format.formatPrice = (price) => {
    price = parseInt(price);
    return price.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
};

Format.removeFormatPrice = (formatPrice) => {
    let rs = formatPrice.replaceAll(",","");
    rs = rs.substr(1);
    return rs;
};

export default Format;