import React from 'react';
import ReactQuill from 'react-quill';
import { Toolbar } from 'react-quill';
import Dropzone from 'react-dropzone';
import ReactTemplate from '../.././shared/ReactTemplate';

import NoteForm from '../.././notes/NoteForm';
import ExitFormIcon from '../.././shared/ExitFormIcon';
import BlendedInputField from '../.././shared/BlendedInputField';


import AppActions from '../../.././actions/AppActions';

export default class NewArticleForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_handleFileUpload',
      '_handleTitleChange',
      '_handleDescriptionChange',
      '_exitForm'
    );
  }
  _handleTitleChange(title) {
    console.log('Title: ', title);
  }
  _handleDescriptionChange(description) {
    console.log('Desciption: ', description);
    // update the description of the new article
  }
  _handleFileUpload(file) {
    console.log('File: ', file)
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  render() {

    return (
      <div className='new-article-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />

        <NoteForm
          onTitleChange={this._handleTitleChange}
          onDescriptionChange={this._handleDescriptionChange}
        />

        <Dropzone
          className='dropzone'
          onDrop={this._handleFileUpload}
          multiple={true}>
          <p>Drag files here to upload</p>
        </Dropzone>
      </div>
    );
  }
}

NewArticleForm.propTypes = {
  contacts: React.PropTypes.array
};