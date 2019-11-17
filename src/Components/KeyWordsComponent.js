import React from 'react';
import {Badge, Col, Row} from "reactstrap";

export const KeyWordsComponent = ({keyWords, returnChosenKeyWords}) => {

  const collectAllKeyWords = (e) => {
    let keyWord = e.target.innerText;
    return returnChosenKeyWords(keyWord);
  };

  return (
    <Row className="bottom-margin">
      <Col sm="12" md={{size: 8, offset: 2}}>
        {
          keyWords ? keyWords.map(keyWord => {
            return (
              <h5 className="badge-mod" key={keyWord}>
                <Badge onClick={collectAllKeyWords}
                       className="keywords-badge_mod"
                       value={keyWord}
                >{keyWord}
                </Badge>
              </h5>
            )
          }) : null
        }
      </Col>
    </Row>
  );
};

export default KeyWordsComponent;