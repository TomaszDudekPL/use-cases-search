import React from 'react';
import {Breadcrumb, Button, Card, CardBody, Col, Collapse, Input, InputGroup, Row} from 'reactstrap';
import Highlighter from 'react-highlight-words';
import BreadcrumbItems from './BreadcrumbItems';
import {saveToClipboard, getUrlToImageInFirebase} from '../helpers/helperFunctions';
import firebase from '@firebase/app';
import '@firebase/storage';

export default class SearchResultItems extends React.Component {

  state = {
    shouldBeOpen: '',
    isOpen: false,
    arrOfAllSteps: []
  };

  onBreadcrumbClickHandler = (uc, arr, describeTag_arr) => async () => {

    console.log('onBreadcrumbClickHandler');

    const arrWithData = arr[0].split(/%5C|%2F/);
    const fileName = arrWithData[2];
    let arrWithCleanSteps = [];
    // const pathToFilePreparedForFirebaseStorage = arrWithData.join('_').toLowerCase();

    // close item if is open
    if (this.state.isOpen) {
      let elem = await document.querySelector('.list-item_mod .show');
      if (elem) await elem.classList.remove('show');
      this.setState({
        isOpen: false
      });
    }

    if (this.state.isOpen === false) {

      let arrWithSteps = [];

      if (describeTag_arr.includes('Step')) {
        arrWithSteps = this.getAllStepsFromFullBase(this.props.consumerBase, this.props.proBase, arr[0]);
      }

      // prepare steps to show in collapse dialog
      if (0 in arrWithSteps) {
        arrWithSteps.forEach(step => {

          // mark step which must be highlighted
          const reg = new RegExp(describeTag_arr);
          if (reg.test(step)) {
            step = step.concat('_XOXO');
          }
          arrWithCleanSteps.push(step.match(/Step.+/gmi, '')[0]);
        });

        // sorting arr for steps. Steps with numeration higher then 9 can not be first in arr but last.
        const reg2 = new RegExp(/ [0-9]of/);
        const newArr1 = [];
        const newArr2 = [];

        arrWithCleanSteps.forEach((step) => {
          if (reg2.test(step)) {
            newArr1.push(step);
          } else {
            newArr2.push(step);
          }
        });

        newArr1.sort();
        newArr2.sort();
        arrWithCleanSteps = [...newArr1, ...newArr2];
      }

    }

    this.getImageFromFirebaseStorage(uc, arrWithData);

    // set: if you clicked different item set uc name in state, if the same then clean state (rerender run onBreadcrumbClickHandler once again and .show class will be removed)
    // set: change isOpen state after each click (rerender) on opposite
    // set: load all steps of clicked item
    await this.setState(() => {
      return {
        shouldBeOpen: uc !== this.state.shouldBeOpen ? uc : '',
        isOpen: !this.state.isOpen,
        arrOfAllSteps: arrWithCleanSteps,
        fileName,
        arrWithData
      };
    });

  };

