import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import ProtectedComponent from '.././shared/ProtectedComponent';

class ContactsHandler extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='contacts-handler-wrapper'>
        Contacts!
      </div>
    );
  }
}

// currentUser prop comes from ProtectedComponent
export default ProtectedComponent(ContactsHandler);