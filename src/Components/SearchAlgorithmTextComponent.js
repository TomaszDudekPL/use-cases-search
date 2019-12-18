import React from 'react';

export default class SearchAlgorithmTextComponent extends React.Component {

  categoriesOfEnvironment = ({consumer_chkbox, pro_chkbox}) => {
    let result;
    if (consumer_chkbox && pro_chkbox === false) result = <span>Find all Use Cases <span className="algorithm-only_mod">ONLY</span> for <span className="algorithm-env_mod">CONSUMER</span></span>;
    if (consumer_chkbox === false && pro_chkbox) result = <span>Find all Use Cases <span className="algorithm-only_mod">ONLY</span> for <span className="algorithm-env_mod">PRO</span></span>;
    if (consumer_chkbox === false && pro_chkbox === false) result = <span>First choose <span className="algorithm-env_mod">ENV</span>, you are interested in.</span>;
    if (consumer_chkbox && pro_chkbox) result = <span>Find all Use Cases for both environments: <span className="algorithm-env_mod">CONSUMER</span> and <span className="algorithm-env_mod">PRO</span></span>;
    return result;
  };

  kindOfHashTag = ({hashtag}) => {
    let result;
    if (hashtag) result = <span>Show <span className="algorithm-only_mod">ONLY</span> UCs with <span
      className="algorithm-only_mod">hashtag: </span><span className="algorithm-hashtag_mod">{hashtag}</span></span>;
    return result;
  };

  render() {

    let connector = this.props.state.connector;
    let keyWords = this.props.state.chosenKeyWords;
    let wantedWords = this.props.state.name;
    let arrOfWantedWords = wantedWords ? wantedWords.split(' ') : null;

    return (
      <div className="all-algorithms">
        {/*<h6 id="env-algorithm-text" className="algorithm-text">{this.categoriesOfEnvironment(this.props.state)}</h6>*/}
        {/*<h6 id="hash_tags-algorithm-text" className="algorithm-text">{this.kindOfHashTag(this.props.state)}</h6>*/}

        {
          keyWords ?
            (<h5 id="key_words-algorithm-text" className="algorithm-text">
              {
                keyWords.length && connector === 'WITHOUT' ?
                  (<span>Show all Use Cases<span className="algorithm-only_mod"> WITHOUT </span>
                        <span>{keyWords.length > 1 ? <span>these<span className="algorithm-only_mod"> key words: </span></span> : <span>this<span className="algorithm-only_mod"> key word: </span></span>}</span>
                    </span>
                  ) : null
              }

              {
                keyWords.length && connector === 'WITH' ?
                  (<span>Show Use Cases with
                        <span>{keyWords.length > 1 ? <span> ALL of these<span className="algorithm-only_mod"> key words: </span></span> : <span> this<span className="algorithm-only_mod"> key word: </span></span>}</span>
                    </span>
                  ) : null
              }

              {
                keyWords.length && connector === 'OR' ?
                  (<span>Show Use Cases<span className="algorithm-only_mod"> ONLY </span>
                      <span> with {keyWords.length > 1 ? <span>these<span className="algorithm-only_mod"> key words: </span></span> : <span>this<span className="algorithm-only_mod"> key word: </span></span>}</span>
                    </span>
                  ) : null
              }

              {keyWords.map((keyWord, index, arr) => {
                return <span className="algorithm-keyWord_mod" key={keyWord}>"{keyWord}"{(index !== arr.length - 1) ?
                  <span className="algorithm-only_mod"> {connector === 'WITHOUT' ? 'AND' : connector} </span> : ''}</span>
              })

              }

            </h5>) : null
        }

        {arrOfWantedWords ? (
          <h6 id="wanted_words-algorithm-text" className="algorithm-text">
            {arrOfWantedWords.length > 1 ? <span>Narrow down the results to UCs with words: </span> :
              <span>Narrow down the results to UCs with word: </span>}
            {arrOfWantedWords.map((word, index, arr) => {
              return <span className="algorithm-wantedWords_mod" key={word}>"{word}"{(index !== arr.length - 1) ?
                <span className="algorithm-only_mod"> AND </span> : ' '}</span>
            })}
            <span className="algorithm-only_mod">in title.</span>
          </h6>

        ) : null}

      </div>
    )
  }
}


