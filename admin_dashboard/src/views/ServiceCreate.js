import { Col, Row } from "reactstrap";
import ServiceCreateForm from "../components/ServiceManagement/ServiceCreateForm";

const AdsCreate = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <ServiceCreateForm />
        </Col>
      </Row>
    </div>
  );
};

export default AdsCreate;
