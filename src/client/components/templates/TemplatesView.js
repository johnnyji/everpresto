import React, {Component, PropTypes} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

const displayName = 'TemplatesView';

export default class TemplatesView extends Component {

  static displayName = displayName;

  render() {
    return (
      <DashboardContentWrapper>
        {this.props.children}
      </DashboardContentWrapper>
    );
  }

}
