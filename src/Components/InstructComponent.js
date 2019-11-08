import React from 'react';
import {Col, Row} from "reactstrap";

const InstructComponent = ({text}) => {
  return (
    <Row>
      <Col>
        <h6 className="blue-color font-weight-bolder">{text}</h6>
      </Col>
    </Row>
  );
};

export default InstructComponent;