import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const BadgesComponent = ({text}) => {
  return (
    <Row className="bottom-margin">
      <Col>
        <h5 className="badge-mod"><Badge color="success">#Registration</Badge></h5>
        <h5 className="badge-mod"><Badge color="success">#Chat</Badge></h5>
        <h5 className="badge-mod"><Badge color="success">#Posting</Badge></h5>
        <h5 className="badge-mod"><Badge color="success">#Inviting</Badge></h5>
      </Col>
    </Row>
  );
};

export default BadgesComponent;