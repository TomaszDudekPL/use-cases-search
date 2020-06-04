import React, {useState} from 'react';
import {Badge, Card, CardBody, Col, Collapse, Row, Toast, ToastHeader} from "reactstrap";
import KeyWordsConnectorComponent from "./KeyWordsConnectorComponent";

export const KeyWordsComponent = ({keyWords = {}, returnChosenKeyWords, chosenKeyWords = [], chosenHashTag, connector, getBackConnector}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  const keyWord1 = keyWords.keyWords1;
  const keyWord2 = keyWords.keyWords2;
  const keyWord3 = keyWords.keyWords3;

  const [isOpen, setIsOpen] = useState(false);
  const toggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (

    chosenHashTag ? (
      <Row className="bottom-margin">
        <Col sm="12" md={{size: 8, offset: 2}}>

          <Toast className="toast_mod">

            <ToastHeader className="toast-header_mod" onClick={toggle}>KEY WORDS - click to open it.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⇩</ToastHeader>

            <KeyWordsConnectorComponent
              isOpen={isOpen}
              connector={connector}
              chosenHashTag={chosenHashTag}
              getBackConnector={getBackConnector}
            />

            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>

                  <div className="keyword-location-container">
                    <div className="location-label keywords-label">MAIN LOCATION</div>
                    <div className="location-body keywords-body">
                      {keyWord1 ? keyWord1.sort().map(keyWord => {
                          return (
                            <div className="badge-mod keyword-badge" key={keyWord}>
                              <Badge onClick={collectAllKeyWords}
                                     className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                              >{keyWord}
                              </Badge>
                            </div>
                          )
                        }
                      ) : null
                      }
                    </div>

                    <div className="location-label keywords-label">EXACT LOCATION</div>
                    <div className="location-body keywords-body">
                      {keyWord2 ? keyWord2.sort().map(keyWord => {
                          return (
                            <div className="badge-mod keyword-badge" key={keyWord}>
                              <Badge onClick={collectAllKeyWords}
                                     className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                              >{keyWord}
                              </Badge>
                            </div>
                          )
                        }
                      ) : null
                      }
                    </div>
                  </div>

                  <div className="keyword-subject-container">
                    <div className="subject-label keywords-label">SUBJECT</div>

                    <div className="subject-body keywords-body">
                      {keyWord3 ? keyWord3.sort().map(keyWord => {
                          return (
                            <div className="badge-mod keyword-badge" key={keyWord}>
                              <Badge onClick={collectAllKeyWords}
                                     className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                              >{keyWord}
                              </Badge>
                            </div>
                          )
                        }
                      ) : null
                      }
                    </div>
                  </div>


                </CardBody>
              </Card>
            </Collapse>

          </Toast>

        </Col>
      </Row>
    ) : null
  );
};

export default KeyWordsComponent;