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
        <GroupsController />
        <ActiveGroupContent group={null} notes={[]} />
        <ChatWindow />
      </div>
    );
  }
}

export default ProtectedComponent(GroupsHandler);