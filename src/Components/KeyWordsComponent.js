import React from 'react';
import {Badge, Col, Row} from "reactstrap";
import InstructComponent from "./InstructComponent";
import {higherClassKeyWords} from "../helpers/higherClassKeyWords";

export const KeyWordsComponent = ({keyWords, returnChosenKeyWords, chosenKeyWords = [], chosenHashTag}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  const {firstClass, secondClass} = chosenHashTag ? higherClassKeyWords[chosenHashTag] : {
    firstClass: [],
    secondClass: []
  };

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>
        {
          keyWords ? keyWords.length ? <InstructComponent text="OPTIONAL KEY WORDS"/> : null : null
        }
        {
          keyWords ? keyWords.map(keyWord => {

            return (
              (secondClass.includes(keyWord)) ? (
                <h4 className="badge-mod" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </h4>
              ) : (firstClass.includes(keyWord)) ? (
                <h2 className="badge-mod" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </h2>
              ) : (
                <h5 className="badge-mod" key={keyWord}>
                  <Badge onClick={collectAllKeyWords}
                         className={chosenKeyWords.includes(keyWord) ? "keywords-badge_mod2" : "keywords-badge_mod1"}
                  >{keyWord}
                  </Badge>
                </h5>
              )
            )
          }) : null
        }
      </Col>
    </Row>
  );
};

export default KeyWordsComponent;