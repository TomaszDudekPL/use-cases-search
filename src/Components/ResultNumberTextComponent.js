import React from 'react';

export default class ResultNumberTextComponent extends React.Component {

  returnNumberOfItems = (itemsArr) => {
    let counter = 0;
    itemsArr.forEach(nestedArr => {
      nestedArr[1].forEach(uc => {
          if(!(/!validation;/.test(uc))) counter += 1;
        })
    });
    return counter;
  };


  render() {

    const { name, hashtag, searchButtonClicked, items} = this.props.state;
    const numberOfItems = this.returnNumberOfItems(items);

    return (

        numberOfItems ? <div className="result-numbersOfItems_mod">Found: {numberOfItems}</div>:
          (hashtag && searchButtonClicked) || (name && searchButtonClicked)? <div className="noResult-numberOfItems_mod">NO RESULTS</div>:
            null
    )
  }
}


