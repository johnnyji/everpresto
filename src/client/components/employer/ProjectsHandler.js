import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import ProtectedComponent from '.././shared/ProtectedComponent';

class ProjectsHandler extends ReactTemplate {
  render() {
    return (
      <div>
        All your projects!
      </div>
    );
  }
}

export default ProtectedComponent(ProjectsHandler);