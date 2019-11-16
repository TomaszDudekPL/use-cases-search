import React from 'react';
import {returnLinkToJenkinsJob} from '../helpers/helperFunctions';

export default class BreadcrumbItems extends React.Component {

  arrWithData;

  constructor(props) {
    super(props);
    const arrWithData = this.props.arrWithData;
    this.state = {
      arrWithData: arrWithData
    }
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  render() {

    return (
      this.state.arrWithData ? this.state.arrWithData.map((data, index, arr) => {
          return (
            (index === 1) ?

              <div key={data} className="breadcrumb-link_mod jenkins-label_mod">JOB ON JENKINS:
                <a target="_blank"
                   rel="noopener noreferrer"
                   className="jenkins-link_mod"
                   onClick={this.stopPropagation}
                   href={returnLinkToJenkinsJob(data, arr)}
                >{data}
                </a>
              </div> : (index === this.state.arrWithData.length - 1) ?
              <div key={data} className="breadcrumb-link_mod github-label_mod">FILE ON GITHUB:
                <a target="_blank"
                   rel="noopener noreferrer"
                   className="github-link_mod"
                   onClick={this.stopPropagation}
                   href={"https://github.com/sgrouples/Frontend-E2E-Tests/blob/master/test/specs/" + this.state.arrWithData.join('/') + '.js'}>{data + '.js'}</a>
              </div> : (index === 0) ?
                <div className="breadcrumb-link_mod">ENV:<span className="environment_mod">{data}</span></div> : null

          )
        }
      ) : null)
  }
}


