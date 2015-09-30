import React from 'react';
import { Link } from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';

export default class GroupAddMembersInput extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_addMember',
      '_removeMember'
    );
  }
  _addMember() {

  }
  _removeMember() {
    
  }
  render() {
    let p = this.props;
    let members;

    if (p.contacts) {
      members = _.map(p.contacts, (contact, i) => {
        return (
          <li key={i} className='member-item' onClick={this._addMember}>
            <strong>{contact.lastName}</strong>, {contact.firstName}
          </li>
        );
      });
    } else {
      members = (
        <div className='placeholder-message'>
          <h3>You have no contacts</h3>
          <p>
            <Link to='/dashboard/contacts'>Click here</Link> to invite some people!
          </p>
        </div>
      );
    }

    return (
      <div className='group-add-member-input-wrapper'>
        <h2 className='add-members-title'>Add Members</h2>
        <ul className='add-members-list'>
          {members}
        </ul>
      </div>
    );
  }
}

// contacts should either be an array or null
GroupAddMembersInput.propTypes = {
  contacts: React.PropTypes.any
};