import { Col, Row } from "reactstrap";
import UserManagerTable from "../components/UserManagerment/UserManagerTable";

const UserManagement = () => {
  return (
    <div>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <UserManagerTable />
        </Col>
      </Row>
    </div>
  );
};

export default UserManagement;
