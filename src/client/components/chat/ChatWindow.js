import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

export default class ChatWindow extends ReactTemplate {
  render() {
    let p = this.props;
    
    return (
      <div className='chat-window-wrapper'>
        <div className='messages-section'></div>
        <div className='input-section'>
          <img src={p.currentUser.profilePictureUrl}/>
          <input type='text'></input>
        </div>
      </div>
    );
  }
}

ChatWindow.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};
