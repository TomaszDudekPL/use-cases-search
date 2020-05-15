import React from 'react';
import {Breadcrumb, Card, CardBody, Col, Collapse, Row} from 'reactstrap';
import BreadcrumbItems from './BreadcrumbItems';
import ResultItemFooter from './ResultItemFooter';
import ResultItemHeader from './ResultItemHeader';
import ResultItemStepsSection from './ResultItemStepsSection';
import firebase from '@firebase/app';
import '@firebase/storage';

export default class SearchResultItems extends React.Component {

  state = {
    shouldBeOpen: '',
    isOpen: false,
    arrOfAllSteps: []
  };

  onBreadcrumbClickHandler = (uc, directoryPath, describeTag_arr, image_url) => async () => {

    console.log('onBreadcrumbClickHandler');

    const arrWithData = directoryPath.split(/%5C|%2F/);
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
        arrWithSteps = this.getAllStepsFromFullBase(this.props.consumerBase, this.props.proBase, directoryPath);
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

    this.getImageFromFirebaseStorage(uc, image_url);

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

  getImageFromFirebaseStorage = async (name, image_url) => {

    console.log('typeof image_url: ', typeof image_url, JSON.stringify(image_url, null, 4));

    if (!this.state.isOpen && !this.state[name]) {

      console.log('GET STORAGE');
      const storage = firebase.storage();
      const pathReference = storage.refFromURL(image_url);
      const firebaseURL = await pathReference.getDownloadURL().then(function (url) {

        return url;

        // Insert url into an <img> tag to "download"
      }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors

        console.log('typeof error.code: ', typeof error.code, JSON.stringify(error.code, null, 4));
      });

      await this.setState({
        [name]: firebaseURL || 'https://firebasestorage.googleapis.com/v0/b/use-cases-search.appspot.com/o/greta.jpg?alt=media&token=23552523-53c9-418c-a9dd-a7887cd46236'
      });
    }
  };

  shouldBeOpen = (key) => {
    if (key === this.state.shouldBeOpen) {
      return 'show';
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

  classesForSteps = (step) => {

    let classStr = '';

    if (step.includes('BEFORE:')) classStr = 'before-class';
    if (step.includes('STEP ')) classStr = 'step-class';
    if (step.includes('END:')) classStr = 'end-class';
    if (step.includes('ASSERT:')) classStr = 'assert-class';

    return `collapse-step_mod2 ${classStr}`;

  };

  render() {

    return (this.props.searchResult_arr && this.props.searchResult_arr.map(arr => {

        return (

          <Row key={arr[0]}>
            <Col sm="12" md={{size: 12, offset: 0}}>

              <Breadcrumb className="list-item_mod">

                <ResultItemHeader
                  uc={arr[1].useCaseBody}
                  useCaseID={arr[1].useCaseID}
                  hashTags={arr[1].hashTags}
                  keyWords={arr[1].keyWords}
                  describeTag={arr[1].describeTag}
                  image_url={arr[1].image_url}
                  directoryPath={arr[1].directoryPath}
                  wantedWords={this.props.wantedWords}
                  chosenKeyWords={this.props.chosenKeyWords}
                  ordinalNumber={arr[1].ordinalNumber}
                  onBreadcrumbClickHandler={this.onBreadcrumbClickHandler}/>

                <div className="collapse-card-mod">
                  <Collapse className={this.shouldBeOpen(arr[1].useCaseBody)}>
                    <Card>
                      <CardBody>
                        <BreadcrumbItems
                          useCaseID={arr[1].useCaseID}
                          mainDirectory={arr[1].mainDirectory}
                          fileName={arr[1].fileName}
                          env={arr[1].env}
                        />

                        <div className="uc-description_and_image-section">
                          <ResultItemStepsSection steps={arr[1].steps}
                                                  classesForSteps={this.classesForSteps}/>

                          <div className="use-case-image">
                            {<img src={this.state[arr[1].useCaseBody]} alt={arr[1].useCaseBody}/>}
                          </div>

                        </div>

                        <ResultItemFooter
                          arrWithData={this.state.arrWithData}
                          uc={arr[1].useCaseBody}
                          useCaseID={arr[1].useCaseID}
                          runCommand={arr[1].runCommand}
                        />

                      </CardBody>
                    </Card>
                  </Collapse>
                </div>

              </Breadcrumb>

            </Col>
          </Row>
        );
      })
    );

  }
};

