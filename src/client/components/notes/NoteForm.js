import React from 'react';
import ReactQuill, {Toolbar} from 'react-quill';

import BlendedInputField from '.././shared/BlendedInputField';

export default class NoteForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._showPlaceholder();
  }

  _handleTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  }

  _handleDescriptionChange = (description) => {
    if (description === '<div><br></div>') this._showPlaceholder();
    // update the description of the new article
    this.props.onDescriptionChange(description);
  }

  _showPlaceholder = () => {
    const editor = this.refs.quill.refs.editor;
    editor.firstChild.innerHTML = '';
  }

  render() {
    return (
      <div className='note-form-wrapper'>
        <ReactQuill 
          ref='quill'
          theme='snow'
          onChange={this._handleDescriptionChange}>
          <Toolbar
            theme='snow'
            key='toolbar'
            ref='toolbar'
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