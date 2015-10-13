import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import NoteForm from '.././notes/NoteForm';

import FileUploader from '.././shared/FileUploader';
import ExitFormIcon from '.././shared/ExitFormIcon';
import Icon from '.././shared/Icon';
import Spinner from '.././ux/Spinner';

import NewNoteActions from '../.././actions/NewNoteActions';
import AppActions from '../.././actions/AppActions';
import NewNoteStore from '../.././stores/NewNoteStore';

export default class NewNoteForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_handleUpdateFileUploads',
      '_handleTitleChange',
      '_handleDescriptionChange',
      '_submitNote',
      '_exitForm',
      '_updateState'
    );
  }
  componentDidMount() {
    this._unsubscribe = NewNoteStore.listen(this._updateState);
    NewNoteActions.setUserId(this.props.currentUser._id);
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    var state = NewNoteStore.getState();
    return {
      note: state.note,
      errors: state.errors,
      submitting: state.submitting
    };
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
  render() {
    let s = this.state;
    let submitButton;

    if (s.submitting) {
      submitButton = <Spinner />;
    } else {
      submitButton = (
        <button className='submit-button' onClick={this._submitNote}>
          Submit
        </button>
      );
    }

    return (
      <div className='new-note-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
        <NoteForm
          onTitleChange={this._handleTitleChange}
          onDescriptionChange={this._handleDescriptionChange}
        />
        <FileUploader
          files={s.note.attachments}
          onUpdateFiles={this._handleUpdateFileUploads}
        />
        {submitButton}
      </div>
    );
  }
}

NewNoteForm.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};