import React, {Component, PropTypes} from 'react';
import Button from '.././ui/Button';
import Icon from '.././shared/Icon';
import SearchBar from '.././shared/SearchBar';

import AppActions from '../.././actions/AppActions';

import NotesList from '.././notes/NotesList';

export default class ActiveGroupContent extends Component {

  static propTypes = {
    notes: PropTypes.arrayOf(PropTypes.objects),
  };

  render() {
    return (
      <div className='active-group-content-wrapper'>
        <header>
          <div className='new-note'>
            <Button icon="add" onClick={this._toggleNewNoteModal} text="New Note" />
          </div>
          <SearchBar onInputChange={this._searchNotes}/>
        </header>

        <NotesList notes={this.props.notes} />
      </div>
    );
  }

  _toggleNewNoteModal = () => {
    AppActions.toggleModal('newNote');
  }

  _searchNotes = (searchTerms) => {

  }

}