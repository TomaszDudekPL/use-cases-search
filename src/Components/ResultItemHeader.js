import React from 'react';
import Highlighter from 'react-highlight-words';
import {randomNum, returnUseCaseNameBody_arr, returnUseCaseTagName_arr, getRidOfTagName, returnKeyWords_arr, returnHashTags_arr} from '../helpers/helperFunctions';

export default class ResultItemHeader extends React.Component {

  defaultDescribeTagName_arr = ['UseCase:'];

  render() {

    const rawUC = this.props.uc;
    const arr = this.props.arr;
    const ordinalNumber = this.props.number;
    const wantedWords = this.props.wantedWords;
    const chosenKeyWords = this.props.chosenKeyWords;
    const onBreadcrumbClickHandler = this.props.onBreadcrumbClickHandler;
    const describeTag_arr = returnUseCaseTagName_arr(rawUC);
    const useCaseBody_arr = returnUseCaseNameBody_arr(rawUC);
    const useCaseNameWithoutTag_str = getRidOfTagName(useCaseBody_arr);
    let allKeyWords = returnKeyWords_arr(rawUC);
    let allHashTags = returnHashTags_arr(rawUC);

    return (
      <div className="breadcrumb-header" onClick={onBreadcrumbClickHandler(rawUC, arr, describeTag_arr[0])}>

        <div className="breadcrumb-item-mod">
          <span className="item-number_mod">{ordinalNumber}.</span>
        </div>
        <div className="use_case-text_mod">
          <Highlighter
            className={useCaseNameWithoutTag_str.length > 140 ? 'list-text_mod2' : 'list-text_mod1'}
            highlightClassName="highlight-describeTag"
            // searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
            searchWords={this.defaultDescribeTagName_arr}
            autoEscape={true}
            // textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
            textToHighlight={this.defaultDescribeTagName_arr[0]}
          />
          <Highlighter
            className={useCaseNameWithoutTag_str.length > 140 ? 'list-text_mod2 font-roboto' : 'list-text_mod1 font-roboto'}
            highlightClassName="highlight-text"
            searchWords={wantedWords}
            autoEscape={true}
            textToHighlight={useCaseNameWithoutTag_str}
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