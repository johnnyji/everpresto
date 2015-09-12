import React from 'react';

export default class ContentEditable extends React.Component {
  constructor(props) {
    super(props);
    this._emitChange = this._emitChange.bind(this);
  }
  componentDidMount() {
    React.findDOMNode(this.refs.inputField).innerHTML = this.props.html;
  }
  _emitChange() {
    let input = React.findDOMNode(this.refs.inputField).value;
    this.props.onChange(input);
  }
  render() {
    return (
      <div
        ref='inputField'
        contentEditable
        className={this.props.className}
        onChange={this._emitChange}
        onBlur={this._emitChange}>
      </div>
    );
  }
}

ContentEditable.propTypes = {
  className: React.PropTypes.string,
  html: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};