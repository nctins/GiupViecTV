import { Col, Row } from "reactstrap";
import ServiceTable from "../components/ServiceManagement/ServiceManagerTable";

const ServiceManagement = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <ServiceTable />
        </Col>
      </Row>
    </div>
  );
};

export default ServiceManagement;
