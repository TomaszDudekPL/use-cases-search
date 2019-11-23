import React from 'react';
import {Badge, Col, Row} from 'reactstrap';

export default class CheckboxesComponent extends React.Component {

  render() {

    return (
      <Row className="bottom-margin">
        <Col>

          <h3 className="badge-mod badge-env_mod1">
            <Badge color={this.props.consumer_chkbox ? "success" : "warning"}
                   onClick={this.props.handleChangeConsumerChk}
                   id="badge1"
            >CONSUMER
            </Badge>
            <Badge color="danger" className={"badge-counter_mod1"}>{this.props.numberOfAllUCforConsumer}</Badge>
          </h3>

          <h3 className="badge-mod badge-env_mod2">
            <Badge color={this.props.pro_chkbox ? "success" : "warning"}
                   onClick={this.props.handleChangeProChk}
                   id="badge2"
            >PRO
            </Badge>
            <Badge color="danger" className={"badge-counter_mod2"}>{this.props.numberOfAllUCforPro}</Badge>
          </h3>

        </Col>
      </Row>
    )
  }
}