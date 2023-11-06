import * as jwt from "jsonwebtoken";
import AuthConfig from "../config/auth.config";
import * as OTPGenerator from "otp-generator";

export const createToken = (payload) => {
  return jwt.sign(payload, AuthConfig.secret, {
    expiresIn: AuthConfig.jwtExpiration,
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, AuthConfig.secret, {
    expiresIn: AuthConfig.jwtRefreshExpiration,
  });
};

export const decodeToken = (token) => {
  try {
    let decoded = jwt.verify(token, AuthConfig.secret);
    return {
      decode: decoded,
      error: null,
    };
  } catch (err) {
    return {
      decode: null,
      error: err,
    };
  }
};

export const createOTP = () => {
  return OTPGenerator.generate(5, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
