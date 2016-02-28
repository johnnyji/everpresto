import React, {Component, PropTypes} from 'react';
// There seems to be an import error that doesn't allow these to be imported as modules
// directly from `draft-js`, import directly from source for now
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import KeyBindingUtil from 'draft-js/lib/KeyBindingUtil';
import {
  Editor,
  EditorState,
  RichUtils} from 'draft-js';

const {hasCommandModifier} = KeyBindingUtil;
const displayName = 'DraftEditor';
const KEYS = {
  S: 83
};

export default class DraftEditor extends Component {

  static displayName = displayName;

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    spellcheck: PropTypes.bool.isRequired
  };

  static defaultProps = {
    editorState: EditorState.createEmpty(),
    onSave: () => {},
    placeholder: 'You don\'t know the power of the dark side...',
    spellcheck: true
  };

  render() {
    const {
      editorState,
      onEditorStateChange,
      placeholder,
      spellcheck} = this.props;

    return (
      <div onClick={this._handleFocusEditor}>
        <Editor
          editorState={editorState}
          handleKeyCommand={this._handleKeyCommand}
          keyBindingFn={this._getCustomKeyBindings}
          onChange={onEditorStateChange}
          placeholder={placeholder}
          spellcheck={spellcheck}
          ref='editor' />
      </div>
    );
  }

  _getCustomKeyBindings = (event) => {
    // If the user presses the combo of: `cmd + s / ctrl + s`
    if (event.keyCode === KEYS.S && hasCommandModifier(event)) {
      return 'DraftEditor-save';
    }
    // Make sure we fallback to the default key bindings provided
    return getDefaultKeyBinding(event);
  };

  _handleFocusEditor = () => {
    this.refs['editor'].focus();
  };

  _handleKeyCommand = (command) => {
    const {editorState, onEditorStateChange, onSave} = this.props;
    // Custom Command Handlers
    if (command === 'DraftEditor-save') onSave(editorState);

    // Default Command Handlers
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) onEditorStateChange(newEditorState);

    // Must return boolean as to whether the state has changed
    return Boolean(newEditorState);
  };

}