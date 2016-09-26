import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from './Card';

const displayName = 'ui-DropdownOptions';

export default class DropdownOptions extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onHideDropdown: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.oneOfType([
          PropTypes.element,
          PropTypes.string
        ]).isRequired,
        callback: PropTypes.func.isRequired
      })
    ).isRequired,
    showDropdownOptions: PropTypes.bool.isRequired
  };

  render() {
    // If `showDropdownOptions` is false, the menu is not shown to begin with.
    if (!this.props.showDropdownOptions) return <div />;

    const classes = classNames(displayName, this.props.className);

    return (
      <Card className={classes}>
        {this._renderOptions()}
      </Card>
    );
  }

  _renderOptions = () => {
    return this.props.options.map((option, i) => {
      return (
        <button
          className={`${displayName}-item`}
          key={i}
          onClick={() => this._handleOptionClick(option.callback)}>
          {option.label}
        </button>
      );
    });
  }

  _handleOptionClick = (cb) => {
    this.props.onHideDropdown();
    cb();
  }

}
