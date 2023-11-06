import { Col, Row } from "reactstrap";
import FeedbackTable from "../components/Feedback/FeedbackTable";

const Feedback = () => {
  return (
    <div>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <FeedbackTable />
        </Col>
      </Row>
    </div>
  );
};

export default Feedback;
