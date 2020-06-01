import React from 'react';
import {Badge, Col, Row} from "reactstrap";

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

        {
          keyWord1 ? keyWord1.map(keyWord => {
              return (
                <div className="badge-mod h5x" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </div>
              )
            }
          ) : null
        }

        {
          keyWord2 ? keyWord2.map(keyWord => {
              return (
                <div className="badge-mod h5x" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </div>
              )
            }
          ) : null
        }

        {
          keyWord3 ? keyWord3.map(keyWord => {
              return (
                <div className="badge-mod h5x" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </div>
              )
            }
          ) : null
        }

      </Col>
    </Row>
  );
};

export default KeyWordsComponent;