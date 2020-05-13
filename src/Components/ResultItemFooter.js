import React from 'react';
import {Button, Input, InputGroup} from 'reactstrap';
import {saveToClipboard, returnUseCaseNameBody_arr, getRidOfTagName} from '../helpers/helperFunctions';

export default class ResultItemFooter extends React.Component {

  rawUC = this.props.uc;
  useCaseID = this.props.useCaseID;
  arrWithData = this.props.arrWithData;
  onItemClickedHandler = this.props.onItemClickedHandler;
  useCaseBody_arr = returnUseCaseNameBody_arr(this.rawUC);
  useCaseNameWithoutTag_str = getRidOfTagName(this.useCaseBody_arr);

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
                  value={`useCaseInput_${this.useCaseNameWithoutTag_str}`}
                  onClick={saveToClipboard()}>Copy Use Case name</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={this.useCaseNameWithoutTag_str}
                 readOnly
                 className="collapse-input_mod collapse-input-one_mod shadow-none"
                 id={`useCaseInput_${this.useCaseNameWithoutTag_str}`}/>

        </InputGroup>

        <InputGroup size="sm">
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`runThisUCInput_${this.useCaseNameWithoutTag_str}`}
                  onClick={saveToClipboard()}>Copy run command</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={this.onItemClickedHandler(this.arrWithData, this.rawUC)}
                 readOnly
                 className="collapse-input_mod collapse-input-two_mod shadow-none"
                 id={`runThisUCInput_${this.useCaseNameWithoutTag_str}`}/>

        </InputGroup>
      </div>
    )
  }

}