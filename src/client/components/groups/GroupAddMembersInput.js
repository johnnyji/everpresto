import React from 'react';
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
        <div>
          <h3>You have no contacts</h3>
          <p>Click here to invite some people!</p>
        </div>
      );
    }

    return (
      <div>
        <h2 className='add-members-title'>Add members</h2>
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