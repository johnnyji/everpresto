import React from 'react';
import { Link } from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';

import ContactInviteForm from '.././contacts/ContactInviteForm';

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
      content = <ContactInviteForm />;
    }

    return (
      <div className='group-add-member-input-wrapper'>
        <h2 className='add-members-title'>Add Members</h2>
        {content}
      </div>
    );
  }
}

// contacts should either be an array or null
GroupAddMembersInput.propTypes = {
  contacts: React.PropTypes.any
};