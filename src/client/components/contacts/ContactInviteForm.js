import React from 'react';
import faker from 'faker';
import _ from 'lodash';
import uuid from 'node-uuid';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././shared/Icon';

import ContactInviteField from './ContactInviteField';

export default class ContactInviteForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { inviteFields: [] };
    this._bindFunctions(
      '_addNewField',
      '_removeField'
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
          <tbody>{s.inviteFields}</tbody>
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
