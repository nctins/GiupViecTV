import { Col, Row } from "reactstrap";
import VoucherManagerListItem from "../components/VoucherManagement/VoucherManagerListItem";

const VoucherManagement = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <VoucherManagerListItem />
        </Col>
      </Row>
    </div>
  );
};

export default VoucherManagement;
