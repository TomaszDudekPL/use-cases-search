import React from 'react';

export default class ResultItemHeader extends React.Component {

  uc = this.props.uc;
  src = this.props.src;

  render() {
console.log('typeof this.src: ', typeof this.src, JSON.stringify(this.src, null, 4));
    return (
      <div className="use-case-image">
        {<img src={this.src} alt={this.uc}/>}
      </div>
    )
  }

}