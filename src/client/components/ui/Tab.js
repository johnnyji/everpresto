import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const className = 'ui-Tab';

export default class Tab extends Component {

  static displayName = 'Tab';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    onTabClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
    text: PropTypes.string
  };

  static defaultProps = {
    active: false
  };

  render() {
    const classes = classNames(
      className,
      {[`${className}-active`]: this.props.active},
      this.props.className,
      {[this.props.activeClassName]: this.props.active && this.props.activeClassName}
    );

    return (
      <button className={classes} onClick={this._handleClick}>
        {this.props.text && this.props.text}
        {this.props.children}
      </button>
    );
  }

  /**
   * Handles the tab click event
   *
   * @return {Null} - If the tab is already active, we short circuit the click handler.
   */
  _handleClick = () => {
    if (this.props.active) return null;
    this.props.onTabClick(this.props.tabIndex);
  }

}