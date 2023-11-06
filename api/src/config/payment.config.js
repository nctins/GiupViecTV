import dotenv from "dotenv";
dotenv.config();

const paymentConfig = {
    vnp_TmnCode : process.env.VNPAY_TMN_CODE,
    vnp_HashSecret : process.env.VNPAY_SECRET_KEY,
    vnp_Url : process.env.VNPAY_VPN_URL,
    vnp_ReturnUrl : process.env.VNPAY_RETURN_URL,
    vnp_IpnURL: process.env.VNPAY_IPN_URL
}
export default paymentConfig;