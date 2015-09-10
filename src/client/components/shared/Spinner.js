import React from 'react';

export default class Spinner extends React.Component {
  render() {
    let spinnerMainId = this.props.fullScreen ? 'full-screen-spinner' : '';
    let spinnerRectClass = this.props.fullScreen ? 'spinner-rect' : '';

    if (this.props.fullScreen) {
      return (
        <div className='wave spinner center-spinner' id='full-screen-spinner'>
          <div className='rect1 full-screen-spinner-rect'></div>
          <div className='rect2 full-screen-spinner-rect'></div>
          <div className='rect3 full-screen-spinner-rect'></div>
          <div className='rect4 full-screen-spinner-rect'></div>
          <div className='rect5 full-screen-spinner-rect'></div>
        </div>
      );
    } else {
      return (
        <div className='wave spinner center-spinner'>
          <div className='rect1'></div>
          <div className='rect2'></div>
          <div className='rect3'></div>
          <div className='rect4'></div>
          <div className='rect5'></div>
        </div>
      );
    }
  }
}

Spinner.propTypes = {
  fullScreen: React.PropTypes.bool
};
