import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default class CheckboxesComponent extends React.Component {

  render () {

    return (
      <FormGroup check>
        <div className="double-consumer">
          <Label check className="input-label_mod">
            <Input type="checkbox" id="consumer-chkbox" className="input-checkbox_mod"
                   defaultChecked={this.props.consumer_chkbox}
                   onChange={this.props.handleChangeConsumerChk}/>{' '}
            CONSUMER <span className="checkbox-counter blue-color font-weight-bolder">{this.props.numberOfAllUCforConsumer}</span>
          </Label>
        </div>
        <div className="double-pro">
          <Label check className="input-label_mod">
            <Input type="checkbox" id="pro-chkbox" className="input-checkbox_mod"
                   defaultChecked={this.props.pro_chkbox} onChange={this.props.handleChangeProChk}/>{' '}
            PRO  <span className="checkbox-counter blue-color font-weight-bolder">{this.props.numberOfAllUCforPro}</span>
          </Label>
        </div>
      </FormGroup>
    )
  }


}