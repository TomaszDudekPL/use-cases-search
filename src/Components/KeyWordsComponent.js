import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const KeyWordsComponent = ({keyWords = {}, returnChosenKeyWords, chosenKeyWords = [], chosenHashTag}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  const {firstClass = [], secondClass =[], thirdClass = [], fourthClass = []} = keyWords;

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>

        {
          firstClass.map(keyWord => {
            return (
              <h2 className="badge-mod" key={keyWord}>
                <Badge onClick={collectAllKeyWords}
                       className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                >{keyWord}
                </Badge>
              </h2>
            )
          })
        }

        {
          secondClass.map(keyWord => {
            return (
              <h3 className="badge-mod" key={keyWord}>
                <Badge onClick={collectAllKeyWords}
                       className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                >{keyWord}
                </Badge>
              </h3>
            )
          })
        }


        {
          thirdClass.map(keyWord => {
            return (
              <h4 className="badge-mod" key={keyWord}>
                <Badge onClick={collectAllKeyWords}
                       className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                >{keyWord}
                </Badge>
              </h4>
            )
          })
        }

        {

          fourthClass.map(keyWord => {
            return (
              <h5 className="badge-mod" key={keyWord}>
                <Badge onClick={collectAllKeyWords}
                       className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                >{keyWord}
                </Badge>
              </h5>
            )
          })
        }

      </Col>
    </Row>
  );
};

export default KeyWordsComponent;