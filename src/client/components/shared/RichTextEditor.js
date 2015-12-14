import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MediumEditor from 'medium-editor';

const displayName = 'RichTextEditor';

export default class RichTextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== findDOMNode(this).innerHTML;
  }

  componentDidMount() {
    const editor = findDOMNode(this);
    const toolbarButtons = ['bold', 'italic', 'underline', 'quote', 'unorderedlist', 'orderedlist'];

    this.medium = new MediumEditor(editor, {
      placeholder: false,
      toolbar: {buttons: toolbarButtons}
    });

    this.medium.subscribe('editableInput', (e, editable) => {
      this._updated = true;
      this._handleUpdate(editable.innerHTML);
    });

    // Does the initial updating.
    this._handleUpdate(editor.innerHTML);
  }

  componentWillReceiveProps(nextProps) {
    const {text} = nextProps;

    if (text !== this.state.text) {
      this.setState({text});
    }

    if (this._updated) this._updated = false;
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const classes = classNames(this.props.className, displayName);

    return (
      <div
        className={classes}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.state.text}}></div>
    );
  }

  _handleUpdate = (text) => {
    this.props.onUpdate(text, findDOMNode(this).innerText);
  }

}