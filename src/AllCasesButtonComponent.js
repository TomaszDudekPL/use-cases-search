import React from 'react';
import {Button, Col, Row} from 'reactstrap';

export default class AllCasesButtonComponent extends React.Component {

  render() {

    return (

      !this.props.showWholeBase ?
        (<Row><Col sm="12" md={{size: 6, offset: 3}}>
          <Button block color="warning" className="form-button_mod" onClick={this.props.showAllUseCases}>Show All Use
            Cases</Button>
        </Col></Row>) :

        (<Row><Col sm="12" md={{size: 6, offset: 3}}>
          <Button block color="danger" className="form-button_mod" onClick={this.props.hideAllUseCases}>✕ Hide All Use
            Cases</Button>
        </Col></Row>)
    )
  }


}