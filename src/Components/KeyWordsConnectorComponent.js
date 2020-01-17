import React from 'react';
import {Button, ButtonGroup, Col, Row} from "reactstrap";

export default class KeyWordsConnectorComponent extends React.Component {

  state = {
    selected: 'WITH'
  };

  clickHandler = (e) => {
    e.preventDefault();
    const innerText = e.target.innerText;
    this.setState(
      {
        selected: innerText
      }
    );
    return this.props.getBackConnector(innerText);
  };

  render() {

    return (

      this.props.chosenHashTag ? (

        <Row className="bottom-margin">
          <Col sm="12" md={{size: 8, offset: 2}}>
            <div className="blue-color font-weight-bolder search-connector_text">KEY WORD CONNECTOR
            </div>
            <ButtonGroup onClick={this.clickHandler}>
              <Button outline color="primary" className="search-connector-buttons or-mod"
                      active={this.state.selected === 'OR'}>OR</Button>
              <Button outline color="primary" className="search-connector-buttons"
                      active={this.state.selected === 'WITH'}>WITH</Button>
              <Button outline color="primary" className="search-connector-buttons"
                      active={this.state.selected === 'WITHOUT'}>WITHOUT</Button>
            </ButtonGroup>
            <div className="blue-color font-weight-bolder margin-top"> </div>

          </Col>
        </Row>
      ) : null

    );
  }
};