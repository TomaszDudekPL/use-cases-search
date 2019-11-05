import React from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import JumbotronComponent from "./JumbotronComponent";
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from './firebaseConfig.js'
import prepareMapOfSearchResults from './helpers/prepareMapOfSearchResults'
import changeBaseEngine from './helpers/changeBaseEngine'
import {preventActionHandler, calculateNumberOfUCForConsumer, calculateNumberOfUCForPro} from './helpers/helperFunctions'
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
    detailsSwitchView: false
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

    if(consumer_chkbox && pro_chkbox) {itemsToView = this.state.base;}
    if(consumer_chkbox && !pro_chkbox) {itemsToView = this.state.consumerList;}
    if(!consumer_chkbox && pro_chkbox) {itemsToView = this.state.proList;}
    if(!consumer_chkbox && !pro_chkbox) {itemsToView = []; showWholeBase = false;}

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

  filterList = (event) => {

    this.clearPreviousView();

    let base;
    let updatedList = [];
    let ucArr = new Set();
    let wantedValue;

    // database filtering-  divide into consumer, pro, whole, none.
    if (this.state.consumer_chkbox && this.state.pro_chkbox === false) base = this.state.consumerList;
    if (this.state.consumer_chkbox === false && this.state.pro_chkbox) base = this.state.proList;
    if (this.state.consumer_chkbox === false && this.state.pro_chkbox === false) base = [];
    if (this.state.consumer_chkbox && this.state.pro_chkbox) base = this.state.base;

    let removeSpacesFunc = (word) => word ? word.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ") : null;
    let getLowerCaseFunc = (character) => character.toLowerCase();

    // preparing search key words
    let arrOfKeyWords = event.target.value.split(' ');
    arrOfKeyWords = arrOfKeyWords.filter(function (el) {
      return el !== null && el !== "";
    });

    // searching by one word
    if (!this.state.items.length || arrOfKeyWords.length === 1) {

      this.setState({
        name: event.value,
        showWholeBase: false
      });

      if (event.target.value.length >= 3) {

        updatedList = [];

        base.forEach(arrOfUC => {

          arrOfUC[1].forEach(uc => {

            wantedValue = getLowerCaseFunc(event.target.value);
            wantedValue = removeSpacesFunc(wantedValue);

            if (getLowerCaseFunc(uc).search(wantedValue) !== -1) ucArr.add(uc);

          });

          if (ucArr.size) updatedList.push([arrOfUC[0], [...ucArr]]);

          ucArr = new Set();

        });

        // ready results to be rendered
        this.setState({
          items: updatedList,
          wantedWords: [wantedValue]
        });

      }

    } else if (/\s+/.test(event.target.value)) {

      // searching by two and three words

      let firstKeyWord = removeSpacesFunc(arrOfKeyWords[0]);
      let secondKeyWord = removeSpacesFunc(arrOfKeyWords[1]);
      let thirdKeyWord = removeSpacesFunc(arrOfKeyWords[2]);

      let wantedWords = [];

      wantedWords.push(firstKeyWord);
      if (secondKeyWord && secondKeyWord.length > 2) wantedWords.push(secondKeyWord);
      if (thirdKeyWord && thirdKeyWord.length > 2) wantedWords.push(thirdKeyWord);

      if (secondKeyWord || thirdKeyWord) {

        let updatedList = [];
        let ucArr = new Set();

        base.forEach(arrOfUC => {

          arrOfUC[1].forEach(
            function (uc) {
              if (getLowerCaseFunc(uc).search(firstKeyWord) !== -1) {
                if (!arrOfKeyWords[1]) {
                  ucArr.add(uc);
                }
                if (arrOfKeyWords[1]) {
                  if (getLowerCaseFunc(uc).search(secondKeyWord) !== -1) {
                    if (!arrOfKeyWords[2]) {
                      ucArr.add(uc);
                    } else if (arrOfKeyWords[1] && arrOfKeyWords[2]) {
                      if (getLowerCaseFunc(uc).search(thirdKeyWord) !== -1) {
                        ucArr.add(uc);
                      }
                    }
                  }
                }
              }
            });

          if (ucArr.size) {
            updatedList.push([arrOfUC[0], [...ucArr]]);
            ucArr = new Set();
            this.setState({
              items: updatedList,
              wantedWords: wantedWords
            });
          }

        });
      }

    }

    if (event.target.value.length < 4) {
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
    this.filterList(event);
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
    this.setState( {
      detailsSwitchView: false
    })
  };

  createPrintView = (items) => () => {
    prepareMapOfSearchResults(items);
  };

  calculateNumbersOfUC = (items = this.state.items) => {
    return calculateNumberOfUCForConsumer(items) + calculateNumberOfUCForPro(items);
  };

  render() {

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
              <Row>
                <Col sm="12" md={{size: 12}} className="form-input_mod">
                  <Input type="search" spellCheck="false" value={this.state.name} name="search" id="useCasesSearch"
                         bsSize="lg"
                         placeholder="Type what are you looking for... for example: post video"
                         onChange={this.multipleFuncOnChangeHandler}
                         onKeyPress={preventActionHandler}/>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup check>
                    <div className="double-consumer">
                      <Label check className="input-label_mod">
                        <Input type="checkbox" id="consumer-chkbox" className="input-checkbox_mod"
                               defaultChecked={this.state.consumer_chkbox}
                               onChange={this.handleChangeConsumerChk}/>{' '}
                        CONSUMER <span className="checkbox-counter">{this.state.numberOfAllUCforConsumer}</span>
                      </Label>
                    </div>
                    <div className="double-pro">
                      <Label check className="input-label_mod">
                        <Input type="checkbox" id="pro-chkbox" className="input-checkbox_mod"
                               defaultChecked={this.state.pro_chkbox} onChange={this.handleChangeProChk}/>{' '}
                        PRO  <span className="checkbox-counter">{this.state.numberOfAllUCforPro}</span>
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                {!this.state.showWholeBase ?
                  (<Col sm="12" md={{size: 6, offset: 3}}>
                    <Button block color="warning" className="form-button_mod" onClick={this.showAllUseCases}>Show All Use Cases</Button>
                  </Col>) :

                  (<Col sm="12" md={{size: 6, offset: 3}}>
                    <Button block color="danger" className="form-button_mod" onClick={this.hideAllUseCases}>✕ Hide All Use Cases</Button>
                  </Col>)
                }
              </Row>
              <Row>
                <Col sm="12" md={{size: 12, offset: 0}}>
                  <SearchResultItems items={this.state.items}
                                     wantedWords={this.state.wantedWords}
                                     itemClicked={this.onItemClicked}
                                     showWholeBase={this.state.showWholeBase}>.</SearchResultItems>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
