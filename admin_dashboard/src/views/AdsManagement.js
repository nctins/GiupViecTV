import { Col, Row } from "reactstrap";
import AdsManagerListItem from "../components/AdsManagement/AdsManagerListItem";

const AdsManagement = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <AdsManagerListItem />
        </Col>
      </Row>
    </div>
  );
};

export default AdsManagement;
