import React from 'react';
import {Button, Col, Container, Form, FormGroup, Input, InputGroup, Jumbotron, Label, Row} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from './firebaseConfig.js'
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
    pro_chkbox: true
  };

  componentDidMount() {
    firebase.database().ref('/').once('value').then(snapshot => {
        this.changeBaseToProperForm(snapshot.val())
      }
    )
  }

  changeBaseToProperForm(val) {

    let number = 0;
    let entries = Object.entries(val);
    let consumerList = [];
    let proList = [];

    entries.forEach(function (arr) {
      arr[1] = Object.keys(arr[1]);
      number += arr[1].length;
      if(/CONSUMER/mi.test(arr[0])){
        consumerList.push(arr);
      } else if (/PRO/mi.test(arr[0])){
        proList.push(arr);
      }
    });

    this.setState({
      base: entries,
      consumerList: consumerList,
      proList: proList,
      showWholeBase: false,
      numberOfAllUseCases: number
    })
  }

  showAllUseCases = () => {

    let consumer_chkbox = this.state.consumer_chkbox;
    let pro_chkbox = this.state.pro_chkbox;
    let itemsToView = null;
    let showWholeBase = !this.state.showWholeBase;
    let numberOfUseCasesToShow = this.state.numberOfUseCasesToShow;

    if(consumer_chkbox && pro_chkbox) {itemsToView = this.state.base; numberOfUseCasesToShow = this.state.numberOfAllUseCases}
    if(consumer_chkbox && !pro_chkbox) {itemsToView = this.state.consumerList;}
    if(!consumer_chkbox && pro_chkbox) {itemsToView = this.state.proList;}
    if(!consumer_chkbox && !pro_chkbox) {itemsToView = []; showWholeBase = false;}

    this.setState({
      items: itemsToView,
      showWholeBase: showWholeBase,
      numberOfUseCasesToShow: numberOfUseCasesToShow,
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

  filterList = (event) => {

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

  preventActionHandler = (event) => {
    let charCode = event.charCode;
    if (charCode === 13) {
      event.preventDefault();
    }
  };

  onItemClicked = (ucInfoObj) => {
    this.setState({
      ucInfoObj: ucInfoObj
    })
  };

  saveToClipboard = (id) => {
    return () => {
      let copyText = document.getElementById(id);
      copyText.select();
      document.execCommand("copy");
    }
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


  render() {
    let runUCCommand, env;
    let ucInfoObj = this.state.ucInfoObj;
    let numberOfUCforConsumer = 0, numberOfUCforPro = 0;

    if (ucInfoObj) {

      switch(ucInfoObj.arr[0]){
        case 'CONSUMER':
          env = 'master';
          break;
        case 'PRO':
          env = 'master-pro';
          break;
        case 'LIVE':
          env = 'live';
          break;
       default:  env = 'master';
      }

      let urlToFile = ucInfoObj.arr.join('/').concat('.js');
      runUCCommand = `node launcher.js -p 1 -r 1 -e ${env} -d ${urlToFile}`;
    }

    this.state.items.forEach(arr => {
      numberOfUCforConsumer += /CONSUMER/.test(arr[0]) ? arr[1].length : 0;
      numberOfUCforPro += /PRO/.test(arr[0]) ? arr[1].length : 0;
    });

    return (
      <div className="main-label">
        <Jumbotron fluid className="jumbotron_mod">
          <h1
            className={this.state.ucInfoObj || this.state.name ? "display-7 form-mainLabel_mod1" : "display-7 form-mainLabel_mod2"}>USE
            CASES SEARCH</h1>
          {this.state.name && !this.state.ucInfoObj ? (

            <Row className="jumbotron-result_mod">
              <Col sm="12" md={{size: 10, offset: 1}}>
                <span className="jumbotron-label-text">FOR </span>
                <span className="jumbotron-label-number">{this.state.name.toUpperCase()}</span>
                <span className="jumbotron-label-text"> SEARCH TERM: </span>
                <span className="jumbotron-label-number">{numberOfUCforConsumer + numberOfUCforPro}</span>
                <span
                  className="jumbotron-label-text"> USE CASE{numberOfUCforConsumer + numberOfUCforPro > 1 ? 'S' : ''} FOUND. </span>
                <br/>
                <span className="jumbotron-label-text"> CONSUMER: </span>
                <span className="jumbotron-label-number">{numberOfUCforConsumer}</span>
                <span className="jumbotron-label-text"> PRO: </span>
                <span className="jumbotron-label-number">{numberOfUCforPro}</span>
              </Col>
            </Row>

          ) : this.state.ucInfoObj ? (
            <Row>
              <Col sm="12" md={{size: 10, offset: 1}}>
                <InputGroup size="sm">
                  <Label className="jumbotron-label_mod">USE CASE:</Label>
                  <Input placeholder="" type="text" spellCheck="false"
                         value={this.state.ucInfoObj ? this.state.ucInfoObj.uc : null}
                         className="jumbotron-input_mod jumbotron-input-one_mod shadow-none" id="useCaseInput"/>
                  <Button color="success" size="sm" className="jumbotron-button_mod" outline
                          onClick={this.saveToClipboard("useCaseInput")}>Clipboard!</Button>
                </InputGroup>
                <InputGroup size="sm">
                  <Label className="jumbotron-label_mod">COMMAND TO RUN THIS UC:</Label>
                  <Input placeholder="" type="text" spellCheck="false"
                         value={runUCCommand}
                         className="jumbotron-input_mod jumbotron-input-two_mod shadow-none" id="runThisUCInput"/>
                  <Button color="success" size="sm" className="jumbotron-button_mod" outline
                          onClick={this.saveToClipboard("runThisUCInput")}>Clipboard!</Button>
                </InputGroup>

                <Row>
                  <Col sm="12" md={{size: 10, offset: 1}}>
                    {!this.state.showWholeBase && numberOfUCforConsumer + numberOfUCforPro > 1 ? (
                      <span>
                        <span className="jumbotron-label-text">FOR </span>
                        <span className="jumbotron-label-number">{this.state.name.toUpperCase()}</span>
                        <span className="jumbotron-label-text"> SEARCH TERM: </span>
                      </span>
                    ) : ''
                    }
                    <span className="jumbotron-label-number">{numberOfUCforConsumer + numberOfUCforPro}</span>
                    <span
                      className="jumbotron-label-text"> USE CASE{numberOfUCforConsumer + numberOfUCforPro > 1 ? 'S' : ''} FOUND. </span>
                    <span className="jumbotron-label-text"> CONSUMER: </span>
                    <span className="jumbotron-label-number">{numberOfUCforConsumer}</span>
                    <span className="jumbotron-label-text"> PRO: </span>
                    <span className="jumbotron-label-number">{numberOfUCforPro}</span>
                  </Col>
                </Row>

              </Col>
            </Row>
          ) : null
          }
        </Jumbotron>
        <Container fluid>
          <Form className="form_mod">
            <FormGroup>
              <Row>
                <Col sm="12" md={{size: 12}} className="form-input_mod">
                  <Input type="search" spellCheck="false" value={this.state.name} name="search" id="useCasesSearch"
                         bsSize="lg"
                         placeholder="Type what are you looking for... for example: post video"
                         onChange={this.multipleFuncOnChangeHandler}
                         onKeyPress={this.preventActionHandler}/>
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
                        CONSUMER
                      </Label>
                    </div>
                    <div className="double-pro">
                      <Label check className="input-label_mod">
                        <Input type="checkbox" id="pro-chkbox" className="input-checkbox_mod"
                               defaultChecked={this.state.pro_chkbox} onChange={this.handleChangeProChk}/>{' '}
                        PRO
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                {!this.state.showWholeBase ?
                  (<Col sm="12" md={{size: 6, offset: 3}}>
                    <Button block color="warning" className="form-button_mod" onClick={this.showAllUseCases}>Show All
                      ({this.state.numberOfAllUseCases})
                      Use Cases</Button>
                  </Col>) :

                  (<Col sm="12" md={{size: 6, offset: 3}}>
                    <Button block color="danger" className="form-button_mod" onClick={this.hideAllUseCases}>Hide All Use
                      Cases</Button>
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
