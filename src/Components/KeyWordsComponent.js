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

        <table width="100%" border="1">
          <tr>
            <td>Where1:</td>

            {
              <td className="keywords-where1_mod">
                {keyWord1 ? keyWord1.map(keyWord => {
                    return (
                      <div className="badge-mod" key={keyWord}>
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
            }
          </tr>

          <tr>
            <td>Where2:</td>
            {
              <td className="keywords-where2_mod">
                {keyWord2 ? keyWord2.map(keyWord => {
                    return (
                      <div className="badge-mod" key={keyWord}>
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
            }
          </tr>
          <tr>
            <td>What:</td>
            {
              <td className="keywords-what_mod">
                {keyWord3 ? keyWord3.map(keyWord => {
                    return (
                      <div className="badge-mod" key={keyWord}>
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
            }
          </tr>
        </table>

      </Col>
    </Row>
  );
};

export default KeyWordsComponent;