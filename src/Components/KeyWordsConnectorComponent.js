import React from 'react';
import {Button, ButtonGroup, Col, Row} from "reactstrap";

export default class KeyWordsConnectorComponent extends React.Component {

  clickHandler = (connector) => (e)=> {
    e.preventDefault();
    return this.props.getBackConnector(connector);
  };

  render() {

    return (
      this.props.chosenHashTag ? (
        <Row className="bottom-margin">
          <Col sm="12" md={{size: 8, offset: 2}}>
            <div className="blue-color font-weight-bolder search-connector_text">KEY WORD CONNECTOR
            </div>
            <ButtonGroup >
              <Button outline color="primary" className="search-connector-buttons or-mod"
                      active={this.props.connector === 'OR'} onClick={this.clickHandler('OR')}>OR</Button>
              <Button outline color="primary" className="search-connector-buttons"
                      active={this.props.connector === 'WITH'} onClick={this.clickHandler('WITH')}>WITH</Button>
              <Button outline color="primary" className="search-connector-buttons"
                      active={this.props.connector === 'WITHOUT'} onClick={this.clickHandler('WITHOUT')}>WITHOUT</Button>
            </ButtonGroup>
            <div className="blue-color font-weight-bolder margin-top"> </div>

          </Col>
        </Row>
      ) : null

    );
  }
};