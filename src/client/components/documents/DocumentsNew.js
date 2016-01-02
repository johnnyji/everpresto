import React, {Component, PropTypes} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

const displayName = 'DocumentsNew';

export default class DocumentsNew extends Component {

  static displayName = displayName;

  render() {
    return (
      <DashboardContentWrapper>
        DocumentsNew
      </DashboardContentWrapper>
    );
  }
}