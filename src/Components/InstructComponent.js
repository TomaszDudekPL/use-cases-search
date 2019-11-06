import React from 'react';
import {Col, Row} from "reactstrap";

const InstructComponent = ({text}) => {
  return (
    <Row>
      <Col>
        <h5 className="blue-color font-weight-bolder">{text}</h5>
      </Col>
    </Row>
  );
};

export default InstructComponent;