import React, {Component, PropTypes} from 'react';

import NoteForm from '.././notes/NoteForm';

import FileUploader from '.././shared/FileUploader';
import ExitFormIcon from '.././shared/ExitFormIcon';
import Icon from '.././ui/Icon';
import Button from '.././ui/Button';
import Spinner from '.././ui/Spinner';

import NewNoteActions from '../.././actions/NewNoteActions';
import AppActions from '../.././actions/AppActions';
import NewNoteStore from '../.././stores/NewNoteStore';

export default class NewNoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidMount() {
    this._unsubscribe = NewNoteStore.listen(this._updateState);
    NewNoteActions.setUserId(this.props.currentUser._id);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _updateState(state) {
    this.setState({
      note: state.note,
      errors: state.errors,
      submitting: state.submitting
    });
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  _handleTitleChange(title) {
    NewNoteActions.setTitle(title);
  }
  _handleDescriptionChange(description) {
    NewNoteActions.setDescription(description);
  }
  _handleUpdateFileUploads(files) {
    NewNoteActions.updateAttachments(files);
  }
  _submitNote() {
    NewNoteActions.submitNote(this.state.note);
  }
  render () {
    let submitButton;

    if (this.state.submitting) {
      submitButton = (
        <Button className='new-note-form-footer-submit-button'>
          <Spinner />
        </Button>
      );
    } else {
      submitButton = (
        <Button
          className='new-note-form-footer-submit-button'
          onClick={this._submitNote}
          text="Submit" />
      );
    }

    return (
      <div className='new-note-form'>
        <ExitFormIcon onExitClick={this._exitForm} />
        <NoteForm
          onTitleChange={this._handleTitleChange}
          onDescriptionChange={this._handleDescriptionChange}/>
        <footer className='new-note-form-footer'>
          <FileUploader
            files={this.state.note.attachments}
            onUpdateFiles={this._handleUpdateFileUploads}
            uploaderClassName='new-note-form-footer-file-uploader' />
            {submitButton}
        </footer>
      </div>
    );
  }

  _getInitialState = () => {
    var state = NewNoteStore.getState();
    return {
      note: state.note,
      errors: state.errors,
      submitting: state.submitting
    };
  }

}