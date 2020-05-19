import React from 'react';

export default class ResultNumberTextComponent extends React.Component {

  render() {
    const numberOfFoundUseCases = this.props.searchResult_arr.length;
    const readyToProceed = this.props.readyToProceed;

    return (
      numberOfFoundUseCases ? <div className="result-numbersOfItems_mod">Found: {numberOfFoundUseCases}</div> : !readyToProceed? <div className="red-color font-weight-bolder">NO RESULT</div>: ''
    )
  }
}


