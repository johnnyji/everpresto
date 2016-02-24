// import React, {Component, PropTypes} from 'react';
// // There seems to be an import error that doesn't allow these to be imported as modules
// // directly from `draft-js`, import directly from source for now
// import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
// import KeyBindingUtil from 'draft-js/lib/KeyBindingUtil';
// import {
//   Editor,
//   EditorState,
//   RichUtils} from 'draft-js';

// const {hasCommandModifier} = KeyBindingUtil;
// const displayName = 'ui-DraftEditor';
// const KEYS = {
//   S: 83
// };

// export default class DraftEditor extends Component {

//   static displayName = displayName;

//   static propTypes = {
//     editorState: PropTypes.map,
//     onEditorStateChange: PropTypes.func.isRequired,
//     onSave: PropTypes.func.isRequired
//   };

//   static defaultProps = {
//     onSave: () => {}
//   };

//   // On initial mount, there will likely be no state (null) passed in,
//   // therefore, we created an empty editor state record and immediately pass it
//   // back to the parent component to keep track of.
//   componentWillMount() {
//     const {editorState, onEditorStateChange} = this.props;
//     if (!this.props.editorState) {
//       return this.props.onEditorStateChange(EditorState.createEmpty())
//     }
//   }

//   render() {
//     return (
//       <div onClick={this._handleFocusEditor}>
//         <Editor
//           editorState={editorState}
//           handleKeyCommand={this._handleKeyCommand}
//           keyBindingFn={this._getCustomKeyBindings}
//           onChange={onEditorStateChange}
//           ref='editor' />
//       </div>
//     );
//   }

//   _getCustomKeyBindings = (event) => {
//     // If the user presses the combo of: `cmd + s / ctrl + s`
//     if (event.keyCode === KEYS.S && hasCommandModifier(event)) {
//       return 'DraftEditor-save';
//     }
//     // Make sure we fallback to the default key bindings provided
//     return getDefaultKeyBinding(event);
//   };

//   _handleFocusEditor = () => {
//     this.refs['editor'].focus();
//   };

//   _handleKeyCommand = (command) => {
//     const {editorState, onEditorStateChange, onSave} = this.props;
//     // Custom Command Handlers
//     if (command === 'DraftEditor-save') onSave(editorState);

//     // Default Command Handlers
//     const newEditorState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) onEditorStateChange(newState);

//     // Must return boolean as to whether the state has changed
//     return Boolean(newState);
//   };

// }