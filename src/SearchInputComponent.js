import React from 'react';
import {Col, Input, Row} from "reactstrap";
import {preventActionHandler} from "./helpers/helperFunctions";

const SearchInputComponent = ({multipleFuncOnChangeHandler, name}) => {
  return (
    <Row>
      <Col sm="12" md={{size: 12}} className="form-input_mod">
        <Input type="search" spellCheck="false" value={name} name="search" id="useCasesSearch"
               bsSize="lg"
               placeholder="Narrow down the results..."
               onChange={multipleFuncOnChangeHandler}
               onKeyPress={preventActionHandler}
        />
      </Col>
    </Row>
  );
};

export default SearchInputComponent;