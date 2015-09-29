import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import ProtectedComponent from '.././shared/ProtectedComponent';

import GroupsController from './GroupsController';
import ActiveGroupContent from './ActiveGroupContent';
import ChatWindow from '.././chat/ChatWindow';

class GroupsHandler extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    let s = this.state;
    let p = this.props;

    return (
      <div className='groups-handler-wrapper'>
        <GroupsController groups={null} />
        <ActiveGroupContent group={null} notes={[]} />
        <ChatWindow currentUser={p.currentUser} />
      </div>
    );
  }
}

// current user is passed from ProtectedComponent decorator
GroupsHandler.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};

export default ProtectedComponent(GroupsHandler);