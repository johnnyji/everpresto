import React, {PropTypes} from 'react';

import Button from '.././ui/Button';
import GroupsListViewItem from './GroupsListViewItem';
import TipBox from '.././ui/TipBox';

import AppActions from '../.././actions/AppActions';

export default class GroupsController extends React.Component {

  static propTypes = {
    groups: PropTypes.object
  }

  constructor (props) {
    super(props);
  }

  _toggleNewGroupModal = () => {
    AppActions.toggleModal('newGroup');
  }

  render () {
    const noGroups = !this.props.groups || this.props.groups.length === 0;
    let content;

    if (noGroups) {
      content = (
        <TipBox
          text={
            <div>
              <p>Looks like you don't have any groups yet...</p>
              <p>Click the "New Group" button above to create a group and start adding teammates!</p>
            </div>
          }/>
      );
    } else {
      const groups = this.props.groups.map((group, i) => <GroupListViewItem group={group} key={i} />);
      content = <ul>{groups}</ul>;
    }

    return (
      <div className='groups-controller'>
        <Button
          buttonClass='groups-controller-new-group-button'
          icon='group-add'
          onClick={this._toggleNewGroupModal}
          text='New Group'/>
        {content}
      </div>
    );
  }

}