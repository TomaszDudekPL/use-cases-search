import React from 'react';
import {Breadcrumb, Card, CardBody, Col, Collapse, Row} from 'reactstrap';
import Highlighter from "react-highlight-words";
import BreadcrumbItems from "./BreadcrumbItems";

export default class SearchResultItems extends React.Component {

  state = {
    shouldBeOpen: ''
  };

  onItemClickedHandler = (arrWithData, uc) => {
    return {
      arr: arrWithData,
      uc
    }
  };

  getDataId = (key) => () => {
    this.setState(() => {
      return {
        shouldBeOpen: key
      }
    })
  };

  shouldBeOpen = (key) => {
    if (key === this.state.shouldBeOpen) return true;
  };

  itemClicked;

  render() {
    let numberOfAllUC = 0;

    this.props.items.forEach(arr => {
      numberOfAllUC += arr[1].length;
    });

    let numberState = numberOfAllUC;
    let wantedWords = this.props.wantedWords;
    let itemClicked = this.props.itemClicked;
    let showWholeBase = this.props.showWholeBase;

    return (
      this.props.items ? this.props.items.map(arr => {
        let arrWithData = arr[0].split(/%5C|%2F/);
        return arr[1].map(uc => {
            uc = uc.charAt(0).toUpperCase() + uc.substring(1) + '.';
            uc = uc.replace(/;/gmi, '.').replace(/\|/gmi, '/');

            // cut into chunks: hash tags, constant keywords, full use case name (with describe Tag name) and use cases without describe tag name.
            let allHashTags = uc.match(/HSH_\w+\./gm); // #hashtag1 #hashtag2

            allHashTags = allHashTags.map(hashTag => {
              return hashTag.replace(/HSH_/, '#').replace(/\./, '');
            });

            let allKeyWords = uc.match(/![a-zA-Z0-9]+-[a-z0-9]+\.|![a-zA-Z0-9]+\./gmi); // !keyWord1, !keyWord2.

            allKeyWords = allKeyWords.map(keyWord => {
              return keyWord.replace(/\!/, '').replace(/\./, ',');
            });

            const fullUseCaseName_arr = /It: | Step /.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something OR Step: something
            const str = /It: |Step /.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '').replace(/Step:/, '') : fullUseCaseName_arr[0];
            // const describeTag_arr = /It: | Step /.test(uc) ? uc.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
            const describeTag_arr = ['UC:'];

            const useCaseNameWithoutTag_arr = [];
            useCaseNameWithoutTag_arr.push(str);

            return (
              <Row key={uc + Math.floor(Math.random() * 1000)}>
                <Col sm="12" md={{size: 12, offset: 0}}>

                  <Breadcrumb className="list-item_mod"
                              isOpen={false}
                              // onClick={itemClicked.bind(null, this.onItemClickedHandler(arrWithData, uc))}
                              onClick={this.getDataId(uc)}
                  >

                    <div className="breadcrumb-item-mod">
                      <span className="item-number_mod">{(numberOfAllUC++) - (numberState - 1)}.</span>
                    </div>

                    <div className="use_case-text_mod">
                      <Highlighter
                        className="list-text_mod"
                        highlightClassName="highlight-describeTag"
                        searchWords={describeTag_arr}
                        autoEscape={true}
                        textToHighlight={describeTag_arr[0]}
                      />
                      <Highlighter
                        className="list-text_mod"
                        highlightClassName="highlight-text"
                        searchWords={showWholeBase ? [] : wantedWords}
                        autoEscape={true}
                        textToHighlight={useCaseNameWithoutTag_arr[0]}
                      />
                    </div>

                    <div className="item-footer-mod">
                      <div className="hashtags-title-mod">HASHTAGS:
                        {allHashTags ? allHashTags.map(singleTag => {
                          return <span className="hashtag-item-mod"> {singleTag} </span>
                        }) : null}
                      </div>

                      <div className="keywords-title-mod">KEY WORDS:
                        {allKeyWords ? allKeyWords.map(singleKeyWord => {
                          return <span className="keyword-item-mod"> {singleKeyWord} </span>
                        }) : null}
                      </div>
                    </div>

                    <div className="collapse-card-mod">
                      <Collapse isOpen={this.shouldBeOpen(uc)}>
                        <Card>
                          <CardBody>
                            <span className="path-text-mod">PATH TO FILE:</span>
                            <BreadcrumbItems arrWithData={arrWithData}/>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>

                  </Breadcrumb>

                </Col>
              </Row>
            )
          }
        )
      }) : null

    )
  }
}

