import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import FormComponent from "./FormComponent";

export default class MainComponent extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{size: 12, offset: 0}}>
            <FormComponent></FormComponent>
          </Col>
        </Row>
      </Container>
    );
  }
}
