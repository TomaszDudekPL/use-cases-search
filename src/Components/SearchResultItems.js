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
            return (
              <Row key={uc + Math.floor(Math.random() * 1000)}>
                <Col sm="12" md={{size: 12, offset: 0}}>
                  <Breadcrumb className="list-item_mod"
                              onClick={itemClicked.bind(null, this.onItemClickedHandler(arrWithData, uc))}>
                    <span className="item-number_mod">{(numberOfAllUC++) - (numberState - 1)}.</span>
                    <BreadcrumbItems arrWithData={arrWithData}/>
                    <div className="use_case-text_mod">
                      <Highlighter
                        className="list-text_mod "
                        highlightClassName="highlight-text"
                        searchWords={showWholeBase ? [] : wantedWords}
                        autoEscape={true}
                        textToHighlight={uc}
                      />
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

