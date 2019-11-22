import React from 'react';
import {Breadcrumb, Button, Card, CardBody, Col, Collapse, Input, InputGroup, Row} from 'reactstrap';
import Highlighter from "react-highlight-words";
import BreadcrumbItems from "./BreadcrumbItems";
import {returnRunCommand, saveToClipboard} from "../helpers/helperFunctions";

export default class SearchResultItems extends React.Component {

  state = {
    shouldBeOpen: '',
    isOpen: false,
    arrOfAllSteps: []
  };

  onItemClickedHandler = (arrWithData, uc) => {
    return {
      arr: arrWithData,
      uc
    }
  };

  onBreadcrumbClickHandler = (uc, arrWithAllSteps, describeTag_arr) => async () => {

    // close item if is open
    if (this.state.isOpen) {
      let elem = await document.querySelector('.list-item_mod .show');
      if (elem) await elem.classList.remove("show");
    }

    // prepare steps to show in collapse dialog
    let arrWithCleanSteps = [];
    if (0 in arrWithAllSteps) {
      arrWithAllSteps.forEach(step => {

        const reg = new RegExp(describeTag_arr);
        if (reg.test(step)) {
          step = step.concat('_XOXO');
        }
        arrWithCleanSteps.push(step.match(/Step.+/gmi, '')[0]);
      });

      // sorting arr for steps. Steps with numeration higher then 9 can not be first in arr but last.
      const reg2 = new RegExp(/ [0-9]of/);
      const newArr1 = [];
      const newArr2 = [];

      arrWithCleanSteps.forEach((step) => {
        if (reg2.test(step)) {
          newArr1.push(step);
        } else {
          newArr2.push(step);
        }
      });

      newArr1.sort();
      newArr2.sort();
      arrWithCleanSteps = [...newArr1, ...newArr2];
    }

    // set: if you clicked different item set uc name in state, if the same then clean state (rerender run onBreadcrumbClickHandler once again and .show class will be removed)
    // set: change isOpen state after each click (rerender) on opposite
    // set: load all steps of clicked item
    await this.setState(() => {
      return {
        shouldBeOpen: uc !== this.state.shouldBeOpen ? uc : '',
        isOpen: !this.state.isOpen,
        arrOfAllSteps: arrWithCleanSteps
      }
    });
  };

  shouldBeOpen = (key) => {
    if (key === this.state.shouldBeOpen) {
      return 'show'
    }
  };

  showTagIfOpen = (key, describeTag_arr, describeTag_View) => {
    if (key === this.state.shouldBeOpen) {
      return describeTag_arr;
    } else {
      return describeTag_View;
    }
  };

