import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const CLS = 'Spinner';

export default class Spinner extends Component {

  static displayName = CLS;

  static propTypes = {
    className: PropTypes.string,
    defaultQuotes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fullScreen: PropTypes.bool.isRequired,
    quote: PropTypes.string
  };

  static defaultProps = {
    defaultQuotes: [
      'Money isn\'t important. But having it... that\'s a different question.',
      'What do you call it when Batman skips church? Christian Bail.',
      '3 A.M. Phone Calls: "Are you asleep?", Me: "No I\'m skydiving..."',
      'Laughter is the best medicine, but if you\'re laughing for no reason, you probably need medicine.',
      'Knowledge is knowing tomatos are a fruit. Wisdom is knowing not to put tomatos in a fruit salad.'
    ],
    fullScreen: false
  };

  render() {
    if (this.props.fullScreen) {
      const {quote, defaultQuotes} = this.props;
      const spinnerQuote = quote || defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
      return (
        <div className={`${CLS}-full-page`}>
          <div className={`${CLS}-full-page-content`}>
            {this._renderSpinner()}
            <h2 className={`${CLS}-full-page-content-quote`}>{spinnerQuote}</h2>
          </div>
        </div>
      );
    }
    
    return this._renderSpinner();
  }

  _renderSpinner = () => {
    const classes = classNames(
      'wave',
      'spinner',
      `${CLS}-center`,
      this.props.className
    );

    return (
      <div className={classes}>
        <div className='rect1'></div>
        <div className='rect2'></div>
        <div className='rect3'></div>
        <div className='rect4'></div>
        <div className='rect5'></div>
      </div>
    );
  };

}
