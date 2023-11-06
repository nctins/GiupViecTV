import bcrypt, { hash } from "bcrypt";

const saltRounds = 10;
const Password = {};

Password.hash = (plainText) => {
    return bcrypt.hashSync(plainText, saltRounds);
}

Password.compare = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash)
}

export default Password;