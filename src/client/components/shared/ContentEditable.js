import React from 'react';
import Icon from './Icon';

export default class ContentEditable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this._emitChange = this._emitChange.bind(this);
    this._activateEditingState = this._activateEditingState.bind(this);
  }
  componentDidMount() {
    React.findDOMNode(this.refs.inputField).innerHTML = this.props.html;
  }
  _activateEditingState() {
    this.setState({ editing: true });
  }
  _emitChange() {
    this.setState({ editing: false });

    let input = React.findDOMNode(this.refs.inputField).value;
    this.props.onChange(input);
  }
  render() {
    return ( 
      <div className={`content-editable-wrapper ${this.props.className}`}>
        <div
          ref='inputField'
          contentEditable
          className='content-editable-input'
          onChange={this._emitChange}
          onBlur={this._emitChange}
          onFocus={this._activateEditingState}
        >
        </div>
        {!this.state.editing && <Icon icon='create'/>}
      </div>
    );
  }
}

ContentEditable.propTypes = {
  className: React.PropTypes.string,
  html: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};