import React from 'react';
import {Button, Input, InputGroup} from 'reactstrap';
import {saveToClipboard} from "../helpers/helperFunctions";

export default class ResultItemFooter extends React.Component {

  returnUseCaseNameBody_arr = (rawUC) => {
    // Get rid of everything before It/Step mark: It: something. OR Step 1of5: something OR Step: something
    return /It|Step/.test(rawUC) ? rawUC.match(/It:.+|Step.+/gmi) : [rawUC];
  }

  getRidOfTagName = (useCaseBody_arr) => {
    // Get rid of tag name from uc body: It:, Step 1of5 etc.
    if (/It|Step/.test(useCaseBody_arr[0])) {
      return useCaseBody_arr[0]
                  .replace(/Step [0-9]+of[0-9]+:/, '')
                  .replace(/It:/, '')
                  .replace(/Step:/, '');
    } else {
      return useCaseBody_arr[0];
    }
  }

  render() {

    const rawUC = this.props.uc;
    const arrWithData = this.props.arrWithData;
    const onItemClickedHandler = this.props.onItemClickedHandler;
    const useCaseBody_arr = this.returnUseCaseNameBody_arr(rawUC);
    const useCaseNameWithoutTag_str = this.getRidOfTagName(useCaseBody_arr).trim();

    return (
      <div className="collapse-inputGroup_mod">
        <InputGroup size="sm">
          {/*<Label className="jumbotron-label_mod">USE CASE:</Label>*/}
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`useCaseInput_${useCaseNameWithoutTag_str}`}
                  onClick={saveToClipboard()}>Copy Use Case name</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={useCaseNameWithoutTag_str}
                 readOnly
                 className="collapse-input_mod collapse-input-one_mod shadow-none"
                 id={`useCaseInput_${useCaseNameWithoutTag_str}`}/>

        </InputGroup>

        <InputGroup size="sm">
          <Button color="success"
                  size="sm"
                  outline
                  className="collapse-button_mod"
                  value={`runThisUCInput_${useCaseNameWithoutTag_str}`}
                  onClick={saveToClipboard()}>Copy run command</Button>
          <Input placeholder=""
                 type="text"
                 spellCheck="false"
                 value={onItemClickedHandler(arrWithData, rawUC)}
                 readOnly
                 className="collapse-input_mod collapse-input-two_mod shadow-none"
                 id={`runThisUCInput_${useCaseNameWithoutTag_str}`}/>

        </InputGroup>
      </div>
    )
  }

}