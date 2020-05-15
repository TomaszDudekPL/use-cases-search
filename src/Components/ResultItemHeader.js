import React from 'react';
import Highlighter from 'react-highlight-words';
import {randomNum} from '../helpers/helperFunctions';

export default class ResultItemHeader extends React.Component {

  defaultDescribeTagName_arr = ['UseCase:'];
  arr = this.props.arr;
  ordinalNumber = this.props.ordinalNumber;
  wantedWords = this.props.wantedWords;
  chosenKeyWords = this.props.chosenKeyWords;
  useCaseID = this.props.useCaseID;
  onBreadcrumbClickHandler = this.props.onBreadcrumbClickHandler;
  allHashTags = this.props.hashTags;
  describeTag = this.props.describeTag;
  image_url = this.props.image_url;
  useCaseBody_str = this.props.uc;
  allKeyWords = this.props.keyWords;
  directoryPath = this.props.directoryPath;

  render() {

    return (
      <div className="breadcrumb-header"
           onClick={this.onBreadcrumbClickHandler(this.useCaseBody_str, this.directoryPath, this.describeTag, this.image_url)}>

        <div className="breadcrumb-item-mod">
          <span className="item-number_mod">{this.ordinalNumber}.</span>
        </div>
        <div className="use_case-text_mod">
          <Highlighter
            className={this.useCaseBody_str.length > 140 ? 'list-text_mod2' : 'list-text_mod1'}
            highlightClassName="highlight-describeTag"
            // searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
            searchWords={this.defaultDescribeTagName_arr}
            autoEscape={true}
            // textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
            textToHighlight={this.defaultDescribeTagName_arr[0]}
          />
          <Highlighter
            className={this.useCaseBody_str.length > 140 ? 'list-text_mod2 font-roboto' : 'list-text_mod1 font-roboto'}
            highlightClassName="highlight-text"
            searchWords={this.wantedWords}
            autoEscape={true}
            textToHighlight={this.useCaseBody_str}
          />
        </div>
        <div className="item-footer-mod">

          <div className="hashtags-title-mod">HASHTAGS:
            {this.allHashTags ? this.allHashTags.map(singleTag => {
              return <span key={singleTag + randomNum()} className="hashtag-item-mod"> {singleTag} </span>;
            }) : null}
          </div>

          <div className="hashtags-title-mod">UC SEARCH ID:
            <span key={randomNum()} className="hashtag-item-mod"> {this.useCaseID} </span>
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