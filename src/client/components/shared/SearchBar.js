import React from 'react';
import Icon from './Icon';

export default class SearchBar extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { focus: false };
    this._onInputChange = this._onInputChange.bind(this);
    this._toggleFocusState = this._toggleFocusState.bind(this);
  }
  _toggleFocusState() {
    this.setState({ focus: !this.state.focus });
  }
  _onInputChange(e) {
    this.props.onInputChange(e.target.value);
  }
  render() {
    let searchIconClass = this.state.focus ? 'search-focus' : '';

    return (
      <div className='search-bar-wrapper'>
        <Icon icon='search' iconClass={searchIconClass} />
        <input 
          {...this.props} 
          type='text'
          onFocus={this._toggleFocusState}
          onBlur={this._toggleFocusState}
          onChange={this._onInputChange}></input>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onInputChange: React.PropTypes.func.isRequired
};