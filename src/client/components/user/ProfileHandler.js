import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import ProtectedComponent from '.././shared/ProtectedComponent';

class ProfileHandler extends ReactTemplate {
  render() {
    return (
      <div>user profile!</div>
    );
  }
}

export default ProtectedComponent(ProfileHandler);