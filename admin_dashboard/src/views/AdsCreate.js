import { Col, Row } from "reactstrap";
import AdsCreateForm from "../components/AdsManagement/AdsCreateForm";

const AdsCreate = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <AdsCreateForm />
        </Col>
      </Row>
    </div>
  );
};

export default AdsCreate;
