import React from 'react';

export default class ResultItemHeader extends React.Component {

  uc = this.props.uc;
  src = this.props.src;

  render() {

    return (
      <div className="use-case-image">
        {<img src={this.src} alt={this.uc}/>}
      </div>
    )
  }

}