import React from 'react';

export default class Spinner extends React.Component {
  render() {
    let spinnerClass = this.props.fullScreen
      ? 'wave spinner center-spinner'
      : 'wave spinner center-spinner full-screen';

    return (
      <div className={spinnerClass}>
        <div className='rect1'></div>
        <div className='rect2'></div>
        <div className='rect3'></div>
        <div className='rect4'></div>
        <div className='rect5'></div>
      </div>
    );
  }
}

Spinner.propTypes = {
  fullScreen: React.PropTypes.bool
};
