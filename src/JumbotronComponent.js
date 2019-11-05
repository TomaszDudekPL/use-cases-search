import React from 'react';
import {Button, Col, Input, InputGroup, Jumbotron, Label, Row} from 'reactstrap';
import {saveToClipboard, returnRunCommand, calculateNumberOfUCForConsumer, calculateNumberOfUCForPro} from './helpers/helperFunctions'

export default class JumbotronComponent extends React.Component {

  render () {

    return (
      <Jumbotron fluid className="jumbotron_mod">
        <h1 className={(this.props.ucInfoObj && this.props.detailsSwitchView) || (this.props.name && this.props.detailsSwitchView) ? "display-7 form-mainLabel_mod1" : "display-7 form-mainLabel_mod2"}>USE CASES SEARCH</h1>
        {[0] in this.props.items? <Button color="success" size="sm" className="print_view-button_mod" onClick={this.props.createPrintView(this.props.items)}>Print View of this list</Button>: null}

        {(this.props.name && !this.props.ucInfoObj) || (this.props.name && !this.props.detailsSwitchView) ? (

          <Row className="jumbotron-result_mod">
            <Col sm="12" md={{size: 10, offset: 1}}>
              <span className="jumbotron-label-text">FOR </span>
              <span className="jumbotron-label-number">{this.props.name.toUpperCase()}</span>
              <span className="jumbotron-label-text"> SEARCH TERM: </span>
              <span className="jumbotron-label-number">{this.props.calculateNumbersOfUC()}</span>
              <span
                className="jumbotron-label-text"> USE CASE{this.props.calculateNumbersOfUC() > 1 ? 'S' : ''} FOUND. </span>
              <br/>
              <span className="jumbotron-label-text"> CONSUMER: </span>
              <span className="jumbotron-label-number">{calculateNumberOfUCForConsumer(this.props.items)}</span>
              <span className="jumbotron-label-text"> PRO: </span>
              <span className="jumbotron-label-number">{calculateNumberOfUCForPro(this.props.items)}</span>
            </Col>
          </Row>

        ) : this.props.ucInfoObj && this.props.detailsSwitchView ? (
          <Row>
            <Col sm="12" md={{size: 10, offset: 1}}>
              <InputGroup size="sm">
                <Label className="jumbotron-label_mod">USE CASE:</Label>
                <Input placeholder="" type="text" spellCheck="false"
                       value={this.props.ucInfoObj ? this.props.ucInfoObj.uc : null}
                       className="jumbotron-input_mod jumbotron-input-one_mod shadow-none" id="useCaseInput"/>
                <Button color="success" size="sm" className="jumbotron-button_mod" outline
                        onClick={saveToClipboard("useCaseInput")}>Clipboard!</Button>
              </InputGroup>
              <InputGroup size="sm">
                <Label className="jumbotron-label_mod">COMMAND TO RUN THIS UC:</Label>
                <Input placeholder="" type="text" spellCheck="false"
                       value={returnRunCommand(this.props.ucInfoObj)}
                       className="jumbotron-input_mod jumbotron-input-two_mod shadow-none" id="runThisUCInput"/>
                <Button color="success" size="sm" className="jumbotron-button_mod" outline
                        onClick={saveToClipboard("runThisUCInput")}>Clipboard!</Button>
              </InputGroup>

              <Row>
                <Col sm="12" md={{size: 10, offset: 1}}>
                  {!this.props.showWholeBase && this.props.calculateNumbersOfUC() > 1 ? (
                    <span>
                        <span className="jumbotron-label-text">FOR </span>
                        <span className="jumbotron-label-number">{this.props.name.toUpperCase()}</span>
                        <span className="jumbotron-label-text"> SEARCH TERM: </span>
                      </span>
                  ) : ''
                  }
                  <span className="jumbotron-label-number">{this.props.calculateNumbersOfUC()}</span>
                  <span
                    className="jumbotron-label-text"> USE CASE{this.props.calculateNumbersOfUC() > 1 ? 'S' : ''} FOUND. </span>
                  <span className="jumbotron-label-text"> CONSUMER: </span>
                  <span className="jumbotron-label-number">{calculateNumberOfUCForConsumer(this.props.items)}</span>
                  <span className="jumbotron-label-text"> PRO: </span>
                  <span className="jumbotron-label-number">{calculateNumberOfUCForPro(this.props.items)}</span>
                </Col>
              </Row>
              <Button color="danger" size="sm" onClick={this.props.hideThisViewBtn}>✕ Hide this view</Button>
            </Col>
          </Row>
        ) : null
        }
      </Jumbotron>
    )
  }


}