const Validation = {};

Validation.isEmail = (email) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regex.test(email);
};

Validation.isVietnamesePhoneNumber = (phone) => {
  let regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return regex.test(phone);
}

Validation.isLegitPassword = (password) => {
  let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
}
export default Validation;