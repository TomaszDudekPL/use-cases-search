import React from 'react';
import {ButtonGroup, Button, Jumbotron} from 'reactstrap';

export default class JumbotronComponent extends React.Component {

  render () {

    return (
      <Jumbotron fluid className="jumbotron_mod">

        <h1 className={(this.props.ucInfoObj && this.props.detailsSwitchView) || (this.props.name && this.props.detailsSwitchView) ? "display-7 form-mainLabel_mod1" : "display-7 form-mainLabel_mod2"}>USE CASES SEARCH</h1>
        {[0] in this.props.items? <ButtonGroup className="print_view-button_mod">

                                      <Button color="primary"
                                              size="sm"
                                              onClick={this.props.createPrintView(this.props.items)}>Print View of this list
                                      </Button>

                                      <Button color="warning"
                                              size="sm"
                                              onClick={this.props.createPrintView(this.props.items, 'WITH DESCRIPTIONS')}>WITH DESCRIPTIONS
                                      </Button>
                                  </ButtonGroup>: null}

      </Jumbotron>
    )
  }
}