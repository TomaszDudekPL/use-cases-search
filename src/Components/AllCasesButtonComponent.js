import React from 'react';
import {Button} from 'reactstrap';

export default class AllCasesButtonComponent extends React.Component {

  render() {

    return (

      !this.props.showWholeBase ?
        (
          <Button color="warning" className="form-button_mod all-cases-button_mod" onClick={this.props.showAllUseCases}>
            Show All Use Cases
          </Button>
        ) :

        (
          <Button color="danger" className="form-button_mod all-cases-button_mod" onClick={this.props.hideAllUseCases}>
            ✕ Hide All Use Cases
          </Button>
        )
    )
  }


}