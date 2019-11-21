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
    if (state.hashtag) result = <span>Show <span className="algorithm-only_mod">ONLY</span> UCs with <span className="algorithm-only_mod">hashtag: </span><span className="algorithm-hashtag_mod">{state.hashtag}</span></span>;
    return result;
  };

  render() {

    let keyWords = this.props.state.chosenKeyWords;
    let wantedWords = this.props.state.name;
    let arrOfWantedWords = wantedWords? wantedWords.split(' '): null;

    return (
      <div className="all-algorithms">
        <h5 id="env-algorithm-text" className="algorithm-text">{this.categoriesOfEnvironment(this.props.state)}</h5>
        <h5 id="hash_tags-algorithm-text" className="algorithm-text">{this.kindOfHashTag(this.props.state)}</h5>

        {keyWords ? (
          <h5 id="key_words-algorithm-text" className="algorithm-text">
            {keyWords.length ?
              <span>From them show
                <span className="algorithm-only_mod"> ONLY </span>
                {<span>UCs with <span className="algorithm-only_mod">{keyWords.length > 1 ?'key words: ': 'key word: '}</span></span>}</span>: null}
            {keyWords.map((keyWord, index, arr) => {
              return <span className="algorithm-keyWord_mod" key={keyWord}>"{keyWord}"{(index !== arr.length - 1) ?
                <span className="algorithm-only_mod"> OR </span> : ''}</span>
            })

            }</h5>
        ) : null}

          {arrOfWantedWords? (
            <h5 id="wanted_words-algorithm-text" className="algorithm-text">
              {arrOfWantedWords.length > 1 ? <span>Narrow down the results to UCs with words: </span>: <span>Narrow down the results to UCs with word: </span>}
              {arrOfWantedWords.map((word, index, arr)=>{
                return <span className="algorithm-wantedWords_mod" key={word}>"{word}"{(index !== arr.length - 1) ?
                  <span className="algorithm-only_mod"> AND </span>: ' '}</span>
              })}
              <span className="algorithm-only_mod">in title.</span>
           </h5>

            ): null}

      </div>
    )
  }
}


