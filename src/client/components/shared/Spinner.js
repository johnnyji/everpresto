import React from 'react';

export default class Spinner extends React.Component {
  render() {
    let p = this.props;
    let spinnerMainId = p.fullScreen ? 'full-screen-spinner' : '';
    let spinnerRectClass = p.fullScreen ? 'spinner-rect' : '';

    if (p.fullScreen) {
      let quote = p.quote || p.defaultQuotes[Math.floor(Math.random() * p.defaultQuotes.length)];
      return (
        <div className='spinner-wrapper'>
          <div className='wave spinner center-spinner' id='full-screen-spinner'>
            <div className='rect1 full-screen-spinner-rect'></div>
            <div className='rect2 full-screen-spinner-rect'></div>
            <div className='rect3 full-screen-spinner-rect'></div>
            <div className='rect4 full-screen-spinner-rect'></div>
            <div className='rect5 full-screen-spinner-rect'></div>
          </div>
          <h3 className='quote'>{quote}</h3>
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
  fullScreen: React.PropTypes.bool,
  quote: React.PropTypes.string
};

Spinner.defaultProps = {
  defaultQuotes: [
    "Money isn't important, but having it, that's a different question."
  ]
};
