import React from 'react';
import {Container, Form, FormGroup} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import JumbotronComponent from "./JumbotronComponent";
import CheckboxesComponent from "./CheckboxesComponent";
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from '../firebaseConfig.js'
import changeBaseEngine from '../helpers/changeBaseEngine'
import BadgesComponent from './BadgesComponent'
import KeyWordsComponent from './KeyWordsComponent'
import SearchInputComponent from './SearchInputComponent'
import SearchButtonComponent from './SearchButtonComponent'
import ResultNumberTextComponent from './ResultNumberTextComponent'
import InstructComponent from './InstructComponent'
import SearchAlgorithmTextComponent from './SearchAlgorithmTextComponent'
import {prepareHTMLOfSearchResults} from '../helpers/helperFunctions'
import {
  createObjectWithSearchResult,
  removeSpacesFunc,
  returnAllKeyWords,
  returnAllUseCasesWithWantedKeyWords,
  returnAllUseCasesWithWantedTag,
  returnBaseDividedOnCategories,
  returnNotEmptyValues,
  returnUpdatedListOfUseCases_ifMoreThenOneWord,
  returnUpdatedListOfUseCases_ifOneWord
} from '../helpers/filterEngine_helpers'

firebase.initializeApp(firebaseConfig);

export default class FormComponent extends React.Component {

  collection = new Set();

  state = {
    initialState: null,
    items: [],
    searchResult_arr: [],
    base: null,
    consumerList: null,
    proList: null,
    name: '',
    wantedWords: [],
    consumer_chkbox: false,
    pro_chkbox: false,
    detailsSwitchView: false,
    readyToProceed: true,
    hashtag: '',
    connector: 'WITH'
  };

  componentDidMount() {
    firebase.database().ref('/').once('value').then(snapshot => {
        this.changeBaseToProperForm(snapshot.val())
      }
    )
  }

  changeBaseToProperForm(val) {
    let changedBase = changeBaseEngine(val);
    changeBaseEngine.showWholeBase = false;
    this.setState(() => changedBase);
  }

  showSearchValue = (event) => {
    this.setState({
      name: event.target.value
    })
  };

  clearPreviousView = () => {
    this.setState({
      wantedWords: []
    })
  };

  proceedSearching = (e) => {
    let base;
    if(e) e.preventDefault();
    console.log('proceedSearching');

    if ((this.state.name || this.state.hashtag) && this.state.base) {

      if (!this.state.hashtagBase) {

        // divide into consumer, pro, whole, none.
        base = returnBaseDividedOnCategories(this.state);
        base = returnAllUseCasesWithWantedTag(base, this.state.hashtag);

      } else if (this.state.chosenKeyWords.length) {
        base = returnAllUseCasesWithWantedKeyWords(this.state.hashtagBase, this.state.chosenKeyWords, this.state.connector);

      } else {
        // divide into consumer, pro, whole, none.
        base = returnBaseDividedOnCategories(this.state);
        base = this.state.hashtag ? this.state.hashtagBase : base;
      }

      this.setState(() => {
          return {
            readyToProceed: false
          }
        }
      );

      this.filterList(base, this.state.name);
    }
  };

  filterList = (base, searchValue = '') => {

    // clear previous searching result
    this.clearPreviousView();

    // preparing search key words
    let arrOfKeyWords = returnNotEmptyValues(searchValue);

    //searching by one word
    if (arrOfKeyWords.length === 1) {
      console.log('searching with ONE word');

      if (searchValue && searchValue.length >= 3) {

        const {updatedList, wantedValue} = returnUpdatedListOfUseCases_ifOneWord(base, searchValue);

        const searchResult_arr = createObjectWithSearchResult(updatedList);

        console.log('wantedValue: ', wantedValue);
        console.log('updatedList: ', updatedList);

        // ready results to be rendered
        this.setState({
          wantedWords: [wantedValue],
          searchResult_arr
        });

      }

    }

    // searching by two and three words
    else if (arrOfKeyWords.length > 1) {

      console.log('searching by two words');

      let firstKeyWord = removeSpacesFunc(arrOfKeyWords[0]);
      let secondKeyWord = removeSpacesFunc(arrOfKeyWords[1]);
      let thirdKeyWord = removeSpacesFunc(arrOfKeyWords[2]);

      let wantedWords = [];

      wantedWords.push(firstKeyWord);
      if (secondKeyWord && secondKeyWord.length > 2) wantedWords.push(secondKeyWord);
      if (thirdKeyWord && thirdKeyWord.length > 2) wantedWords.push(thirdKeyWord);

      console.log("wantedWords:", wantedWords);

      if (secondKeyWord || thirdKeyWord) {

        let updatedList = returnUpdatedListOfUseCases_ifMoreThenOneWord(base, arrOfKeyWords, firstKeyWord, secondKeyWord, thirdKeyWord);
        const searchResult_arr = createObjectWithSearchResult(updatedList);

        // if something will be wrong with searching with two or more key words move this setState func to TARGET comment place in filterEngine_helpers
        this.setState({
          wantedWords,
          searchResult_arr
        });
      }

    }

    if (!arrOfKeyWords.length && this.state.hashtag) {

      const searchResult_arr = createObjectWithSearchResult(base);

      this.setState(() => {
        return {
          searchResult_arr
        }
      })
    }
  };

