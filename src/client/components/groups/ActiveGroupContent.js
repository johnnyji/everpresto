import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';

import Icon from '.././shared/Icon';
import SearchBar from '.././shared/SearchBar';

import NotesList from '.././notes/NotesList';

export default class ActiveGroupContent extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_toggleNewNoteModal',
      '_searchNotes'
    );
  }
  _toggleNewNoteModal() {
    AppActions.toggleModal('newNote');
  }
  _searchNotes(searchTerms) {

  }
  render() {
    let p = this.props;

    return (
      <div className='active-group-content-wrapper'>
        <header>
          <div className='new-note'>
            <a onClick={this._toggleNewNoteModal}>
              <Icon icon='add'/> New Note
            </a>
          </div>
          <SearchBar onInputChange={this._searchNotes}/>
        </header>

        <NotesList notes={p.notes} />
      </div>
    );
  }
}

ActiveGroupContent.propTypes = {
  notes: React.PropTypes.array,
  group: React.PropTypes.any
};