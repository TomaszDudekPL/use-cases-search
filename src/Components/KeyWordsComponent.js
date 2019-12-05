import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const KeyWordsComponent = ({keyWords = {}, returnChosenKeyWords, chosenKeyWords = [], chosenHashTag}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  const arr = Object.entries(keyWords);

  arr.sort();

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>

        {
          arr.map(arrWithKeyWord => {

            if (0 <= arrWithKeyWord[1] && arrWithKeyWord[1] < 5) {
              return (
                <div className="badge-mod h5x" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </div>
              )
            }
            if (5 <= arrWithKeyWord[1] && arrWithKeyWord[1] < 10) {
              return (
                <div className="badge-mod h4x" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </div>
              )
            }
            if (10 <= arrWithKeyWord[1] && arrWithKeyWord[1] < 15) {
              return (
                <div className="badge-mod h3x" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </div>
              )
            }
            if (15 <= arrWithKeyWord[1]) {
              return (
                <div className="badge-mod h2x" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </div>
              )
            }
            return {};
          })
        }

      </Col>
    </Row>
  );
};

export default KeyWordsComponent;