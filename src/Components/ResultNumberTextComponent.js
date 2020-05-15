import React from 'react';

export default class ResultNumberTextComponent extends React.Component {

  render() {
    const numberOfFoundUseCases = this.props.searchResult_arr.length;

    return (
      numberOfFoundUseCases ? <div className="result-numbersOfItems_mod">Found: {numberOfFoundUseCases}</div> : ''
    )
  }
}


