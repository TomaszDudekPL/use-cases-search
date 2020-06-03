import React from 'react';
import {Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, Row} from "reactstrap";
import {preventActionHandler} from "../helpers/helperFunctions";

const SearchInputComponent = ({multipleFuncOnChangeHandler, name}) => {
  return (
    <Row>
      <Col sm="12" md={{size: 8, offset: 2}}>

        <FormGroup>

          <InputGroup>
            <Input spellCheck="false"
                   type="text"
                   value={name}
                   name="search"
                   id="useCasesSearch"
                   bsSize="lg"
                   valid
                   placeholder="Type the word you are looking for and press ENTER"
                   onChange={multipleFuncOnChangeHandler}
                   onKeyPress={preventActionHandler}
            />
            <InputGroupAddon addonType="append"><Button outline color="danger">✕</Button></InputGroupAddon>
          </InputGroup>

        </FormGroup>

      </Col>
    </Row>
  );
};

export default SearchInputComponent;