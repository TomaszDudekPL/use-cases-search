import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

export default class KeyWordsConnectorComponent extends React.Component {

  clickHandler = (connector) => (e) => {
    e.preventDefault();
    return this.props.getBackConnector(connector);
  };

  render() {

    return (
      this.props.chosenHashTag && this.props.isOpen ? (

        <div className="collapse-connector-section">
          <span>Use connector&nbsp;&nbsp;&nbsp;</span>

          <ButtonGroup size="sm">
            <Button outline color="success" className="search-connector-buttons or-mod"
                    active={this.props.connector === 'OR'} onClick={this.clickHandler('OR')}>OR</Button>
            <Button outline color="success" className="search-connector-buttons"
                    active={this.props.connector === 'WITH'} onClick={this.clickHandler('WITH')}>WITH</Button>
            <Button outline color="success" className="search-connector-buttons"
                    active={this.props.connector === 'WITHOUT'} onClick={this.clickHandler('WITHOUT')}>WITHOUT</Button>
          </ButtonGroup>

          <span>&nbsp;&nbsp;&nbsp;for keywords.</span>
        </div>



      ) : null

    );
  }
};