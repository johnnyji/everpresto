import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';

import ContactInviteForm from '.././contacts/ContactInviteForm';

import NewGroupActions from '../.././actions/NewGroupActions';

export default class GroupAddMembersInput extends ReactTemplate {

  static propTypes = {
    contacts: PropTypes.any,
    error: PropTypes.any
  };

  constructor(props) {
    super(props);
    this._bindFunctions(
      '_addExistingUser',
      '_removeExisitingUser',
      '_batchInviteNewUsers'
    );
  }

  _batchInviteNewUsers(users) {
    // soft adds the members to the groups and invites them to join the apps
    NewGroupActions.batchInviteNewUsers(users);
  }

  _addUser() {

  }

  _removeUser() {
    
  }

  render() {
    let p = this.props;
    let content;

    if (p.contacts) {
      content = _.map(p.contacts, (contact, i) => {
        return (
          <div key={i} className='member-item' onClick={this._addExisitingUser}>
            <strong>{contact.lastName}</strong>, {contact.firstName}
          </div>
        );
      });
    } else {
      content = <ContactInviteForm onInviteContacts={this._batchInviteNewUsers} />;
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