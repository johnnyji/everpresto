import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MediumEditor from 'medium-editor';
import onstop from 'onstop';
import {markCurrentCaretPosition, placeCaretAfterNode} from '../.././utils/TextEditorHelper';
import Config from '../.././config/main';

const {caretMarkerNodeId} = Config.richTextEditor;
const displayName = 'RichTextEditor';

export default class RichTextEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onStopTyping: PropTypes.func,
    onStopTypingTime: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    onStopTypingTime: 400
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
    const {onStopTyping, onStopTypingTime} = this.props;
    const editor = findDOMNode(this);
    const toolbarButtons = ['bold', 'italic', 'underline', 'quote', 'unorderedlist', 'orderedlist'];

    this.medium = new MediumEditor(editor, {
      placeholder: false,
      toolbar: {buttons: toolbarButtons}
    });

    // We call a handle update on all these events because they all potentially
    // can cause the caret position to move
    // TOO SLOW: CANNOT USE.
    
    // this.medium.on(editor, 'click', () => this._handleUpdate(editor.innerHTML));
    // this.medium.on(editor, 'keydown', () => this._handleUpdate(editor.innerHTML));
    // this.medium.on(editor, 'focus', () => this._handleUpdate(editor.innerHTML));

    if (onStopTyping) {
      // No need to manually detach, will do so when the editor is destroyed in `componentWillUnmount`
      this.medium.on(editor, 'keypress', onstop(onStopTypingTime, onStopTyping));
    }

    this.medium.subscribe('editableInput', (event, editable) => {
      this._updated = true;
      this._handleUpdate(editable);
    });

    // Does the initial updating.
    // TODO: Why do we need this?
    // this._handleUpdate(editor.innerHTML);
  }

  componentWillReceiveProps(nextProps) {
    const {text} = nextProps;

    if (text !== this.state.text) this.setState({text});
    if (this._updated) this._updated = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.text.length !== this.props.text.length) {
      // If there's a marker for where the caret should be, place the caret
      // at the position of it's marker
      const caretMarker = document.getElementById(caretMarkerNodeId);
      if (caretMarker) placeCaretAfterNode(caretMarker);
    }
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
        dangerouslySetInnerHTML={{__html: this.state.text}}/>
    );
  }

  _handleUpdate = (ele) => {
    // Marks the current caret position in the HTML text so we can
    // later place the caret there if needed
    const textWithCaretPosMarked = markCurrentCaretPosition(ele);
    this.props.onUpdate(textWithCaretPosMarked);
  }

}