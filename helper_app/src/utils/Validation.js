const Validation = {};

Validation.isEmail = (email) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regex.test(email);
};

Validation.isVietnamesePhoneNumber = (phone) => {
  let regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return regex.test(phone);
};

Validation.isLegitPassword = (password) => {
  let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
};

Validation.isMSDD = (MSDD) => {
  let regex1 = /^\d{9}$/;
  let regex2 = /^\d{12}$/;
  if(!regex1.test(MSDD) && !regex2.test(MSDD)){
    return false;
  }
  return true;
};

export default Validation;
