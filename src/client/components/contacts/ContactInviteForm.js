import React from 'react';
import faker from 'faker/locale/en';
import _ from 'lodash';
import uuid from 'node-uuid';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././ui/Icon';

import ContactInviteField from './ContactInviteField';

export default class ContactInviteForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { inviteFields: [] };
    this._bindFunctions(
      '_addNewField',
      '_removeField',
      '_inviteContacts'
    );
  }
  componentDidMount() {
    this._addNewField();
  }
  _addNewField() {
    let fields = this.state.inviteFields;
    fields.push(
      <ContactInviteField 
        uuid={uuid.v4()}
        key={uuid.v4()} 
        removeField={this._removeField}
        placeholder={{
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email()
        }}
      />
    );
    this.setState({ inviteFields: fields });
  }
  _removeField(fieldId) {
    if (this.state.inviteFields.length === 1) return;

    let fields = this.state.inviteFields;
    _.remove(fields, field => field.props.uuid === fieldId);
    this.setState({ inviteFields: fields });
  }
  _inviteContacts() {
    let inviteFields = React.findDOMNode(this.refs.inviteFieldsContainer).children;
    
    let contacts = _.map(inviteFields, field => {
      let inputs = field.getElementsByTagName('input');
      let firstName = inputs[0].value,
          lastName = inputs[1].value,
          email = inputs[2].value
      if (email !== '') {
        return {
          firstName: firstName,
          lastName: lastName,
          email: email
        };
      }
    });
    contacts = _.filter(contacts, contact => typeof(contact) !== 'undefined');
    
    this.props.onInviteContacts(contacts);
  }
  render() {
    let s = this.state;

    return (
      <div className='contact-invite-form-wrapper'>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody ref='inviteFieldsContainer'>{s.inviteFields}</tbody>
        </table>
        <span className='new-field-button' onClick={this._addNewField}>
          <Icon icon='add-circle' size='60px' />
        </span>
        <button className='invite-contacts-button' onClick={this._inviteContacts}>
          <Icon icon='group-add' /> Invite Contacts!
        </button>
      </div>
    );
  }
}

ContactInviteForm.propTypes = {
  onInviteContacts: React.PropTypes.func.isRequired
};