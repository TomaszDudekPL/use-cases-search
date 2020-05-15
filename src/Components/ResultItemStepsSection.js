import React from 'react';
import {randomNum} from '../helpers/helperFunctions';

export default class ResultItemHeader extends React.Component {

  steps = this.props.steps;
  classesForSteps = this.props.classesForSteps;

  render() {

    return (
      <div className="steps-section">
        {this.steps.length ?
          <div className="collapse-steps collapse-descriptors test-description margin-bottom">
            {<div className="test-description-title">TEST DESCRIPTION</div>}
            {this.steps.map(step => {
              return (<div key={step + String(randomNum())}
                           className={this.classesForSteps(step)}>{step}</div>);
            })}
          </div> : null}

        {/*{this.state.arrOfAllSteps.length ? <div className="collapse-steps collapse-descriptors test-description">*/}
        {/*  <div className="test-description-title">OTHER USE CASES (tests which are called "Steps") IN FILE {this.state.fileName}.js:</div>*/}
        {/*  {this.state.arrOfAllSteps.map(step => {*/}
        {/*    const reg = new RegExp(/_XOXO/);*/}
        {/*    return <div key={step} className={reg.test(step) ? 'collapse-step_mod1' : 'collapse-step_mod2'}>{step.replace(/_XOXO/, '')}</div>;*/}
        {/*  })}*/}
        {/*</div> : null}*/}

      </div>
    )
  }
}