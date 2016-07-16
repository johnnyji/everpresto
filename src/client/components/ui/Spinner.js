import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const CLS = 'ui-Spinner';

export default class Spinner extends Component {

  static displayName = CLS;

  static propTypes = {
    className: PropTypes.string,
    fullScreen: PropTypes.bool.isRequired
  };

  static defaultProps = {
    fullScreen: false
  };

  render() {
    if (this.props.fullScreen) {

      return (
        <div className={`${CLS}-full-page`}>
          {this._renderSpinner()}
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
