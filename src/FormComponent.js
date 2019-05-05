import React from 'react';
import {Button, Col, Row, Container, Form, FormGroup, Input, Jumbotron, InputGroup} from 'reactstrap';
import SearchResultItems from "./SearchResultItems";
import * as firebase from "firebase/app";
import "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ_b4I7T3sJANfHxuBmBVT7tjdbJ11ons",
  authDomain: "use-cases-search.firebaseapp.com",
  databaseURL: "https://use-cases-search.firebaseio.com",
  projectId: "use-cases-search",
  storageBucket: "use-cases-search.appspot.com",
  messagingSenderId: "970010596588"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class FormComponent extends React.Component {

  state = {
    initialState: null,
    items: [],
    base: null,
    showWholeBase: false,
    name: '',
    numberOfAllUseCases: 0,
    wantedWords: [],
    ucInfoObj: null
  };

  changeBaseToProperForm(val) {
    let number = 0;
    let entries = Object.entries(val);
    entries.forEach(function (arr) {
      arr[1] = Object.keys(arr[1]);
      number += arr[1].length
    });
    this.setState({
      base: entries,
      showWholeBase: false,
      numberOfAllUseCases: number
    })
  }

  showAllUseCases = () => {
    this.setState({
      items: this.state.base,
      showWholeBase: !this.state.showWholeBase,
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

  filterList = (event) => {

    let updatedList = [];
    let base = this.state.base;
    let ucArr = new Set();
    let wantedValue;

    let removeSpacesFunc = (word) => word ? word.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ") : null;
    let getLowerCaseFunc = (character) => character.toLowerCase();

    let arrOfKeyWords = event.target.value.split(' ');
    arrOfKeyWords = arrOfKeyWords.filter(function (el) {
      return el !== null && el !== "";
    });


    console.log('a1');
    console.log('!arrOfKeyWords.length: ', !arrOfKeyWords.length);


    if (!this.state.items.length || arrOfKeyWords.length === 1) {

      console.log('pierwszy przypadek');

      this.setState({
        name: event.value,
        showWholeBase: false
      });

      console.log('event.target.value.length: ', event.target.value.length);

      if (event.target.value.length >= 3) {

        updatedList = [];

        console.log('event.target.value.length------- wszedłem tu');

        base.forEach(arrOfUC => {

          arrOfUC[1].forEach(uc => {

            uc = getLowerCaseFunc(uc);
            wantedValue = getLowerCaseFunc(event.target.value);
            wantedValue = removeSpacesFunc(wantedValue);

            if (uc.search(wantedValue) !== -1) ucArr.add(uc);

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

      // Experimental searching. It still does not work correctly.  Lines: 121 to 199

    } else if (/\s+/.test(event.target.value)) {
      console.log('drugi przypadek');
      console.log('arrOfKeyWords: ', arrOfKeyWords);

      let firstKeyWord = removeSpacesFunc(arrOfKeyWords[0]);
      let secondKeyWord = removeSpacesFunc(arrOfKeyWords[1]);
      let thirdKeyWord = removeSpacesFunc(arrOfKeyWords[2]);

      let wantedWords = [];

      wantedWords.push(firstKeyWord);
      if (secondKeyWord.length > 2) wantedWords.push(secondKeyWord);
      if (secondKeyWord.length > 2) wantedWords.push(secondKeyWord);

      console.log('firstKeyWord: ', firstKeyWord);
      console.log('secondKeyWord: ', secondKeyWord);
      console.log('thirdKeyWord: ', thirdKeyWord);

      if (secondKeyWord || thirdKeyWord) {

        let base = this.state.base;
        let updatedList = [];
        let ucArr = new Set();

        base.forEach(arrOfUC => {

          arrOfUC[1].forEach(
            function (uc) {

              if (uc.search(firstKeyWord) !== -1) {
                if (!arrOfKeyWords[1]) {
                  ucArr.add(uc);
                }
                if (arrOfKeyWords[1]) {
                  if (uc.search(secondKeyWord) !== -1) {
                    if (!arrOfKeyWords[2]) {
                      ucArr.add(uc);
                    }
                  }
                  if (arrOfKeyWords[2]) {
                    if (uc.search(thirdKeyWord) !== -1) {
                      ucArr.add(uc);
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
    console.log('a3');
  };

  preventActionHandler = (event) => {
    let charCode = event.charCode;
    if (charCode === 13) {
      event.preventDefault();
    }
  };

  componentDidMount() {
    firebase.database().ref('/').once('value').then(snapshot => {
        this.changeBaseToProperForm(snapshot.val())
      }
    )
  }

  onItemClicked = (ucInfoObj) => {
    this.setState({
      ucInfoObj: ucInfoObj
    })
  };


  render() {
    return (
      <div className="main-label">
        <Container fluid>
          <Row>
            <Col sm="12" md={{size: 12, offset: 0}}>
              <Jumbotron fluid className="jumbotron_mod">
                <h1 className="display-7 form-mainLabel_mod">USE CASES SEARCH</h1>
                <p className="lead">
                  <div id="hideMessage"></div>
                </p>
                <Row>
                  <Col>
                    <InputGroup size="sm">
                <Input placeholder="" value={this.state.ucInfoObj? this.state.ucInfoObj.uc: ''} className="jumbotron-input_mod" />
                  <Button color="success" size="sm" className="jumbotron-button_mod" outline >Clipboard!</Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>

          <Form>
            <FormGroup>
              <Row>
                <Col sm="12" md={{size: 12}} className="form-input_mod">
                  <Input type="search" spellcheck="false" value={this.state.name} name="search" id="useCasesSearch" bsSize="lg"
                         placeholder="Type what are you looking for... for example: post or chat"
                         onChange={this.filterList}
                         onKeyPress={this.preventActionHandler}/>
                </Col>
              </Row>
              <Row>
                {!this.state.showWholeBase ?
                  (<Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Button block color="warning" className="form-button_mod" onClick={this.showAllUseCases}>Show All
                      ({this.state.numberOfAllUseCases})
                      Use Cases</Button>
                  </Col>) :

                  (<Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Button block color="danger" className="form-button_mod" onClick={this.hideAllUseCases}>Hide All Use Cases</Button>
                  </Col>)
                }
              </Row>
              <Row>
                <Col sm="12" md={{size: 12, offset: 0}}>
                  <SearchResultItems items={this.state.items} wantedWords={this.state.wantedWords}
                                     itemClicked={this.onItemClicked}>.</SearchResultItems>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
