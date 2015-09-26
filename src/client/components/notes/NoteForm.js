import React from 'react';
import ReactQuill, { Toolbar } from 'react-quill';
import ReactTemplate from '.././shared/ReactTemplate';

import BlendedInputField from '.././shared/BlendedInputField';

export default class NoteForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_handleTitleChange',
      '_handleDescriptionChange',
      '_showPlaceholder'
    );
  }
  componentDidMount() {
    this._showPlaceholder();
  }
  _handleTitleChange(e) {
    this.props.onTitleChange(e.target.value);
  }
  _handleDescriptionChange(description) {
    let descriptionIsEmpty = description === '<div><br></div>';

    if (descriptionIsEmpty) this._showPlaceholder();
    // update the description of the new article
    this.props.onDescriptionChange(description);
  }
  _showPlaceholder() {
    let editor = this.refs.quill.refs.editor.getDOMNode();
    editor.firstChild.innerHTML = ''; 
  }
  render() {
    let editorStyles = {
      '.ql-editor': {
        'font-size': '18px',
        'min-height': '200px'
      },
      '.quill-contents': {
        'padding': '0.3rem'
      },
      '.quill-toolbar': {
        'padding': '0.3rem',
        'margin-bottom': '0.5rem'
      }
    };

    return (
      <div className='note-form-wrapper'>
        <ReactQuill 
          ref='quill'
          theme='snow'
          styles={editorStyles}
          onChange={this._handleDescriptionChange}>
          <Toolbar
            theme='snow'
            ref='toolbar'
            value='toolbar'
            items={Toolbar.defaultItems}
          />
          <BlendedInputField
            placeholder='Untitled'
            type='text'
            className='note-title'
            onChange={this._handleTitleChange}
          />
          <div
            key='editor'
            ref='editor'
            className='quill-contents'
          ></div>
        </ReactQuill>
      </div>
    );
  }
}

NoteForm.propTypes = {
  onTitleChange: React.PropTypes.func.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired
};