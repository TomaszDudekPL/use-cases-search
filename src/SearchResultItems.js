import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

export default class SearchResultItems extends React.Component {

  render() {
    let number = 0;
    this.props.items.forEach(arr => {
      number += arr[1].length
    });
    let numberState = number;

    return (
      this.props.items ? this.props.items.map(arr => {
        let arrWithData = arr[0].split('%5C');
        return arr[1].map(uc => {
            return (
              <Breadcrumb key={uc} className="list-item_mod" onClick={this.toggle}>
                <span className="item-number_mod">{(number++) - (numberState - 1)}.</span>
                <BreadcrumbItem>{arrWithData[0]}</BreadcrumbItem>
                <BreadcrumbItem>{arrWithData[1]}</BreadcrumbItem>
                <BreadcrumbItem active>{arrWithData[2] + '.js'}</BreadcrumbItem>
                <span className="list-text_mod">{uc}</span>
              </Breadcrumb>
            )
          }
        )
      }) : null

    )
  }
}

