import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class DropdownOptions extends Component {

  static propTypes = {
    dropdownOptionsClassName: PropTypes.string,
    onShowOptions: PropTypes.func.isRequired,
    onHideOptions: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired
      })
    ).isRequired,
    showDropdownOptions: PropTypes.bool.isRequired
  };

  render() {
    // If showDropdownOptions is false, the menu is not shown to begin with.
    if (!this.props.showDropdownOptions) return <div/>;

    const dropdownOptionsClasses = classNames('dropdown-options', this.props.dropdownOptionsClassName);
    const options = this.props.options.map((option, i) => {
      return (
        <li
          className='dropdown-options-item'
          key={i}
          onClick={option.callback}>
          {option.name}
        </li>
      );
    });

    return (
      <ul 
        className={dropdownOptionsClasses}
        onMouseEnter={this.props.onShowOptions}
        onMouseLeave={this.props.onHideOptions}>
        {options}
      </ul>
    );
  }

}