  getImageFromFirebaseStorage = async (name, arrWithData) => {

    if (!this.state.isOpen && !this.state[name]) {

      console.log('GET STORAGE');

      const urlOfImageInFirebase = getUrlToImageInFirebase(arrWithData, name);
      const storage = firebase.storage();
      const pathReference = storage.refFromURL(urlOfImageInFirebase);

      const firebaseURL = await pathReference.getDownloadURL().then(function(url) {

        return url;

        // Insert url into an <img> tag to "download"
      }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors

        console.log('typeof error.code: ', typeof error.code, JSON.stringify(error.code, null, 4));
      });

      await this.setState({
        [name]: firebaseURL || 'https://firebasestorage.googleapis.com/v0/b/use-cases-search.appspot.com/o/CONSUMER%2FGROUP_ALERTS%2Fgroup_alerts_uc01%2FStep%202of4%20Can%20emojify%20post%20in%20group-alert%20dialog.jpg?alt=media&token=5ba8fd15-357c-4545-9620-ef075f299c18'
      });
    }
  };

  onItemClickedHandler = (arrWithData = []) => {

    let env;

    switch (arrWithData[0]) {
      case 'CONSUMER':
        env = 'master';
        break;
      case 'PRO':
        env = 'master-pro';
        break;
      case 'LIVE':
        env = 'live';
        break;
      default:
        env = 'master';
    }

    let urlToFile = arrWithData.join('/').concat('.js');
    return `node launcher.js --env ${env} -d ${urlToFile}`;
  };

  shouldBeOpen = (key) => {
    if (key === this.state.shouldBeOpen) {
      return 'show';
    }
  };

  showTagIfOpen = (key, describeTag_arr, describeTag_View) => {
    if (key === this.state.shouldBeOpen) {
      return describeTag_arr;
    } else {
      return describeTag_View;
    }
  };

  getAllStepsFromFullBase = (consumerBase, proBase, pathToFile) => {

    let arrWithSteps = [];

    if (pathToFile.includes('CONSUMER')) {
      for (let i = 0; i < consumerBase.length; i++) {
        if (consumerBase[i][0] === pathToFile) {
          // eslint-disable-next-line no-loop-func
          consumerBase[i][1].forEach(arrWithUCWithStepInDescriptor => {
            arrWithSteps.push(arrWithUCWithStepInDescriptor[0]);
          });
          break;
        }
      }
    } else if (pathToFile.includes('PRO')) {
      for (let i = 0; i < proBase.length; i++) {
        if (proBase[i][0] === pathToFile) {
          // eslint-disable-next-line no-loop-func
          proBase[i][1].forEach(arrWithUCWithStepInDescriptor => {
            arrWithSteps.push(arrWithUCWithStepInDescriptor[0]);
          });
          break;
        }
      }
    }

    return arrWithSteps;
  };

  render() {
    let numberOfAllUC = 0;

    this.props.items.forEach(arr => {
      numberOfAllUC += arr[1].length;
    });

    let numberState = numberOfAllUC;
    let wantedWords = this.props.wantedWords;
    let chosenKeyWords = this.props.chosenKeyWords;

    return (this.props.items ? this.props.items.map(arr => {

          return arr[1].map(arrOfUseCaseAndItsSteps => {

            const arrWithStepsOfCurrentUseCase = typeof arrOfUseCaseAndItsSteps[1] !== 'string' ? arrOfUseCaseAndItsSteps[1] : [];
            let uc = arrOfUseCaseAndItsSteps[0];

            // if use case have '!validation;' key words do not show this use case.
            if (!(/!validation;/.test(uc))) {

              uc = uc.charAt(0).toUpperCase() + uc.substring(1) + '.';
              uc = uc.replace(/;/gmi, '.').replace(/\|/gmi, '/');

              // cut into chunks: hash tags, constant keywords, full use case name (with describe Tag name) and use cases without describe tag name.
              let allHashTags = uc.match(/HSH_[a-zA-Z]+.[a-zA-Z]+/gm); // #hashtag1 #hashtag2

              if (allHashTags) {
                allHashTags = allHashTags.map(hashTag => {
                  return hashTag.replace(/HSH_/, '#').replace(/\./, '');
                });
              }

              let allKeyWords = uc.match(/![a-zA-Z0-9-_]+\./gmi); // !keyWord1, !keyWord2.

              if (allKeyWords) {
                allKeyWords = allKeyWords.map(keyWord => {
                  return keyWord.replace(/!/, '').replace(/\./, ',');
                });
              }

              const fullUseCaseName_arr = /It|Step/.test(uc) ? uc.match(/It:.+|Step.+/gmi) : [uc]; // It: something. OR Step 1of5: something OR Step: something
              const str = /It|Step/.test(fullUseCaseName_arr[0]) ? fullUseCaseName_arr[0].replace(/Step [0-9]+of[0-9]+:/, '').replace(/It:/, '').replace(/Step:/, '') : fullUseCaseName_arr[0];
              const describeTag_arr = /It: |Step /.test(uc) ? uc.match(/It:|Step [0-9]+of[0-9]+:/) : ['It:'];
              const describeTag_View = ['UseCase:'];

              const useCaseNameWithoutTag_arr = [];
              useCaseNameWithoutTag_arr.push(str.trim());
              const randomNum = () => Math.floor(Math.random() * 1000);

              return (<Row key={uc + randomNum()}>
                <Col sm="12" md={{size: 12, offset: 0}}>

                  <Breadcrumb className="list-item_mod">

                    <div className="breadcrumb-header" onClick={this.onBreadcrumbClickHandler(uc, arr, describeTag_arr[0])}>

                    <div className="breadcrumb-item-mod">
                      <span className="item-number_mod">{(numberOfAllUC++) - (numberState - 1)}.</span>
                    </div>
                    <div className="use_case-text_mod">
                      <Highlighter
                          className={useCaseNameWithoutTag_arr[0].length > 140 ? 'list-text_mod2' : 'list-text_mod1'}
                          highlightClassName="highlight-describeTag"
                          searchWords={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)}
                          autoEscape={true}
                          textToHighlight={this.showTagIfOpen(uc, describeTag_arr, describeTag_View)[0]}
                      />
                      <Highlighter
                          className={useCaseNameWithoutTag_arr[0].length > 140 ? 'list-text_mod2 font-roboto' : 'list-text_mod1 font-roboto'}
                          highlightClassName="highlight-text"
                          searchWords={wantedWords}
                          autoEscape={true}
                          textToHighlight={useCaseNameWithoutTag_arr[0]}
                      />
                    </div>
                    <div className="item-footer-mod">
                      <div className="hashtags-title-mod">HASHTAGS:
                        {allHashTags ? allHashTags.map(singleTag => {
                          return <span key={singleTag + randomNum()} className="hashtag-item-mod"> {singleTag} </span>;
                        }) : null}
                      </div>

                      <div className="keywords-title-mod">KEY WORDS:
                        {allKeyWords ? allKeyWords.map(singleKeyWord => {
                          return <Highlighter
                              key={singleKeyWord + randomNum()}
                              className="keyword-item-mod"
                              highlightClassName="highlight-text"
                              searchWords={chosenKeyWords ? chosenKeyWords : []}
                              autoEscape={true}
                              textToHighlight={singleKeyWord}
                          />;
                        }) : null}
                      </div>
                    </div>

                    </div>

                    <div className="collapse-card-mod">
                      <Collapse className={this.shouldBeOpen(uc)}>
                        <Card>
                          <CardBody>
                            <BreadcrumbItems arrWithData={this.state.arrWithData}/>

                            <div className="uc-description_and_image-section">

                              <div className="steps-section">
                                {arrWithStepsOfCurrentUseCase.length ? <div className="collapse-steps collapse-descriptors test-description margin-bottom">
                                  {<div className="test-description-title">DESCRIPTION OF THIS TEST (step by step):</div>}
                                  {arrWithStepsOfCurrentUseCase.map(step => {
                                    return (<div key={step} className="collapse-step_mod2">{step}</div>);
                                  })}
                                </div> : null}

                                {this.state.arrOfAllSteps.length ? <div className="collapse-steps collapse-descriptors test-description">
                                  <div className="test-description-title">OTHER USE CASES (tests which are called "Steps") IN FILE {this.state.fileName}.js:</div>
                                  {this.state.arrOfAllSteps.map(step => {
                                    const reg = new RegExp(/_XOXO/);
                                    return <div key={step} className={reg.test(step) ? 'collapse-step_mod1' : 'collapse-step_mod2'}>{step.replace(/_XOXO/, '')}</div>;
                                  })}
                                </div> : null}

                              </div>

                              <div className="use-case-image">
                                {<img src={this.state[uc]} alt="Smiley face" height="500" width="700"/>}
                              </div>

                            </div>

                            <div className="collapse-inputGroup_mod">
                              <InputGroup size="sm">
                                {/*<Label className="jumbotron-label_mod">USE CASE:</Label>*/}
                                <Button color="success"
                                        size="sm"
                                        outline
                                        className="collapse-button_mod"
                                        value={`useCaseInput_${useCaseNameWithoutTag_arr[0]}`}
                                        onClick={saveToClipboard()}>Copy Use Case name</Button>
                                <Input placeholder=""
                                       type="text"
                                       spellCheck="false"
                                       value={useCaseNameWithoutTag_arr[0]}
                                       readOnly
                                       className="collapse-input_mod collapse-input-one_mod shadow-none"
                                       id={`useCaseInput_${useCaseNameWithoutTag_arr[0]}`}/>

                              </InputGroup>

                              <InputGroup size="sm">
                                <Button color="success"
                                        size="sm"
                                        outline
                                        className="collapse-button_mod"
                                        value={`runThisUCInput_${useCaseNameWithoutTag_arr[0]}`}
                                        onClick={saveToClipboard()}>Copy run command</Button>
                                <Input placeholder=""
                                       type="text"
                                       spellCheck="false"
                                       value={this.onItemClickedHandler(this.state.arrWithData, uc)}
                                       readOnly
                                       className="collapse-input_mod collapse-input-two_mod shadow-none"
                                       id={`runThisUCInput_${useCaseNameWithoutTag_arr[0]}`}/>

                              </InputGroup>
                            </div>

                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>

                  </Breadcrumb>

                </Col>
              </Row>);
            }
            return '';
          });
        }) : null

    );
  }
}

