import React, {Component, PropTypes} from 'react';
import TextEditor from '.././shared/TextEditor';
import CoursePreviewCard from '.././courses/CoursePreviewCard';
import Icon from '.././ui/Icon';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

const displayName = 'CoursesView';

export default class CoursesView extends Component {

  static displayName = displayName;

  render() {
    return (
      <DashboardContentWrapper className={displayName}>
        {/*<CoursePreviewCard className={`${displayName}-new-course`} onClick={this._handleNewCourseClick}>
          <Icon icon="add" iconClass={`${displayName}-new-course-icon`} size={80} />
        </CoursePreviewCard>*/}
        <TextEditor onSave={() => {}}/>
      </DashboardContentWrapper>
    );
  }

  _handleNewCourseClick = () => {

  };
}
