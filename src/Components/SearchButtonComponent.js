import React from 'react';
import {Button} from 'reactstrap';

export default class SearchButtonComponent extends React.Component {

  render() {
    return (
      !this.props.visibility ? (
        <Button color={this.props.color} className="form-button_mod"
                onClick={this.props.executeFunc}>{this.props.name}
        </Button>
      ) : null
    )
  }
}