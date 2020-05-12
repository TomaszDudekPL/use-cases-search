import React from 'react';
import {Button, Input, InputGroup} from 'reactstrap';
import {saveToClipboard} from "../helpers/helperFunctions";

export default class ResultItemFooter extends React.Component {

  render() {

    const uc = this.props.uc;
    const arrWithData = this.props.arrWithData;
    const onItemClickedHandler = this.props.onItemClickedHandler;

    const fullUseCaseName_arr = /It|Step/.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something OR Step: something
    const str = /It|Step/.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '').replace(/Step:/, '') : fullUseCaseName_arr[0];
    const useCaseNameWithoutTag_arr = [];
    useCaseNameWithoutTag_arr.push(str.trim());

    return (
      <div className="collapse-inputGroup_mod">
        <InputGroup size="sm">
          {/*<Label className="jumbotron-label_mod">USE CASE:</Label>*/}
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`useCaseInput_${useCaseNameWithoutTag_arr}`}
                  onClick={saveToClipboard()}>Copy Use Case name</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={useCaseNameWithoutTag_arr}
                 readOnly
                 className="collapse-input_mod collapse-input-one_mod shadow-none"
                 id={`useCaseInput_${useCaseNameWithoutTag_arr}`}/>

        </InputGroup>

        <InputGroup size="sm">
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`runThisUCInput_${useCaseNameWithoutTag_arr}`}
                  onClick={saveToClipboard()}>Copy run command</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={onItemClickedHandler(arrWithData, uc)}
                 readOnly
                 className="collapse-input_mod collapse-input-two_mod shadow-none"
                 id={`runThisUCInput_${useCaseNameWithoutTag_arr}`}/>

        </InputGroup>
      </div>
    )
  }

}