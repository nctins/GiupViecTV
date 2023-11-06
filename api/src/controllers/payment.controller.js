import { auth } from "google-auth-library";
import {
  ID_PREFIX,
  PAYMENT_METHOD,
  POST_STATE,
  POST_TYPE,
} from "../constants/db_constants";
import HTTP_STATUS_CODE from "../constants/http_code";
import SOCKET_ACT from "../constants/socket_action";
import { CANCEL_CREDIT, COMPLETE_CREDIT } from "../constants/system_constants";
import USER_ROLE from "../constants/user_role";
import CustomerService from "../services/customer_account.service";
import NotificationService from "../services/notification.service";
import PostsService from "../services/posts.service";
import VoucherService from "../services/voucher.service";
import RestScheduleService from "../services/rest_schedule.service";
import WorkingScheduleService from "../services/working_schedule.service";
import HelperService from "../services/helper_account.service";
import DistanceService from "../services/distance.service";
import ErrorResponse from "../utils/ErrorResponse";
import IDGenerator from "../utils/IDGenerator";

const PaymentControler = {};
const dateFormat = require('dateformat');

PaymentControler.createPaymentUrl = async (req, res) => {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var config = require('../config/payment.config');
    var tmnCode = config.default.vnp_TmnCode;
    var secretKey = config.default.vnp_HashSecret;
    var vnpUrl = config.default.vnp_Url;
    var returnUrl = config.default.vnp_ReturnUrl;
    // var ipnUrl = config.default.vnp_IpnURL;

    var date = new Date();
    var post = await PostsService.getPostById(req.body.post_id);
    // console.log(post);

    var createDate = dateFormat(date, "yyyymmddHHMMss");
    // var orderId = res.body.post_id + dateFormat(date, 'HHMMss');
    var orderId = post.post_id;
    var amount = post.total;
    // var bankCode = req.body.bankCode;
    
    var orderInfo = "Thanh toán lịch hẹn ID: " + post.post_id;
    // var orderType = req.body.orderType;
    var orderType = "billpayment";
    var locale = 'vn';
    // var locale = req.body.language;
    // if(locale === null || locale === ''){
    //     locale = 'vn';
    // }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    // vnp_Params['vnp_IpnURL'] = ipnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    // if(bankCode !== null && bankCode !== '' && bankCode !== undefined){
    //     vnp_Params['vnp_BankCode'] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    _socketio.emit(orderId, {
        isPayment: 0,
        create_Date: createDate,
      });

    // res.redirect(vnpUrl)

    return res.status(HTTP_STATUS_CODE.OK).json({
        data: {
            uri: vnpUrl,
            orderId: orderId
        },
    });
};

PaymentControler.VNPAY_ReturnUrl = async (req, res) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];
    var orderId = vnp_Params['vnp_TxnRef'];
    var date = new Date();
    var createDate = dateFormat(date, "yyyymmddHHMMss");

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var config = require('../config/payment.config');
    var tmnCode = config.default.vnp_TmnCode;
    var secretKey = config.default.vnp_HashSecret;

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        // res.render('success', {code: vnp_Params['vnp_ResponseCode']})
        console.log('code: ' + vnp_Params['vnp_ResponseCode']);
        if(vnp_Params['vnp_ResponseCode'] == "00"){
            _socketio.emit(orderId, {
                isPayment: 1,
                create_Date: createDate,
                code: vnp_Params['vnp_ResponseCode']
            });
        }else{
            _socketio.emit(orderId, {
                isPayment: 0,
                create_Date: createDate,
                code: vnp_Params['vnp_ResponseCode']
            });
        }
        return res.status(HTTP_STATUS_CODE.OK).json({
            code: vnp_Params['vnp_ResponseCode'],
        });
    } else{
        // res.render('success', {code: '97'})
        console.log("Chữ ký không hợp lệ");
        console.log('code: 97');
    }
}

PaymentControler.VNPAY_IPN_Url = async (req, res) => {
    console.log("abc");
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    
    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var config = require('../config/payment.config');
    var tmnCode = config.default.vnp_TmnCode;
    var secretKey = config.default.vnp_HashSecret;
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    // let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    // let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
    
    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if(secureHash === signed){ //kiểm tra checksum
        if(checkOrderId){
            if(checkAmount){
                if(paymentStatus=="0"){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if(rspCode=="00"){
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({RspCode: '00', Message: 'Success'})
                    }
                    else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({RspCode: '00', Message: 'Success'})
                    }
                }
                else{
                    res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
                }
            }
            else{
                res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
            }
        }       
        else {
            res.status(200).json({RspCode: '01', Message: 'Order not found'})
        }
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
    }
}

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export default PaymentControler;
