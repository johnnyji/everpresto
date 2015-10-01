import React from 'react';
import { Link } from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';

import ContactInviteForm from '.././contacts/ContactInviteForm';

export default class GroupAddMembersInput extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_addMember',
      '_removeMember',
      '_batchAddNewMembers'
    );
  }
  _addMember() {

  }
  _batchAddNewMembers(users) {
    // soft adds the members to the groups and invites them to join the apps
    debugger;
  }
  _removeMember() {
    
  }
  render() {
    let p = this.props;
    let content;

    if (p.contacts) {
      content = _.map(p.contacts, (contact, i) => {
        return (
          <div key={i} className='member-item' onClick={this._addMember}>
            <strong>{contact.lastName}</strong>, {contact.firstName}
          </div>
        );
      });
    } else {
      content = <ContactInviteForm onInviteContacts={this._batchAddNewMembers} />;
    }

    return (
      <div className='group-add-member-input-wrapper'>
        <h2 className='add-members-title'>Add Members</h2>
        {p.error && <p className='error'>{p.error}</p>}
        {content}
      </div>
    );
  }
}

// contacts should either be an array or null
GroupAddMembersInput.propTypes = {
  contacts: React.PropTypes.any,
  error: React.PropTypes.any
};