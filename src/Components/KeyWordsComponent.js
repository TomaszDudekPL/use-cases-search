import React from 'react';
import {Badge, Col, Row, Table} from "reactstrap";

export const KeyWordsComponent = ({keyWords = {}, returnChosenKeyWords, chosenKeyWords = [], chosenHashTag}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  const keyWord1 = keyWords.keyWords1;
  const keyWord2 = keyWords.keyWords2;
  const keyWord3 = keyWords.keyWords3;

  // arr.sort();

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>

        <Table borderless>

          <tr className="keywords-location_mod">
            <td>LOCATION</td>

            {
              <tr>
                <td className="keywords-location_main">main:</td>
                <td width="100%" className="keywords-location_main">
                  {keyWord1 ? keyWord1.map(keyWord => {
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
                </td>
              </tr>
            }

            {
              <tr>
                <td>exact:</td>
                <td width="100%">
                  {keyWord2 ? keyWord2.map(keyWord => {
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

                </td>
              </tr>
            }
          </tr>

          <tr className="keywords-subject_mod">
            <td>SUBJECT:</td>
            <td>

              {keyWord3 ? keyWord3.map(keyWord => {
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

            </td>

          </tr>
        </Table>

      </Col>
    </Row>
  );
};

export default KeyWordsComponent;