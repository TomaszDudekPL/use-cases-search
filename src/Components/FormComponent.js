import React from 'react';
import {Container, Form, FormGroup,  ButtonGroup} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import JumbotronComponent from "./JumbotronComponent";
import CheckboxesComponent from "./CheckboxesComponent";
import AllCasesButtonComponent from "./AllCasesButtonComponent";
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from '../firebaseConfig.js'
import changeBaseEngine from '../helpers/changeBaseEngine'
import InstructComponent from './InstructComponent'
import BadgesComponent from './BadgesComponent'
import SearchInputComponent from './SearchInputComponent'
import SearchButtonComponent from './SearchButtonComponent'
import {
  calculateNumberOfUCForConsumer,
  calculateNumberOfUCForPro,
  prepareMapOfSearchResults
} from '../helpers/helperFunctions'
import {
  removeSpacesFunc,
  returnNotEmptyValues,
  returnUpdatedListOfUseCases_ifOneWord,
  returnUpdatedListOfUseCases_ifMoreThenOneWord,
  returnBaseDividedOnCategories,
  returnAllUseCasesWithWantedTag
} from '../helpers/filterEngine_helpers'

firebase.initializeApp(firebaseConfig);

export default class FormComponent extends React.Component {

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
    consumer_chkbox: true,
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
      ucInfoObj: null
    })
  };

  proceedSearching = (e) => {
    e.preventDefault();
    console.log('proceedSearching');

    if(this.state.name && this.state.base) {

      // divide into consumer, pro, whole, none.
      let base = returnBaseDividedOnCategories(this.state);
      base = returnAllUseCasesWithWantedTag(base, this.state.hashtag);

      this.setState(() => {
          return {
            readyToProceed: false,
            base: base
          }
        }
      );
      // console.log(this.state.base);

      console.log('this.state.name: ', this.state.name);

      this.filterList(base, this.state.name);
    }
  };

  resetAllSettings = (e) => {
    e.preventDefault();
    console.log('resetAllSettings');
    this.setState(() => {
        return {
          readyToProceed: true
        }
      }
    )
  };

  filterList = (base, searchValue) => {

    console.log('searchValue:', searchValue);
    console.log('base: ', base);

    // divide into consumer, pro, whole, none.
    // let base = returnBaseDividedOnCategories(this.state);

    // clear previous searching result
    this.clearPreviousView();

    // preparing search key words
    let arrOfKeyWords = returnNotEmptyValues(searchValue);

    console.log('arrOfKeyWords:', arrOfKeyWords);

    //searching by one word
    if (!this.state.items.length && arrOfKeyWords.length === 1) {

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

    console.log('base: ', this.state.base);

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

  handleChangeConsumerChk = () => {
    let showWholeBase = false;
    let checkedConsumerValue = document.getElementById('consumer-chkbox').checked;
    this.setState({
      showWholeBase: showWholeBase,
      consumer_chkbox: checkedConsumerValue,
      items: [],
      name: ''
    });
  };

  handleChangeProChk = () => {
    let checkedProValue = document.getElementById('pro-chkbox').checked;
    this.setState({
      showWholeBase: false,
      pro_chkbox: checkedProValue,
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
    console.log('chooseHashTag click!');
    this.setState(()=> {
      return {
        hashtag: this.state.hashtag !== hashTagName? hashTagName: ''
      }
    })
  };

  render() {

    console.log('hashtag: ', this.state.hashtag);

    return (
      <div className="main-label">
        <JumbotronComponent name={this.state.name}
                            ucInfoObj={this.state.ucInfoObj}
                            detailsSwitchView={this.state.detailsSwitchView}
                            items={this.state.items}
                            showWholeBase={this.state.showWholeBase}
                            createPrintView={this.createPrintView}
                            calculateNumbersOfUC={this.calculateNumbersOfUC}
                            hideThisViewBtn={this.hideThisViewBtn}
        />

        <Container fluid>
          <Form className="form_mod">
            <FormGroup>

              <div className="instruct-mod">

                <InstructComponent text="1. First choose what kind of UC you are interested in:"/>
                <CheckboxesComponent consumer_chkbox={this.state.consumer_chkbox}
                                     pro_chkbox={this.state.pro_chkbox}
                                     numberOfAllUCforConsumer={this.state.numberOfAllUCforConsumer}
                                     handleChangeConsumerChk={this.handleChangeConsumerChk}
                                     handleChangeProChk={this.handleChangeProChk}
                                     numberOfAllUCforPro={this.state.numberOfAllUCforPro}
                />
                <InstructComponent
                  text="2. Choose tag of what you are interested in to narrow down the results or just jump into next step."/>

                <BadgesComponent chooseHashTag={this.chooseHashTag}
                                 state={this.state}
                />

                <InstructComponent text="3. Use maximum 3 words to describe what exactly are you looking for:"/>

              </div>

              <SearchInputComponent
                multipleFuncOnChangeHandler={this.multipleFuncOnChangeHandler}
                name={this.state.name}
              />

              <ButtonGroup>
              <SearchButtonComponent executeFunc={this.proceedSearching}
                                     readyToProceed={this.state.readyToProceed}
                                     color="success"
                                     name={this.state.readyToProceed? "Search Now!": "Search Again."}
              />

              <SearchButtonComponent executeFunc={this.resetAllSettings}
                                     readyToProceed={this.state.readyToProceed}
                                     color="danger"
                                     name="✕ Reset all settings."
                                     visibility={this.state.readyToProceed}
              />
              </ButtonGroup>

              <AllCasesButtonComponent showWholeBase={this.state.showWholeBase}
                                       showAllUseCases={this.showAllUseCases}
                                       hideAllUseCases={this.hideAllUseCases}

              />

              <SearchResultItems items={this.state.items}
                                 wantedWords={this.state.wantedWords}
                                 itemClicked={this.onItemClicked}
                                 showWholeBase={this.state.showWholeBase}>.</SearchResultItems>

            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
