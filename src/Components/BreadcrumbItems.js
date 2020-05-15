import React from 'react';
import {randomNum} from '../helpers/helperFunctions';

export default class BreadcrumbItems extends React.Component {

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  mainDirectory = this.props.mainDirectory;
  fileName = this.props.fileName;
  env = this.props.env;
  useCaseID = this.props.useCaseID;

  render() {

    return (

      <div>
        <div key={this.useCaseID + randomNum()} className="breadcrumb-link_mod">ENV:<span
          className="environment_mod">{this.env}</span></div>

        <div key={this.useCaseID + randomNum()} className="breadcrumb-link_mod jenkins-label_mod">JOB ON JENKINS:
          <a target="_blank"
             rel="noopener noreferrer"
             className="jenkins-link_mod"
             onClick={this.stopPropagation}
             href={this.mainDirectory[1]}
          >{this.mainDirectory[0]}
          </a>
        </div>

        <div key={this.useCaseID + randomNum()} className="breadcrumb-link_mod github-label_mod">FILE ON GITHUB:
          <a target="_blank"
             rel="noopener noreferrer"
             className="github-link_mod"
             onClick={this.stopPropagation}
             href={this.fileName[1]}>{this.fileName[0]}</a>
        </div>

      </div>
    )
  }
}


