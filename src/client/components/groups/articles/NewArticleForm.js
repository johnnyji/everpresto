import React from 'react';
import _ from 'lodash';
import ReactQuill from 'react-quill';
import { Toolbar } from 'react-quill';
import Dropzone from 'react-dropzone';
import ReactTemplate from '../.././shared/ReactTemplate';

import NoteForm from '../.././notes/NoteForm';

import FileUploader from '../.././shared/FileUploader';
import ExitFormIcon from '../.././shared/ExitFormIcon';
import BlendedInputField from '../.././shared/BlendedInputField';

import AppActions from '../../.././actions/AppActions';

export default class NewArticleForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_handleUpdateFileUploads',
      '_handleTitleChange',
      '_handleDescriptionChange',
      '_exitForm'
    );
  }
  _getInitialState() {
    return {
      files: []
    };
  }
  _handleTitleChange(title) {
    console.log('Title: ', title);
  }
  _handleDescriptionChange(description) {
    console.log('Desciption: ', description);
    // update the description of the new article
  }
  _handleUpdateFileUploads(files) {
    this.setState(files);
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  render() {
    let s = this.state;

    return (
      <div className='new-article-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
        <NoteForm
          onTitleChange={this._handleTitleChange}
          onDescriptionChange={this._handleDescriptionChange}
        />
        <FileUploader
          files={s.files}
          onUpdateFiles={this._handleUpdateFileUploads}
        />
      </div>
    );
  }
}

NewArticleForm.propTypes = {
  contacts: React.PropTypes.array
};