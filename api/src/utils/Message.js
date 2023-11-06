import { PAYMENT_METHOD } from "../constants/db_constants";
import { CANCEL_CREDIT, POST_TIMEOUT_HOURS } from "../constants/system_constants";
import USER_ROLE from "../constants/user_role";
import DateFormater from "./Dateformater";

const Message = {};

Message.orderAccept = (post_id, helper_name) => {
  const id = post_id.slice(-5);
  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} của bạn đã được chấp nhận bởi ${helper_name}`,
  };
};

Message.orderMatch = (post) => {
  const id = post.post_id.slice(-5);
  const date = post.date;
  const time = post.time.slice(0,5);
  return {
    title: `Ghép nối thành công`,
    content: `Bạn có thêm lịch hẹn với khách hàng ${post.customer_name} vào lúc ${time} ngày ${DateFormater(date)}.`,
  };
}

Message.orderCancel = (post_id, user_name, reason_cancel) => {
  const id = post_id.slice(-5);
  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} đã được bị hủy bởi ${user_name} vì lý do "${reason_cancel}"`,
  };
};

Message.orderCompleteByHelper = (post_id) => {
  const id = post_id.slice(-5);
  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} đã hoàn thành vui lòng đánh giá người giúp việc.`,
  }
}

Message.orderCompleteByCustomer = (post_id) => {
  const id = post_id.slice(-5);
  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} đã được thanh toán vui lòng đánh giá khách hàng.`,
  }
}

Message.orderComplete = (post_id, user_role) => {
  const id = post_id.slice(-5);
  const partner = user_role == USER_ROLE.CUSTOMER ? "người giúp việc" : "khách hàng"
  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} đã hoàn thành vui lòng đánh giá ${partner}.`,
  }
}

Message.orderPrepareStart = (post_id, second) => {
  const id = post_id.slice(-5);
  return {
    title: `Lịch hẹn #${id}`,
    content: `Bạn có lịch hẹn #${id} sẽ bắt đầu sau ${second / 60} phút.`,
  }
}

Message.postOverdueToHelper = (post) => {
  const id = post.post_id.slice(-5);
  const payment_method = post.payment_method;
  
  const cod_content = `Lịch hẹn #${id} đã quá thời gian dự kiến hoàn thành`
  +` vui lòng hủy hoặc hoàn thành lịch hẹn.`
  +` (*Lịch hẹn sẽ bị hủy vào 23:59 ngày mai nếu chưa được cập nhật)`;
  const vnpay_content = `Lịch hẹn #${id} đã quá thời gian dự kiến hoành thành`
  +` vui lòng hủy hoặc yêu cầu khách hàng thanh toán để hoàn thành lịch hẹn.`
  +` (*Lịch hẹn sẽ bị hủy vào 23:59 ngày mai nếu chưa được cập nhật)`;

  const content = PAYMENT_METHOD.COD == payment_method ? cod_content : vnpay_content;
    
  return {
    title: `Lịch hẹn #${id}`,
    content: content,
  };
}

Message.postOverdueToCustomer = (post) => {
  const id = post.post_id.slice(-5);
  const payment_method = post.payment_method;

  const cod_content = `Lịch hẹn #${id} đã quá thời gian dự kiến hoàn thành`
  +` vui lòng hủy hoặc yêu cầu người giúp việc hoàn thành lịch hẹn.`
  +` (*Lịch hẹn sẽ bị hủy vào 23:59 ngày mai nếu chưa được cập nhật)`;
  const vnpay_content = `Lịch hẹn #${id} đã quá thời gian dự kiến hoành thành`
  +` vui lòng hủy hoặc thanh toán để hoàn thành lịch hẹn.`
  +` (*Lịch hẹn sẽ bị hủy vào 23:59 ngày mai nếu chưa được cập nhật)`;

  const content = PAYMENT_METHOD.COD == payment_method ? cod_content : vnpay_content;
    
  return {
    title: `Lịch hẹn #${id}`,
    content: content,
  };
}

Message.cancelOverduePostToHelper = (post) => {
  const id = post.post_id.slice(-5);
  const payment_method = post.payment_method;

  const cod_content = `Lịch hẹn #${id} đã bị hủy vì quá thời gian dự kiến hoàn thành ${POST_TIMEOUT_HOURS} giờ. `
  +`Bạn đã bị trừ ${-CANCEL_CREDIT} điểm tin cậy.`;
  const vnpay_content = `Lịch hẹn #${id} đã bị hủy vì quá thời gian dự kiến hoành thành ${POST_TIMEOUT_HOURS} giờ.`;

  const content = PAYMENT_METHOD.COD == payment_method ? cod_content : vnpay_content;
    
  return {
    title: `Lịch hẹn #${id}`,
    content: content,
  };
}

Message.cancelOverduePostToCustomer = (post) => {
  const id = post.post_id.slice(-5);

  return {
    title: `Lịch hẹn #${id}`,
    content: `Lịch hẹn #${id} đã bị hủy vì quá thời gian dự kiến hoành thành ${POST_TIMEOUT_HOURS} giờ.`,
  };
}



Message.otpMail = (email, otp, user) => {
  return {
    email: email,
    subject: "GiupViecTV: MÃ XÁC THỰC ",
    content: `
    <div style="font-family: Helvetica,Arial,sans-serif;width:700px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="#" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Giúp Việc T&V</a>
        </div>
        <p style="font-size:1.1em">Chào ${user.name},</p>
        <p>Cảm ơn vì đã chọn dịch vụ của chúng tôi. 
        <br/>Hãy sử dụng mã xác thực sau để hoàn tất việc lấy lại mật khẩu. Mã xác thực này có hiệu lực trong vòng 2 giờ</p>
        <h2 style="background: #00466a;margin: 0 auto;width: 60px;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Giúp Việc T&V</p>
      </div>
    </div>
    `,
  };
};

export default Message;
