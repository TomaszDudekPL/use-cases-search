import React from 'react';
import {BreadcrumbItem} from 'reactstrap';

export default class BreadcrumbItems extends React.Component {

  arrWithData;

  render() {
    let arrWithData = this.props.arrWithData;
    return (
      arrWithData ? arrWithData.map((data, index) => {
          return (
            (index === arrWithData.length -1 ) ? <BreadcrumbItem active key={data}>{data + '.js'}</BreadcrumbItem>: <BreadcrumbItem key={data}>{data}</BreadcrumbItem>
          )
        }
      ) : null)
  }
}


