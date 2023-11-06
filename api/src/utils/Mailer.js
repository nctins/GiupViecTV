import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

const Mailer = {};

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

Mailer.send = ({ email, subject, content }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const access_token_obj = await myOAuth2Client.getAccessToken();
      const access_token = access_token_obj?.token;

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: access_token,
        },
      });

      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: subject, // Tiêu đề email
        html: content, // Nội dung email
      };

      await transport.sendMail(mailOptions);

      resolve(true);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default Mailer;
