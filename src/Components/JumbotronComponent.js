import React from 'react';
import {ButtonGroup, Button, Jumbotron} from 'reactstrap';

export default class JumbotronComponent extends React.Component {

  render () {

    return (
      <Jumbotron fluid className="jumbotron_mod">

        <h1 className="form-mainLabel_mod2">USE CASES SEARCH</h1>
        {[0] in this.props.searchResult_arr? <ButtonGroup className="print_view-button_mod">

                                      <Button color="primary"
                                              size="sm"
                                              onClick={this.props.createPrintView(this.props.searchResult_arr)}>Print View of this list
                                      </Button>

                                      <Button color="warning"
                                              size="sm"
                                              onClick={this.props.createPrintView(this.props.searchResult_arr, 'WITH DESCRIPTIONS')}>WITH DESCRIPTIONS
                                      </Button>
                                  </ButtonGroup>: null}

      </Jumbotron>
    )
  }
}