import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././shared/Icon';

export default class ContactInviteField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null
    };
    this._bindFunctions(
      '_removeField',
      '_handleEmailChange',
      '_handleFirstNameChange',
      '_handleLastNameChange'
    );
  }
  _removeField() {
    this.props.removeField(this.props.uuid);
  }
  _handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  _handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  _handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  render() {
    let p = this.props;
    
    return (
      <tr className='contact-invite-field-wrapper'>
        <td><input type='text' placeholder={p.placeholder.firstName} onChange={this._handleFirstNameChange}></input></td>
        <td><input type='text' placeholder={p.placeholder.lastName} onChange={this._handleLastNameChange}></input></td>
        <td>
          <input type='text' placeholder={p.placeholder.email} onChange={this._handleEmailChange}></input>
          <span className='exit-icon' onClick={this._removeField}>
            <Icon icon='close' />
          </span>
        </td>
      </tr>
    );
  }
}

// the uuid prop serves as an indentifier for the field if we later want to remove it
ContactInviteField.propTypes = {
  removeField: React.PropTypes.func.isRequired,
  uuid: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.object.isRequired
};