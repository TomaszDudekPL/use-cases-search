import React from 'react';
import Highlighter from 'react-highlight-words';
import {randomNum} from '../helpers/helperFunctions';

export default class ResultItemHeader extends React.Component {

  render() {

    const uc = this.props.uc;
    const arr = this.props.arr;
    const ordinalNumber = this.props.number;
    const wantedWords = this.props.wantedWords;
    const chosenKeyWords = this.props.chosenKeyWords;
    const describeTag_arr = /It: |Step /.test(uc) ? uc.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
    const describeTag_View = ['UseCase:'];
    const onBreadcrumbClickHandler = this.props.onBreadcrumbClickHandler;

    const fullUseCaseName_arr = /It|Step/.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something OR Step: something
    const str = /It|Step/.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '').replace(/Step:/, '') : fullUseCaseName_arr[0];
    const useCaseNameWithoutTag_arr = [];
    useCaseNameWithoutTag_arr.push(str.trim());

    let allKeyWords = uc.match(/![a-zA-Z0-9-_]+\./gmi); // !keyWord1, !keyWord2.

    if (allKeyWords) {
      allKeyWords = allKeyWords.map(keyWord => {
        return keyWord.replace(/!/, '').replace(/\./, ',');
      });
    }

    // cut into chunks: hash tags, constant keywords, full use case name (with describe Tag name) and use cases without describe tag name.
    let allHashTags = uc.match(/HSH_[a-zA-Z]+.[a-zA-Z]+/gm); // #hashtag1 #hashtag2

    if (allHashTags) {
      allHashTags = allHashTags.map(hashTag => {
        return hashTag.replace(/HSH_/, '#').replace(/\./, '');
      });
    }

    return (
      <div className="breadcrumb-header" onClick={onBreadcrumbClickHandler(uc, arr, describeTag_arr[0])}>

        <div className="breadcrumb-item-mod">
          <span className="item-number_mod">{ordinalNumber}.</span>
        </div>
        <div className="use_case-text_mod">
          <Highlighter
            className={useCaseNameWithoutTag_arr[0].length > 140 ? 'list-text_mod2' : 'list-text_mod1'}
            highlightClassName="highlight-describeTag"
            // searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
            searchWords={describeTag_View}
            autoEscape={true}
            // textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
            textToHighlight={describeTag_View[0]}
          />
          <Highlighter
            className={useCaseNameWithoutTag_arr[0].length > 140 ? 'list-text_mod2 font-roboto' : 'list-text_mod1 font-roboto'}
            highlightClassName="highlight-text"
            searchWords={wantedWords}
            autoEscape={true}
            textToHighlight={useCaseNameWithoutTag_arr[0]}
          />
        </div>
        <div className="item-footer-mod">
          <div className="hashtags-title-mod">HASHTAGS:
            {allHashTags ? allHashTags.map(singleTag => {
              return <span key={singleTag + randomNum()} className="hashtag-item-mod"> {singleTag} </span>;
            }) : null}
          </div>

          <div className="keywords-title-mod">KEY WORDS:
            {allKeyWords ? allKeyWords.map(singleKeyWord => {
              return <Highlighter
                key={singleKeyWord + randomNum()}
                className="keyword-item-mod"
                highlightClassName="highlight-text"
                searchWords={chosenKeyWords ? chosenKeyWords : []}
                autoEscape={true}
                textToHighlight={singleKeyWord}
              />;
            }) : null}
          </div>
        </div>

      </div>
    )

  }

}