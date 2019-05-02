import React from 'react';
import {Badge, ListGroupItem} from 'reactstrap';

export default class SearchResultItems extends React.Component {

  render() {
    let number = 0;
    this.props.items.forEach(arr => {
      number += arr[1].length
    });
    let numberState = number;

    return (
      this.props.items ? this.props.items.map(arr => {
        return arr[1].map(uc => {
            return (<ListGroupItem key={uc} color="success" className="list-item_mod">{(number++) - (numberState - 1)}.
                <Badge pill color="success" className="badge-mod">CONSUMER</Badge>
                <Badge pill color="warning" className="badge-mod">Chat</Badge>
                <Badge pill color="warning" className="badge-mod">{arr[0]}.js</Badge>
                <span className="list-text_mod">{uc}</span>
              </ListGroupItem>
            )
          }
        )
      }) : null

    )
  }
}

