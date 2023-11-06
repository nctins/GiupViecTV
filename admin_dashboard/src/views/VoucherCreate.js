import { Col, Row } from "reactstrap";
import VoucherCreateForm from "../components/VoucherManagement/VoucherCreateForm";

const VoucherCreate = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <VoucherCreateForm />
        </Col>
      </Row>
    </div>
  );
};

export default VoucherCreate;
