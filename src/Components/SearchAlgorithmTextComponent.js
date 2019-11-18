import React from 'react';

export default class SearchAlgorithmTextComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state
    }
  }

  render() {

    // const envAlgorithmText = document.getElementById('env-algorithm-text');
    // const hash_tagsAlgorithmText = document.getElementById('hash_tags-algorithm-text');
    //
    // if(this.state.consumer_chkbox) envAlgorithmText.innerText = 'You have chosen all tests for "Consumer"';
    // hash_tagsAlgorithmText.innerText = 'Choose now any HASHTAG or type any search term to narrow down results.';

    return (
      <div>
        <div id="env-algorithm-text"> </div>
        <div id="hash_tags-algorithm-text"> </div>
        <div id="key_words-algorithm-text"> </div>
        <div id="wanted_words-algorithm-text"> </div>
      </div>
    )
  }
}


