import React, {Component, PropTypes} from 'react';
import Icon from '.././ui/Icon';

const displayName = 'ui-SearchBar';

export default class SearchBar extends Component {

  static displayName = displayName;

  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }
  
  render() {
    const {className, onUpdate} = this.props;
    const classes = classNames(className, displayName);
    const searchIconClass = this.state.focused ? 'search-focus' : '';

    return (
      <div className={classes}>
        <Icon icon='search' iconClass={searchIconClass} />
        <input
          className={classes}
          type='text'
          onFocus={this._toggleFocusState}
          onBlur={this._toggleFocusState}
          onChange={(e) => onUpdate(e.target.value)}/>
      </div>
    );
  }

  _toggleFocusState = () => {
    this.setState({focused: !this.state.focused});
  }

}