import React from 'react';
import Highlighter from 'react-highlight-words';
import {getItemFromLocalStorage, checkThisUseCase, randomNum} from '../helpers/helperFunctions';
import {Input} from "reactstrap";

export default class ResultItemHeader extends React.Component {

  defaultDescribeTagName_arr = ['UseCase:'];
  chosenKeyWords = this.props.chosenKeyWords;
  useCaseID = this.props.useCaseID;
  onBreadcrumbClickHandler = this.props.onBreadcrumbClickHandler;
  allHashTags = this.props.hashTags;
  describeTag = this.props.describeTag;
  image_url = this.props.image_url;
  useCaseBody_str = this.props.uc;
  allKeyWords = this.props.keyWords;
  directoryPath = this.props.directoryPath;



  checked = (useCaseID, checkOrFocus) => {
    const itemsState_obj = getItemFromLocalStorage('itemsState');
    if(itemsState_obj){
      if(itemsState_obj[useCaseID]){
        return itemsState_obj[useCaseID][checkOrFocus];
      }
    }
  }

  render() {
    const ordinalNumber = this.props.ordinalNumber;

    return (
      <div className={this.checked(this.useCaseID, 'focused')? "breadcrumb-header focused": "breadcrumb-header"}>

        <Input type="checkbox"
               id="uc_done"
               onChange={checkThisUseCase(this.useCaseID, 'checked')}
               defaultChecked={this.checked(this.useCaseID, 'checked')}
        />
        <Input type="checkbox"
               id="uc_focused"
               onChange={checkThisUseCase(this.useCaseID, 'focused')}
               defaultChecked={this.checked(this.useCaseID, 'focused')}
        />

        <div className="breadcrumb-item-mod"
             onClick={this.onBreadcrumbClickHandler(this.useCaseBody_str, this.directoryPath, this.describeTag, this.image_url)}>
          <span className="item-number_mod">{ordinalNumber}.</span>

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
            searchWords={this.props.wantedWords}
            autoEscape={true}
            textToHighlight={this.useCaseBody_str}
          />
        </div>
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