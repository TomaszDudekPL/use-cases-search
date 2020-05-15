import React from 'react';
import {Button, Input, InputGroup} from 'reactstrap';
import {saveToClipboard} from '../helpers/helperFunctions';

export default class ResultItemFooter extends React.Component {

  uc = this.props.uc;
  useCaseID = this.props.useCaseID;
  runCommand = this.props.runCommand;
  arrWithData = this.props.arrWithData;

  render() {

    return (
      <div className="collapse-inputGroup_mod">

        <InputGroup size="sm">
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`useCaseInput_${this.useCaseID}`}
                  onClick={saveToClipboard()}>Copy Search ID</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={this.useCaseID}
                 readOnly
                 className="collapse-input_mod collapse-input-one_mod shadow-none"
                 id={`useCaseInput_${this.useCaseID}`}/>

        </InputGroup>

        <InputGroup size="sm">
          {/*<Label className="jumbotron-label_mod">USE CASE:</Label>*/}
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`useCaseInput_${this.uc}`}
                  onClick={saveToClipboard()}>Copy Use Case name</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={this.uc}
                 readOnly
                 className="collapse-input_mod collapse-input-one_mod shadow-none"
                 id={`useCaseInput_${this.uc}`}/>

        </InputGroup>

        <InputGroup size="sm">
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`runThisUCInput_${this.uc}`}
                  onClick={saveToClipboard()}>Copy run command</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={this.runCommand}
                 readOnly
                 className="collapse-input_mod collapse-input-two_mod shadow-none"
                 id={`runThisUCInput_${this.uc}`}/>

        </InputGroup>
      </div>
    )
  }

}