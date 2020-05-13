import React from 'react';
import {Button, Input, InputGroup} from 'reactstrap';
import {saveToClipboard, returnUseCaseNameBody_arr, getRidOfTagName} from '../helpers/helperFunctions';

export default class ResultItemFooter extends React.Component {

  render() {

    const rawUC = this.props.uc;
    const arrWithData = this.props.arrWithData;
    const onItemClickedHandler = this.props.onItemClickedHandler;
    const useCaseBody_arr = returnUseCaseNameBody_arr(rawUC);
    const useCaseNameWithoutTag_str = getRidOfTagName(useCaseBody_arr);

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