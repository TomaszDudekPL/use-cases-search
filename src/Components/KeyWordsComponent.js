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
                <h5 className="badge-mod" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </h5>
              )
            }
            if (5 <= arrWithKeyWord[1] && arrWithKeyWord[1] < 10) {
              return (
                <h4 className="badge-mod" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </h4>
              )
            }
            if (10 <= arrWithKeyWord[1] && arrWithKeyWord[1] < 15) {
              return (
                <h3 className="badge-mod" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </h3>
              )
            }
            if (15 <= arrWithKeyWord[1]) {
              return (
                <h2 className="badge-mod" key={arrWithKeyWord[0]}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(arrWithKeyWord[0]) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{arrWithKeyWord[0]}
                  </Badge>
                </h2>
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