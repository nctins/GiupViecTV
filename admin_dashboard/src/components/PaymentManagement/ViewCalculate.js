import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import {POST_TYPE, POST_STATE, PAYMENT_METHOD, PAYMENT_METHOD_CONDITION} from "../../constants/app_contants"
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Format from "../../utils/Format";

const ViewCalculate = ({data, helper, serviceFee, tax, setMessage, cancelCalculate, setIsLoading}) => {
  const { authAxios } = useAxios();
  const [codPosts,setCodPosts] = useState([]);
  const [vnpayPosts,setVnpayPosts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [receivePrice, setReceivePrice] = useState(0);
  const [enterprisePrice, setEnterprisePrice] = useState(0);

  const getDateTime = (date, time) => {
      return (
        <div>
          {date.substr(0,10)}
          <br/>
          {time}
        </div>
      )
  }

  useEffect(() => {
    let receive_price = 0;
    let init_cod_posts = {
      lst_post: data.lst_cart,
      total_price: 0,
      total_coupon_price: 0,
      total_service_fee: 0,
      total_tax: 0,
    }
    data.lst_cart.map((cart) => {
      init_cod_posts.total_price += parseInt(cart.total) + parseInt(cart.coupon_price);
      init_cod_posts.total_coupon_price += parseInt(cart.coupon_price);
      init_cod_posts.total_service_fee += (parseInt(cart.total) + parseInt(cart.coupon_price)) * serviceFee;
      init_cod_posts.total_tax += (parseInt(cart.total) + parseInt(cart.coupon_price)) * tax;
      receive_price += parseInt(cart.coupon_price);
    });

    let init_vnpay_posts = {
      lst_post: data.lst_cart_vnpay,
      total_price: 0,
      total_coupon_price: 0,
      total_service_fee: 0,
      total_tax: 0,
    }
    data.lst_cart_vnpay.map((cart) => {
      init_vnpay_posts.total_price += parseInt(cart.total) + parseInt(cart.coupon_price);
      init_vnpay_posts.total_coupon_price += parseInt(cart.coupon_price);
      init_vnpay_posts.total_service_fee += (parseInt(cart.total) + parseInt(cart.coupon_price)) * serviceFee;
      init_vnpay_posts.total_tax += (parseInt(cart.total) + parseInt(cart.coupon_price)) * tax;
      receive_price += (parseInt(cart.total) + parseInt(cart.coupon_price));
    });
    setCodPosts(init_cod_posts);
    setVnpayPosts(init_vnpay_posts);
    setReceivePrice(receive_price);
    setEnterprisePrice((init_cod_posts.total_price + init_vnpay_posts.total_price) * (tax + serviceFee));
    setTotalPrice(init_cod_posts.total_price + init_vnpay_posts.total_price);
  },[data])

  const confirmCalculate = () => {
    if(!helper){
        return;
    }
    setIsLoading(true);
    authAxios
        .put("/admin/SystemManagement/CalculatePriceHelper/confirm",{
            helper_id: helper.helper_id,
            start_date: data.start_date,
            end_date: data.end_date,
            total_price: totalPrice,
            receive_price: receivePrice,
            enterprise_price: enterprisePrice,
        })
        .then(async (response) => {
          let data = response.data.data;
          setMessage(data);
          cancelCalculate();
          setIsLoading(false);
        })
        .catch(async (error) => {
          if (error.response) {
              console.log(error.response.data);
              setMessage(error.response.data);
          }
          setIsLoading(false);
        });
  }

  const displayRowPost = (data_value) => {
    if(Array.isArray(data_value.lst_post) && data_value.lst_post.length > 0){
      return (
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th className="col-4">Thông tin lịch hẹn</th>
              <th className="col-2">Ngày thực hiện</th>
              <th className="col-2">Tổng tiền (1)</th>
              <th className="col-2">Tiền KM</th>
              <th className="col-1">Phí dịch vụ ({serviceFee * 100}%)</th>
              <th className="col-1">Thuế tạm tính ({tax * 100}%)</th>
            </tr>
          </thead>
          <tbody>
            {data_value.lst_post.map((tdata, index) => {
              return (
                  <tr key={index} className="border-top">
                  <td>
                      <div className="d-flex align-items-center p-2">
                          <div className="ms-3">
                              <h6 className="mb-0">{tdata.customer_name}</h6>
                              <span className="text-muted">{tdata.address}</span>
                          </div>
                      </div>
                  </td>
                  <td>{getDateTime(tdata.date, tdata.time)}</td>
                  <td>{Format.formatPrice(parseInt(tdata.total) + parseInt(tdata.coupon_price))}</td>
                  <td>{Format.formatPrice(tdata.coupon_price)}</td>
                  <td>{Format.formatPrice((parseInt(tdata.total) + parseInt(tdata.coupon_price)) * serviceFee)}</td>
                  <td>{Format.formatPrice((parseInt(tdata.total) + parseInt(tdata.coupon_price)) * tax)}</td>
                  </tr>
              )
              })}
              <tr className="border-top table-primary">
                  <td>Tổng cộng:</td>
                  <td></td>
                  <td>{Format.formatPrice(Math.abs(data_value.total_price))}</td>
                  <td>{Format.formatPrice(Math.abs(data_value.total_coupon_price))}</td>
                  <td>{Format.formatPrice(Math.abs(data_value.total_service_fee))}</td>
                  <td>{Format.formatPrice(Math.abs(data_value.total_tax))}</td>
              </tr>
              <tr className="border-top">
                  <td colSpan={12}>
                    {"* (1) = Số tiền khách hàng đã thanh toán cho lịch hẹn (chưa bao gồm số tiền giảm giá từ khuyến mãi)"}
                  </td>
                </tr>
          </tbody>
        </Table>
      )
    }else{
     return <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <tbody>
          <tr className="border-top table-primary">
            {"Không có lịch hẹn nào trong khoảng thời gian này!"}
          </tr>
        </tbody>
      </Table>
    }
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tổng kết</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Tổng kết số tiền của người giúp việc
          </CardSubtitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th className="col-9"></th>
                <th className="col-3">Tổng cộng</th>
              </tr>
            </thead>
            <tbody>
                <tr className="border-top table-primary">
                  <td>Tổng số tiền người giúp việc kiếm được: (1)</td>
                  <td>{Format.formatPrice(totalPrice)}</td>
                </tr>
                <tr className="border-top table-success">
                  <td>Tổng số tiền người giúp việc được nhận từ công ty: (2)</td>
                  <td>{Format.formatPrice(receivePrice)}</td>
                </tr>
                <tr className="border-top table-warning">
                  <td>Tổng số tiền người giúp việc phải trả cho công ty: (3)</td>
                  <td>{Format.formatPrice(enterprisePrice)}</td>
                </tr>
                <tr className="border-top">
                  <td></td>
                  <td><Button className="btn" size="md" color="primary" onClick={confirmCalculate}>Xác nhận thanh toán</Button></td>
                </tr>
                <tr className="border-top">
                  <td>
                    * (1) = [Tổng số tiền lịch hẹn thanh toán bằng tiền mặt] + [Tổng số tiền lịch hẹn thanh toán bằng vnpay]
                    <br/>
                    * (2) = [Tổng số tiền lịch hẹn thanh toán bằng vnpay] + [Tổng số tiền khuyến mãi đã giảm trên lịch hẹn thanh toán tiền mặt]
                    <br/>
                    * (3) = [Tổng số tiền phí dịch vụ] + [Tổng số tiền thuế tạm tính]
                  </td>
                </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh sách lịch hẹn ({data.start_date.substring(0,10)} - {data.end_date.substring(0,10)})</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Danh sách lịch hẹn đã được thanh toán bằng tiền mặt
          </CardSubtitle>
          {codPosts && displayRowPost(codPosts)}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh sách lịch hẹn ({data.start_date.substring(0,10)} - {data.end_date.substring(0,10)})</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Danh sách lịch hẹn đã được thanh toán bằng VNPAY
          </CardSubtitle>
          {vnpayPosts && displayRowPost(vnpayPosts)}
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewCalculate;
