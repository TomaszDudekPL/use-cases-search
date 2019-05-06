import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import Highlighter from "react-highlight-words";

export default class SearchResultItems extends React.Component {

  render() {
    let number = 0;
    this.props.items.forEach(arr => {
      number += arr[1].length
    });
    let numberState = number;
    let wantedWords = this.props.wantedWords;

    return (
      this.props.items ? this.props.items.map(arr => {
        let arrWithData = arr[0].split('%5C');
        return arr[1].map(uc => {
          uc = uc.charAt(0).toUpperCase() + uc.substring(1);
          let ucInfoObj = {arr: arrWithData, uc};
            return (
              <Breadcrumb key={uc + Math.floor(Math.random()*1000)} className="list-item_mod" onClick={this.props.itemClicked.bind(null, ucInfoObj)}>
                <span className="item-number_mod">{(number++) - (numberState - 1)}.</span>
                <BreadcrumbItem>{arrWithData[0]}</BreadcrumbItem>
                <BreadcrumbItem>{arrWithData[1]}</BreadcrumbItem>
                <BreadcrumbItem active>{arrWithData[2] + '.js'}</BreadcrumbItem>
                <Highlighter
                  className="list-text_mod "
                  highlightClassName="highlight-text"
                  searchWords={this.props.showWholeBase? []: wantedWords}
                  autoEscape={true}
                  textToHighlight={uc}
                />
              </Breadcrumb>
            )
          }
        )
      }) : null

    )
  }
}

