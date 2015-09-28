import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';
import { Link } from 'react-router';
import ProtectedComponent from '.././shared/ProtectedComponent';

import AppActions from '../.././actions/AppActions';
import ProjectActions from '../.././actions/ProjectActions';
import ProjectStore from '../.././stores/ProjectStore';

import NotesList from '.././notes/NotesList';

import Icon from '.././shared/Icon';
import SearchBar from '.././shared/SearchBar';

class GroupsHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_changeActiveTabIndex',
      '_searchNotes',
      '_toggleNewNoteModal'
    );
  }
  componentDidMount() {
    this._unsubscribe = ProjectStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe(); 
  }
  _getInitialState() {
    let state = ProjectStore.getState();
    return {
      projects: state.projects,
      activeTabIndex: state.activeTabIndex
    };
  }
  _updateState(state) {
    this.setState({
      projects: state.projects,
      activeTabIndex: state.activeTabIndex
    });
  }
  _changeActiveTabIndex(e) {
    ProjectActions.changeActiveTabIndex(e.target.value);
  }
  _searchNotes(searchTerms) {
    console.log('search hit: ', searchTerms);
  }
  _toggleNewNoteModal(e) {
    AppActions.toggleModal('newNote');
  }
  render() {
    let s = this.state;
    let p = this.props;

    return (
      <div className='groups-wrapper'>
        <header>
          <div className='new-note'>
            <a onClick={this._toggleNewNoteModal}>
              <Icon icon='add'/> New Note
            </a>
          </div>

          <SearchBar onInputChange={this._searchNotes}/>

        </header>
        <NotesList notes={this.props.notes} />
      </div>
    );
  }
}

export default ProtectedComponent(GroupsHandler);