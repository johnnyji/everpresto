import React, {PropTypes} from 'react';

export default class Spinner extends React.Component {

  static propTypes = {
    fullScreen: PropTypes.bool,
    quote: PropTypes.string
  }

  static defaultProps = {
    defaultQuotes: [
      'Money isn\'t important, but having it, that\'s a different question.',
      'What do you call it when Batman skips church? Christian Bail.',
      '3 A.M. Phone Calls: "Are you asleep?", Me: "No I\'m skydiving..."',
      'Laughter is the best medicine, but if you\'re laughing for no reason, you probably need medicine.',
      'Knowledge is knowing tomatos are a fruit. Wisdom is knowing not to put tomatos in a fruit salad.'
    ]
  };

  render() {
    const quote = this.props.quote || this.props.defaultQuotes[Math.floor(Math.random() * this.props.defaultQuotes.length)];
    const spinnerMainId = this.props.fullScreen ? 'full-screen-spinner' : '';
    const spinnerRectClass = this.props.fullScreen ? 'spinner-rect' : '';

    if (this.props.fullScreen) {
      return (
        <div className='full-screen-spinner-wrapper'>
          <div className='wave spinner center-spinner' id='full-screen-spinner'>
            <div className='rect1 full-screen-spinner-rect'></div>
            <div className='rect2 full-screen-spinner-rect'></div>
            <div className='rect3 full-screen-spinner-rect'></div>
            <div className='rect4 full-screen-spinner-rect'></div>
            <div className='rect5 full-screen-spinner-rect'></div>
          </div>
          <h2 className='quote'>{quote}</h2>
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