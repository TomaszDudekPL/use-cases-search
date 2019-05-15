import React from 'react';
import {BreadcrumbItem} from 'reactstrap';

export default class BreadcrumbItems extends React.Component {

  arrWithData;

  render() {
    let arrWithData = this.props.arrWithData;
    return (
      arrWithData ? arrWithData.map((data, index) => {
          return (
            (index === arrWithData.length - 1) ?

              <BreadcrumbItem active key={data} className="breadcrumb-link_mod">
                <a target="_blank" rel="noopener noreferrer"  href={"https://github.com/sgrouples/Frontend-E2E-Tests/blob/master/test/specs/" + arrWithData.join('/') + '.js'}>{data + '.js'}</a>
              </BreadcrumbItem>: <BreadcrumbItem key={data} className="breadcrumb_mod">{data}</BreadcrumbItem>
          )
        }
      ) : null)
  }
}


