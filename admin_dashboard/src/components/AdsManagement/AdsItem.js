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
  
  const AdsItem = (props) => {
    const navigate = useNavigate();

    const ads = props.ads;
    return (
      <Card>
        <CardImg alt="Card image cap" style={{height: 200}} src={ads.ads_url} />
        <CardBody className="p-4">
            <CardTitle tag="h5">
            {ads.ads_title}
            {
              !ads.is_delete ? 
              (<Badge color="primary" className="ms-2" >Hiệu lực</Badge>)
              : (<Badge color="danger" className="ms-2" >Hết hiệu lực</Badge>)  
            }
            </CardTitle>
            <CardSubtitle>{ads.startDate.substr(0,10)} - {ads.endDate.substr(0,10)}</CardSubtitle>
            <CardText className="mt-3">{ads.ads_content}</CardText>
            <Button color={props.color} onClick={() => {navigate("/AdsManagement/update/" + ads.ads_id)}}>Xem thêm</Button>
        </CardBody>
      </Card>
    );
  };
  
  export default AdsItem;
  