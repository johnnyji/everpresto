import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';

import Icon from '.././shared/Icon';

import GroupsListViewItem from './GroupsListViewItem';

export default class GroupsController extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_toggleNewGroupModal');
  }
  _toggleNewGroupModal() {
    AppActions.toggleModal('newGroup');
  }
  render() {
    let p = this.props;
    let content;

    if (!p.groups || p.groups.length === 0) {
      content = (
        <div className='tip-box'>
          <p>Looks like you don't have any groups yet...</p>
          <p>Click the "New Group" button above to create a group and start adding you're teammates!</p>
        </div>
      );
    } else {
      let groups = _.map(p.groups, (group, i) => <GroupListViewItem group={group} key={i} />);
      content = <ul>{groups}</ul>
    }

    return (
      <div className='groups-controller-wrapper'>
        <header>
          <button className='new-group-button' onClick={this._toggleNewGroupModal}>
            <Icon icon='group-add' /> New Group
          </button>
        </header>
        {content}
      </div>
    );
  }
}

GroupsController.propTypes = {
  groups: React.PropTypes.any
};