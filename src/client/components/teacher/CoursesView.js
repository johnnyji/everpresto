import React, {Component, PropTypes} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

export default class CoursesView extends Component {
  render() {
    return (
      <DashboardContentWrapper isFlexContainer={true}>
        Courses!
      </DashboardContentWrapper>
    );
  }
}
