import React from 'react';
import {Badge, ListGroupItem} from 'reactstrap';

export default class SearchResultItems extends React.Component {

  render() {
    return (
          this.props.items? this.props.items.map(arr => {
            return arr[1].map(uc => {
                return (<ListGroupItem key={uc} color="success" className="list-item_mod">
                    <Badge pill color="warning" className="badge-mod">Catalog: Groups</Badge>
                    <Badge pill color="primary" className="badge-mod">File: {arr[0]}.js</Badge>
                    <span className="list-text_mod">{uc}</span>
                  </ListGroupItem>
                )
              }
            )
          }) : null
    )
  }
}

