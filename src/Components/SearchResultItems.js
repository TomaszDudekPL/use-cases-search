import React from 'react';
import {Breadcrumb, Col, Row} from 'reactstrap';
import Highlighter from "react-highlight-words";
import BreadcrumbItems from "./BreadcrumbItems";

export default class SearchResultItems extends React.Component {

  onItemClickedHandler = (arrWithData, uc) => {
    return {
      arr: arrWithData,
      uc
    }
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
            let allHashTags = uc.match(/#\w+\./gm); // #hashtag1 #hashtag2
            allHashTags = ['#Posting', '#Video'];
            const useCaseNameWithoutTag_arr = [];

            const allKeyWords = uc.match(/!\w+\./gmi); // !keyWord1, !keyWord2.
            const fullUseCaseName_arr = /It: | Step /.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something.
            const str = /It: |Step /.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '') : fullUseCaseName_arr[0];
            // const describeTag_arr = /It: | Step /.test(uc) ? uc.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
            const describeTag_arr = ['Use Case:'];
            useCaseNameWithoutTag_arr.push(str);

            return (
              <Row key={uc + Math.floor(Math.random() * 1000)}>
                <Col sm="12" md={{size: 12, offset: 0}}>

                  <Breadcrumb className="list-item_mod"
                              onClick={itemClicked.bind(null, this.onItemClickedHandler(arrWithData, uc))}
                  >
                    <span className="item-number_mod">{(numberOfAllUC++) - (numberState - 1)}.</span>

                    <BreadcrumbItems arrWithData={arrWithData}/>

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
                        {allHashTags ? allHashTags.map(singleTag => {
                          return <span className="keyword-item-mod"> {singleTag} </span>
                        }) : null}
                      </div>
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

