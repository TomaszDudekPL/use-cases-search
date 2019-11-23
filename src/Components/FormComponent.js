import React from 'react';
import {ButtonGroup, Container, Form, FormGroup} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import JumbotronComponent from "./JumbotronComponent";
import CheckboxesComponent from "./CheckboxesComponent";
import AllCasesButtonComponent from "./AllCasesButtonComponent";
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
import {
  calculateNumberOfUCForConsumer,
  calculateNumberOfUCForPro,
  prepareMapOfSearchResults
} from '../helpers/helperFunctions'
import {
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
    base: null,
    consumerList: null,
    proList: null,
    showWholeBase: false,
    name: '',
    numberOfAllUseCases: 0,
    wantedWords: [],
    ucInfoObj: null,
    consumer_chkbox: false,
    pro_chkbox: false,
    detailsSwitchView: false,
    readyToProceed: true,
    hashtag: ''
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

  showAllUseCases = () => {

    let consumer_chkbox = this.state.consumer_chkbox;
    let pro_chkbox = this.state.pro_chkbox;
    let itemsToView = null;
    let showWholeBase = !this.state.showWholeBase;

    if (consumer_chkbox && pro_chkbox) {
      itemsToView = this.state.base;
    }
    if (consumer_chkbox && !pro_chkbox) {
      itemsToView = this.state.consumerList;
    }
    if (!consumer_chkbox && pro_chkbox) {
      itemsToView = this.state.proList;
    }
    if (!consumer_chkbox && !pro_chkbox) {
      itemsToView = [];
      showWholeBase = false;
    }

    this.setState({
      items: itemsToView,
      showWholeBase: showWholeBase,
      name: ''
    })
  };

  hideAllUseCases = () => {
    this.setState({
      items: [],
      showWholeBase: !this.state.showWholeBase,
      name: ''
    })
  };

  showSearchValue = (event) => {
    this.setState({
      name: event.target.value
    })
  };

  clearPreviousView = () => {
    this.setState({
      ucInfoObj: null,
      wantedWords: []
    })
  };

  resetAllSettings = (e) => {
    e.preventDefault();
    this.setState(() => {
        return {
          items: [],
          name: '',
          hashtag: '',
          searchButtonClicked: false,
          readyToProceed: true,
          chosenKeyWords: [],
          keyWords: []
        }
      }
    )
  };

  proceedSearching = (e) => {
    let base;
    e.preventDefault();
    console.log('proceedSearching');

    if ((this.state.name || this.state.hashtag) && this.state.base) {

      if (!this.state.hashtagBase) {

        // divide into consumer, pro, whole, none.
        base = returnBaseDividedOnCategories(this.state);
        base = returnAllUseCasesWithWantedTag(base, this.state.hashtag);

      } else if (this.state.chosenKeyWords.length) {
        base = returnAllUseCasesWithWantedKeyWords(this.state.hashtagBase, this.state.chosenKeyWords);

      } else {
        // divide into consumer, pro, whole, none.
        base = returnBaseDividedOnCategories(this.state);
        base = this.state.hashtag ? this.state.hashtagBase : base;
      }

      this.setState(() => {
          return {
            readyToProceed: false,
            base,
            searchButtonClicked: true
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

      this.setState({
        // name: event.value,
        showWholeBase: false
      });

      if (searchValue && searchValue.length >= 3) {

        const {updatedList, wantedValue} = returnUpdatedListOfUseCases_ifOneWord(base, searchValue);

        console.log('wantedValue: ', wantedValue);
        console.log('updatedList: ', updatedList);

        // ready results to be rendered
        this.setState({
          items: updatedList,
          wantedWords: [wantedValue]
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

        // if something will be wrong with searching with two or more key words move this setState func to TARGET comment place in filterEngine_helpers
        this.setState({
          items: updatedList,
          wantedWords: wantedWords
        });
      }

    }

    if (!arrOfKeyWords.length && this.state.hashtag) {
      this.setState(() => {
        return {
          items: base
        }
      })
    }

    // clear search result view if input is clearing by user
    if (searchValue && searchValue.length < 4) {
      this.setState({
        items: []
      })
    }
  };

  onItemClicked = (ucInfoObj) => {
    this.setState({
      ucInfoObj: ucInfoObj,
      detailsSwitchView: true
    })
  };

  multipleFuncOnChangeHandler = (event) => {
    // this.filterList(event);
    this.showSearchValue(event);
  };

  handleChangeConsumerChk = (e) => {
    let showWholeBase = false;
    let checkedConsumerValue = 'CONSUMER';
    e.target.innerText = !this.state.consumer_chkbox ? `✓ ${checkedConsumerValue}` : checkedConsumerValue;

    this.setState({
      showWholeBase: showWholeBase,
      consumer_chkbox: !this.state.consumer_chkbox,
      items: [],
      name: ''
    });
  };

  handleChangeProChk = (e) => {
    let checkedProValue = 'PRO';
    e.target.innerText = this.state.pro_chkbox ? checkedProValue : `✓ ${checkedProValue}`;

    this.setState({
      showWholeBase: false,
      pro_chkbox: !this.state.pro_chkbox,
      items: [],
      name: ''
    });
  };

  hideThisViewBtn = () => {
    this.setState({
      detailsSwitchView: false
    })
  };

  createPrintView = (items) => () => {
    prepareMapOfSearchResults(items);
  };

  calculateNumbersOfUC = (items = this.state.items) => {
    return calculateNumberOfUCForConsumer(items) + calculateNumberOfUCForPro(items);
  };

  chooseHashTag = (hashTagName) => () => {

    if (this.state.base) {

      if (this.state.hashtag === hashTagName) {
        this.setState(() => {
          return {
            keyWords: [],
            hashtag: '',
            chosenKeyWords: []
          }
        })
      } else {

        this.collection = new Set();

        let base = returnBaseDividedOnCategories(this.state);
        base = returnAllUseCasesWithWantedTag(base, hashTagName);
        let keyWords = returnAllKeyWords(base);

        this.setState(() => {
          return {
            hashtag: this.state.hashtag !== hashTagName ? hashTagName : '',
            hashtagBase: base,
            chosenKeyWords: [],
            keyWords
          }
        })
      }
    }
  };

  returnChosenKeyWords = (keyWord) => {
    if (this.collection.has(keyWord)) {
      this.collection.delete(keyWord)
    } else {
      this.collection.add(keyWord);
    }
    this.setState(() => {
      return {
        chosenKeyWords: [...this.collection].sort()
      }
    })
  };

  render() {

    return (
      <div className="main-label">
        <JumbotronComponent name={this.state.name}
                            ucInfoObj={this.state.ucInfoObj}
                            detailsSwitchView={this.state.detailsSwitchView}
                            items={this.state.items}
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

                { this.state.consumer_chkbox || this.state.pro_chkbox?
                  <div>
                    <InstructComponent text="HASHTAGS"/>
                    <BadgesComponent chooseHashTag={this.chooseHashTag} state={this.state}/>
                  </div>: null
                }

                <KeyWordsComponent keyWords={this.state.keyWords}
                                   returnChosenKeyWords={this.returnChosenKeyWords}
                                   chosenKeyWords={this.state.chosenKeyWords}
                                   chosenHashTag={this.state.hashtag}

                />

              </div>

              <SearchInputComponent
                multipleFuncOnChangeHandler={this.multipleFuncOnChangeHandler}
                name={this.state.name}
              />

              <SearchAlgorithmTextComponent state={this.state}/>

              <ButtonGroup>
                <SearchButtonComponent executeFunc={this.proceedSearching}
                                       readyToProceed={this.state.readyToProceed}
                                       color="success"
                                       name={this.state.readyToProceed ? "proceed with these settings!" : "re-search again"}
                />

                <SearchButtonComponent executeFunc={this.resetAllSettings}
                                       readyToProceed={this.state.readyToProceed}
                                       color="secondary"
                                       name="✕ start from the beginning"
                                       visibility={this.state.readyToProceed}
                />
              </ButtonGroup>

              <ResultNumberTextComponent state={this.state}/>

              <AllCasesButtonComponent showWholeBase={this.state.showWholeBase}
                                       showAllUseCases={this.showAllUseCases}
                                       hideAllUseCases={this.hideAllUseCases}

              />

              <SearchResultItems items={this.state.items}
                                 base={this.state.base}
                                 wantedWords={this.state.wantedWords}
                                 itemClicked={this.onItemClicked}
                                 chosenKeyWords={this.state.chosenKeyWords}
                                 showWholeBase={this.state.showWholeBase}>.</SearchResultItems>

            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
