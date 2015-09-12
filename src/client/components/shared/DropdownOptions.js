import React from 'react';
import _ from 'lodash';

export default class DropdownOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let options = _.map(this.props.options, (option, i) => {
      return <li key={i} onClick={option.action}>{option.name}</li>;
    });

    if (!this.props.showOptions) return <div />;

    return (
      <ul 
        className='dropdown-options'
        onMouseEnter={this.props.onEnter}
        onMouseLeave={this.props.onLeave}>
        {options}
      </ul>
    );
  }
}

// options: [{ name: 'View Profile', action: someCallbackFunction }, { ... }]

DropdownOptions.propTypes = {
  onEnter: React.PropTypes.func.isRequired,
  onLeave: React.PropTypes.func.isRequired,
  showOptions: React.PropTypes.bool.isRequired,
  options: React.PropTypes.array.isRequired
};