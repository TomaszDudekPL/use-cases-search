import React from 'react';

export default class SearchAlgorithmTextComponent extends React.Component {

  categoriesOfEnvironment = (state) => {
    let result;
    if (state.consumer_chkbox && state.pro_chkbox === false) result = <span>Find all Use Cases <span className="algorithm-only_mod">ONLY</span> for <span className="algorithm-env_mod">CONSUMER</span></span>;
    if (state.consumer_chkbox === false && state.pro_chkbox) result = <span>Find all Use Cases <span className="algorithm-only_mod">ONLY</span> for <span className="algorithm-env_mod">PRO</span></span>;
    if (state.consumer_chkbox === false && state.pro_chkbox === false) result = <span>First choose <span className="algorithm-env_mod">ENV</span>, you are interested in.</span>;
    if (state.consumer_chkbox && state.pro_chkbox) result = <span>Find all Use Cases for both environments: <span className="algorithm-env_mod">CONSUMER</span> and <span className="algorithm-env_mod">PRO</span></span>;
    return result;
  };

  kindOfHashTag = (state) => {
    let result;
    if(state.hashtag) result = <span>Narrow down results <span className="algorithm-only_mod">ONLY</span> to Use Cases with hashtag: <span className="algorithm-hashtag_mod">#{state.hashtag}</span></span>;
    return result;
  };

  chosenKeyWords = (state) => {
    if(state.chosenKeyWords) {
      let arr = state.chosenKeyWords.map(keyWord => `"${keyWord}"`);
      if(arr.length) return <span>Show all Use Cases <span className="algorithm-only_mod">ONLY</span> with key words: <span className="algorithm-keyWord_mod">{arr.join( ' OR ' )}</span></span>;
    }
  };

  wantedWords = (state) => {
    if(state.name){
      let arrOfWantedWords = state.name.split(' ');
      arrOfWantedWords = arrOfWantedWords.map(wantedWord => `"${wantedWord}"`);
      if(arrOfWantedWords.length > 1) return <span>Narrow down results to Use Cases with words: <span className="algorithm-keyWord_mod">{arrOfWantedWords.join( ' AND ' )}</span></span>;
      if(arrOfWantedWords.length === 1) return <span>Narrow down results to Use Cases with word: <span className="algorithm-wantedWords_mod">"{state.name}"</span> in title.</span>;
    }
  };

  render() {

    return (
      <div className="all-algorithms">
        <h4 id="env-algorithm-text" className="algorithm-text">{this.categoriesOfEnvironment(this.props.state)}</h4>
        <h4 id="hash_tags-algorithm-text" className="algorithm-text">{this.kindOfHashTag(this.props.state)}</h4>
        <h4 id="key_words-algorithm-text" className="algorithm-text">{this.chosenKeyWords(this.props.state)}</h4>
        <h4 id="wanted_words-algorithm-text" className="algorithm-text">{this.wantedWords(this.props.state)}</h4>
      </div>
    )
  }
}


