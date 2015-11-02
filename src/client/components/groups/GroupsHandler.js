import React, {Component, PropTypes} from 'react';

import GroupsController from './GroupsController';
import ActiveGroupContent from './ActiveGroupContent';
import ChatWindow from '.././chat/ChatWindow';

export default class GroupsHandler extends Component {
  
  static contextTypes = {
    currentUser: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='groups-handler-wrapper'>
        <GroupsController groups={null} />
        <ActiveGroupContent group={null} notes={[]} />
        <span className='chat-window-wrapper-container'></span>
        <ChatWindow currentUser={this.context.currentUser} />
      </div>
    );
  }
  
}