  render() {
    let numberOfAllUC = 0;

    this.props.items.forEach(arr => {
      numberOfAllUC += arr[1].length;
    });

    let numberState = numberOfAllUC;
    let wantedWords = this.props.wantedWords;
    let chosenKeyWords = this.props.chosenKeyWords;
    let showWholeBase = this.props.showWholeBase;

    return (
      this.props.items ? this.props.items.map(arr => {
        let arrWithData = arr[0].split(/%5C|%2F/);
        return arr[1].map(uc => {

            // if use case have '!validation;' key words do not show this use case.
            if (!(/!validation;/.test(uc))) {

              uc = uc.charAt(0).toUpperCase() + uc.substring(1) + '.';
              uc = uc.replace(/;/gmi, '.').replace(/\|/gmi, '/');

              // cut into chunks: hash tags, constant keywords, full use case name (with describe Tag name) and use cases without describe tag name.
              let allHashTags = uc.match(/HSH_[a-zA-Z]+.[a-zA-Z]+/gm); // #hashtag1 #hashtag2

              if (allHashTags) {
                allHashTags = allHashTags.map(hashTag => {
                  return hashTag.replace(/HSH_/, '#').replace(/\./, '');
                });
              }

              let allKeyWords = uc.match(/![a-zA-Z0-9]+-[a-z0-9]+\.|![a-zA-Z0-9]+\./gmi); // !keyWord1, !keyWord2.

              if (allKeyWords) {
                allKeyWords = allKeyWords.map(keyWord => {
                  return keyWord.replace(/!/, '').replace(/\./, ',');
                });
              }

              const fullUseCaseName_arr = /It|Step/.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something OR Step: something
              const str = /It|Step/.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '').replace(/Step:/, '') : fullUseCaseName_arr[0];
              const describeTag_arr = /It: |Step /.test(uc) ? uc.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
              const describeTag_View = ['UseCase:'];

              const useCaseNameWithoutTag_arr = [];
              useCaseNameWithoutTag_arr.push(str.trim());
              const arrWithAllSteps = /Step /.test(uc) ? arr[1] : [];
              const randomNum = () => Math.floor(Math.random() * 1000);

              return (
                <Row key={uc + randomNum()}>
                  <Col sm="12" md={{size: 12, offset: 0}}>

                    <Breadcrumb className="list-item_mod"
                      // onClick={itemClicked.bind(null, this.onItemClickedHandler(arrWithData, uc))}
                                onClick={this.onBreadcrumbClickHandler(uc, arrWithAllSteps, describeTag_arr[0])}
                    >

                      <div className="breadcrumb-item-mod">
                        <span className="item-number_mod">{(numberOfAllUC++) - (numberState - 1)}.</span>
                      </div>

                      <div className="use_case-text_mod">
                        <Highlighter
                          className={useCaseNameWithoutTag_arr[0].length > 140 ? "list-text_mod2" : "list-text_mod1"}
                          highlightClassName="highlight-describeTag"
                          searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
                          autoEscape={true}
                          textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
                        />
                        <Highlighter
                          className={useCaseNameWithoutTag_arr[0].length > 140 ? "list-text_mod2" : "list-text_mod1"}
                          highlightClassName="highlight-text"
                          searchWords={showWholeBase ? [] : wantedWords}
                          autoEscape={true}
                          textToHighlight={useCaseNameWithoutTag_arr[0]}
                        />
                      </div>

                      <div className="item-footer-mod">
                        <div className="hashtags-title-mod">HASHTAGS:
                          {allHashTags ? allHashTags.map(singleTag => {
                            return <span key={singleTag + randomNum()} className="hashtag-item-mod"> {singleTag} </span>
                          }) : null}
                        </div>

                        <div className="keywords-title-mod">KEY WORDS:
                          {allKeyWords ? allKeyWords.map(singleKeyWord => {
                            return <Highlighter
                              key={singleKeyWord + randomNum()}
                              className="keyword-item-mod"
                              highlightClassName="highlight-text"
                              searchWords={chosenKeyWords ? chosenKeyWords : []}
                              autoEscape={true}
                              textToHighlight={singleKeyWord}
                            />
                          }) : null}
                        </div>
                      </div>

                      <div className="collapse-card-mod">
                        <Collapse className={this.shouldBeOpen(uc)}>
                          <Card>
                            <CardBody>
                              <BreadcrumbItems arrWithData={arrWithData}/>
                              <div className="collapse-steps">
                                <span
                                  className={`collapse-descriptors ${!this.state.arrOfAllSteps.length ? 'descriptor_mod' : ''}`}>
                                  {this.state.arrOfAllSteps.length ? 'STEPS OF SCENARIO:' : ''}</span>
                                {
                                  this.state.arrOfAllSteps ? this.state.arrOfAllSteps.map(step => {
                                    const reg = new RegExp(/_XOXO/);
                                    return <div
                                      key={step}
                                      className={reg.test(step) ? "collapse-step_mod1" : "collapse-step_mod2"}
                                    >{step.replace(/_XOXO/, '')}
                                    </div>
                                  }) : null
                                }
                              </div>

                              <div className="collapse-inputGroup_mod">
                                <InputGroup size="sm">
                                  {/*<Label className="jumbotron-label_mod">USE CASE:</Label>*/}
                                  <Button color="success"
                                          size="sm"
                                          outline
                                          className="collapse-button_mod"
                                          value={`useCaseInput_${useCaseNameWithoutTag_arr[0]}`}
                                          onClick={saveToClipboard()}>Copy Use Case name</Button>
                                  <Input placeholder=""
                                         type="text"
                                         spellCheck="false"
                                         value={useCaseNameWithoutTag_arr[0]}
                                         readOnly
                                         className="collapse-input_mod collapse-input-one_mod shadow-none"
                                         id={`useCaseInput_${useCaseNameWithoutTag_arr[0]}`}/>

                                </InputGroup>

                                <InputGroup size="sm">
                                  {/*<Label className="jumbotron-label_mod">COMMAND TO RUN THIS UC:</Label>*/}
                                  <Button color="success"
                                          size="sm"
                                          outline
                                          className="collapse-button_mod"
                                          value={`runThisUCInput_${useCaseNameWithoutTag_arr[0]}`}
                                          onClick={saveToClipboard()}>Copy run command</Button>
                                  <Input placeholder=""
                                         type="text"
                                         spellCheck="false"
                                         value={returnRunCommand(this.onItemClickedHandler(arrWithData, uc))}
                                         readOnly
                                         className="collapse-input_mod collapse-input-two_mod shadow-none"
                                         id={`runThisUCInput_${useCaseNameWithoutTag_arr[0]}`}/>

                                </InputGroup>
                              </div>

                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>

                    </Breadcrumb>

                  </Col>
                </Row>
              )
            }
            return '';
          }
        )
      }) : null

    )
  }
}

