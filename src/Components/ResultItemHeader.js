import React from 'react';
import Highlighter from 'react-highlight-words';
import {randomNum, returnUseCaseNameBody_arr, returnUseCaseTagName_arr, getRidOfTagName, returnKeyWords_arr, returnHashTags_arr} from '../helpers/helperFunctions';

export default class ResultItemHeader extends React.Component {

  defaultDescribeTagName_arr = ['UseCase:'];
  rawUC = this.props.uc;
  arr = this.props.arr;
  ordinalNumber = this.props.number;
  wantedWords = this.props.wantedWords;
  chosenKeyWords = this.props.chosenKeyWords;
  onBreadcrumbClickHandler = this.props.onBreadcrumbClickHandler;
  allHashTags = returnHashTags_arr(this.rawUC);
  describeTag_arr = returnUseCaseTagName_arr(this.rawUC);
  useCaseBody_arr = returnUseCaseNameBody_arr(this.rawUC);
  useCaseNameWithoutTag_str = getRidOfTagName(this.useCaseBody_arr);
  allKeyWords = returnKeyWords_arr(this.rawUC);

  render() {

    return (
      <div className="breadcrumb-header" onClick={this.onBreadcrumbClickHandler(this.rawUC, this.arr, this.describeTag_arr[0])}>

        <div className="breadcrumb-item-mod">
          <span className="item-number_mod">{this.ordinalNumber}.</span>
        </div>
        <div className="use_case-text_mod">
          <Highlighter
            className={this.useCaseNameWithoutTag_str.length > 140 ? 'list-text_mod2' : 'list-text_mod1'}
            highlightClassName="highlight-describeTag"
            // searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
            searchWords={this.defaultDescribeTagName_arr}
            autoEscape={true}
            // textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
            textToHighlight={this.defaultDescribeTagName_arr[0]}
          />
          <Highlighter
            className={this.useCaseNameWithoutTag_str.length > 140 ? 'list-text_mod2 font-roboto' : 'list-text_mod1 font-roboto'}
            highlightClassName="highlight-text"
            searchWords={this.wantedWords}
            autoEscape={true}
            textToHighlight={this.useCaseNameWithoutTag_str}
          />
        </div>
        <div className="item-footer-mod">
          <div className="hashtags-title-mod">HASHTAGS:
            {this.allHashTags ? this.allHashTags.map(singleTag => {
              return <span key={singleTag + randomNum()} className="hashtag-item-mod"> {singleTag} </span>;
            }) : null}
          </div>

          <div className="keywords-title-mod">KEY WORDS:
            {this.allKeyWords ? this.allKeyWords.map(singleKeyWord => {
              return <Highlighter
                key={singleKeyWord + randomNum()}
                className="keyword-item-mod"
                highlightClassName="highlight-text"
                searchWords={this.chosenKeyWords ? this.chosenKeyWords : []}
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