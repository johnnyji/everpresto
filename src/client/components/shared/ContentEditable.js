import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export default class ContentEditable extends React.Component {

  static propTypes = {
    contentEditableClass: PropTypes.string,
    html: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  componentDidMount() {
    // Sets the contents of the content editable field to the
    // inital HTML text if one is provided.
    if (this.props.html) this.refs.inputField.innerHTML = this.props.html;
  }

  _activateEditingState = () => {
    this.setState({editing: true});
  }

  _emitChange = () => {
    this.setState({editing: false});

    const input = React.findDOMNode(this.refs.inputField).value;
    this.props.onChange(input);
  }

  render() {
    const classes = classNames('content-editable', this.props.contentEditableClass);

    return ( 
      <div className={classes}>
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