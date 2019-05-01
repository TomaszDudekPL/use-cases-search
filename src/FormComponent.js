import React from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
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
    name: ''
  };

  changeBaseToProperForm(val) {
    let entries = Object.entries(val);
    entries.forEach(function (arr) {
      arr[1] = Object.keys(arr[1]);
    });
    this.setState({
      base: entries,
      showWholeBase: false
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
    this.setState({
      name: event.value,
      showWholeBase: false
    });
    if (event.target.value.length > 3) {
      let base = this.state.base;
      let updatedList = [];
      let ucArr = new Set();
      base.forEach(arrOfUC => {
        arrOfUC[1].forEach(
          function (uc) {
            if (uc.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
              ucArr.add(uc);
            }
          });
        if (ucArr.size) {
          updatedList.push([arrOfUC[0], [...ucArr]]);
        }
        ucArr = new Set();
      });

      this.setState({
        items: updatedList
      });
    } else {
      this.setState({
        items: []
      });
    }
  };

  preventActionHandler = (event) => {
    let charCode = event.charCode;
    if (charCode === 13) {
      event.preventDefault();
    }
  };

  componentDidMount() {
    firebase.database().ref('/').on('value',
      snapshot => this.changeBaseToProperForm(snapshot.val())
    )
  }


  render() {
    return (
      <div className="main-label">
        <Label for="search" className="form-mainLabel_mod">USE CASES SEARCH</Label>
        <Form>
          <FormGroup>
            <Container>
              <Row>
                <Col sm="12" md={{size: 12}} className="form-input_mod">
                  <Input type="search" value={this.state.name} name="search" id="useCasesSearch" bsSize="lg"
                         placeholder="Type what are you looking for... for example: post or chat" onChange={this.filterList}
                         onKeyPress={this.preventActionHandler}/>
                </Col>
                { !this.state.showWholeBase ?
                  (<Col sm="12" md={{size: 4, offset: 4}} className="form-button_mod">
                  <Button color="warning" onClick={this.showAllUseCases}>Show All Use Cases</Button>
                </Col>):

                  (<Col sm="12" md={{size: 4, offset: 4}} className="form-button_mod">
                  <Button color="danger" onClick={this.hideAllUseCases}>Hide All Use Cases</Button>
                </Col>)
                }
              </Row>
              <Row>
                <Col sm="12" md={{size: 12, offset: 0}}>
                  <SearchResultItems items={this.state.items}>.</SearchResultItems>
                </Col>
              </Row>
            </Container>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
