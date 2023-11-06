import { Col, Row } from "reactstrap";
import { useState } from "react";
import CalculatePaymentHelper from "../components/PaymentManagement/CalculatePaymentHelper";
import NotificationCreateForm from "../components/SystemManagement/NotificationCreateForm";
import LoadingView from '../components/LoadingView';
import SettingSystemForm from "../components/SystemManagement/SettingSystemForm";

const SystemManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <LoadingView />}
      <Row>
        <Col lg="12">
          <NotificationCreateForm setIsLoading={setIsLoading} />
          <SettingSystemForm setIsLoading={setIsLoading} />
        </Col>
      </Row>
    </div>
  );
};

export default SystemManagement;
