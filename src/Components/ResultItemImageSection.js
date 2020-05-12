import React from 'react';

export default class ResultItemHeader extends React.Component {

  render() {

    const uc = this.props.uc;
    const src = this.props.src;

    return (
      <div className="use-case-image">
        {<img src={src} alt={uc}/>}
      </div>
    )
  }

}