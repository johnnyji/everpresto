import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Spinner extends Component {

  static displayName = 'Spinner';

  static propTypes = {
    className: PropTypes.string,
    defaultQuotes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fullScreen: PropTypes.bool.isRequired,
    quote: PropTypes.string
  };

  static defaultProps = {
    defaultQuotes: [
      'Money isn\'t important, but having it, that\'s a different question.',
      'What do you call it when Batman skips church? Christian Bail.',
      '3 A.M. Phone Calls: "Are you asleep?", Me: "No I\'m skydiving..."',
      'Laughter is the best medicine, but if you\'re laughing for no reason, you probably need medicine.',
      'Knowledge is knowing tomatos are a fruit. Wisdom is knowing not to put tomatos in a fruit salad.'
    ],
    fullScreen: false
  };

  render() {
    const classes = classNames(
      'wave spinner center-spinner',
      this.props.className
    );

    if (this.props.fullScreen) {
      const {quote, defaultQuotes} = this.props;
      const spinnerQuote = quote || defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
      return (
        <div className='full-screen-spinner'>
          <div className={classes} id='full-screen-spinner'>
            <div className='rect1 full-screen-spinner-rect'></div>
            <div className='rect2 full-screen-spinner-rect'></div>
            <div className='rect3 full-screen-spinner-rect'></div>
            <div className='rect4 full-screen-spinner-rect'></div>
            <div className='rect5 full-screen-spinner-rect'></div>
          </div>
          <h2 className='full-screen-spinner-quote'>{spinnerQuote}</h2>
        </div>
      );
    } else {
      return (
        <div className={classes}>
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