  handleChangeConsumerChk = () => {
    this.setState({
      consumer_chkbox: !this.state.consumer_chkbox,
      pro_chkbox: false,
      name: '',
      hashtag: '',
      searchButtonClicked: false,
      readyToProceed: true,
      searchResult_arr: [],
      chosenKeyWords: [],
      keyWords: []
    });
  };

  handleChangeProChk = () => {
    this.setState({
      pro_chkbox: !this.state.pro_chkbox,
      consumer_chkbox: false,
      name: '',
      hashtag: '',
      searchButtonClicked: false,
      readyToProceed: true,
      searchResult_arr: [],
      chosenKeyWords: [],
      keyWords: []
    });
  };

  createPrintView = (items, func) => () => {
    prepareHTMLOfSearchResults(items, func);
  };

  chooseHashTag = (hashTagName) => async () => {

    if (this.state.base) {

      if (this.state.hashtag === hashTagName) {
        await this.setState(() => {
          return {
            keyWords: [],
            hashtag: '',
            name: '',
            chosenKeyWords: [],
            searchResult_arr: []
          }
        })
      } else {
        this.collection = new Set();

        let base = returnBaseDividedOnCategories(this.state);
        base = returnAllUseCasesWithWantedTag(base, hashTagName);
        let keyWords = returnAllKeyWords(base);

        await this.setState(() => {
          return {
            hashtag: this.state.hashtag !== hashTagName ? hashTagName : '',
            hashtagBase: base,
            searchResult_arr: [],
            readyToProceed: true,
            chosenKeyWords: [],
            keyWords
          }
        })
      }
    }

    this.proceedSearching()
  };

  returnChosenKeyWords = async (keyWord) => {
    if (this.collection.has(keyWord)) {
      this.collection.delete(keyWord)
    } else {
      this.collection.add(keyWord);
    }
    await this.setState(() => {
      return {
        searchResult_arr: [],
        readyToProceed: true,
        chosenKeyWords: [...this.collection].sort()
      }
    })

    this.proceedSearching()
  };

  getBackConnector = async (connector) => {
    await this.setState(
      {
        searchResult_arr: [],
        readyToProceed: true,
        connector
      }
    )

    this.proceedSearching()
  };

  cancelInput = (e) => {
    e.preventDefault();
    this.setState(() => {
      return {
        searchResult_arr: [],
        name: '',
        hashtag: '',
        readyToProceed: true,
        chosenKeyWords: [],
        keyWords: [],
        connector: 'WITH'
      }
    })
  }

  render() {

    return (
      <div className="main-label">
        <JumbotronComponent searchResult_arr={this.state.searchResult_arr}
                            createPrintView={this.createPrintView}
        />

        <Container fluid>
          <Form className="form_mod">
            <FormGroup>

              <div className="instruct-mod">

                <InstructComponent text="ENVIRONMENT"/>
                <CheckboxesComponent consumer_chkbox={this.state.consumer_chkbox}
                                     pro_chkbox={this.state.pro_chkbox}
                                     numberOfAllUCforConsumer={this.state.numberOfAllUCforConsumer}
                                     handleChangeConsumerChk={this.handleChangeConsumerChk}
                                     handleChangeProChk={this.handleChangeProChk}
                                     numberOfAllUCforPro={this.state.numberOfAllUCforPro}
                />

                {this.state.consumer_chkbox || this.state.pro_chkbox ?
                  <div>
                    <InstructComponent text="HASHTAGS"/>
                    <BadgesComponent chooseHashTag={this.chooseHashTag} state={this.state}/>
                  </div> : null
                }

                <KeyWordsComponent keyWords={this.state.keyWords}
                                   returnChosenKeyWords={this.returnChosenKeyWords}
                                   chosenKeyWords={this.state.chosenKeyWords}
                                   chosenHashTag={this.state.hashtag}
                                   connector={this.state.connector}
                                   getBackConnector={this.getBackConnector}

                />

              </div>

              <SearchInputComponent
                cancel={this.cancelInput}
                multipleFuncOnChangeHandler={this.showSearchValue}
                name={this.state.name}
              />

              <SearchAlgorithmTextComponent state={this.state}/>


                <SearchButtonComponent executeFunc={this.proceedSearching}
                                       readyToProceed={this.state.readyToProceed}
                                       color="success"
                                       id="search_btn"
                                       name={this.state.readyToProceed ? "search" : "re-search again"}
                />


              <ResultNumberTextComponent searchResult_arr={this.state.searchResult_arr}
                                         readyToProceed={this.state.readyToProceed}
              />

              <SearchResultItems searchResult_arr={this.state.searchResult_arr}
                                 consumerBase={this.state.consumerList}
                                 proBase={this.state.proList}
                                 wantedWords={this.state.wantedWords}
                                 chosenKeyWords={this.state.chosenKeyWords}
                                 >.</SearchResultItems>

            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
