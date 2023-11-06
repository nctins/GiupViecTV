import { Outlet, Navigate, useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
    Badge
  } from "reactstrap";
  
  const VoucherItem = (props) => {
    const navigate = useNavigate();
    const voucher = props.voucher;
    return (
      <Card>
        <CardImg alt="Card image cap" style={{height: 200}} src={voucher.voucher_url} />
        <CardBody className="p-4">
            <CardTitle tag="h5">{voucher.voucher_name}</CardTitle>
            <CardSubtitle>{voucher.start_date.substr(0,10)} - {voucher.end_date.substr(0,10)}</CardSubtitle>
            <CardSubtitle>
                <Badge color="info" >
                    {voucher.voucher_code}
                </Badge>
                <Badge color="warning" className="ms-2">
                    {voucher.quantity} mã còn lại
                </Badge>
                {voucher.is_delete ? <Badge color="danger" className="ms-2" >hết hiệu lực</Badge> : <Badge color="primary" className="ms-2" >hiệu lực</Badge>}
                
            </CardSubtitle>
            <CardText className="mt-3">{voucher.description}</CardText>
            <Button color={props.color} onClick={() => {navigate("/VoucherManagement/update/" + voucher.voucher_id)}}>Xem thêm</Button>
        </CardBody>
      </Card>
    );
  };
  
  export default VoucherItem;
  