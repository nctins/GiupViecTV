import { Col, Row } from "reactstrap";
import { useState } from "react";
import CalculatePaymentHelper from "../components/PaymentManagement/CalculatePaymentHelper";
import LoadingView from '../components/LoadingView';

const PaymentManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <LoadingView />}
      <Row>
        <Col lg="12">
          <CalculatePaymentHelper setIsLoading={setIsLoading} />
        </Col>
      </Row>
    </div>
  );
};

export default PaymentManagement;
