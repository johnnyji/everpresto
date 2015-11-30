import React, {Component, PropTypes} from 'react';
import HorizontalNavbar from '.././ui/HorizontalNavbar';

const displayName = 'TeacherDashboard';

export default class TeacherDashboard extends Component {

  static displayName = displayName;

  static propTypes = {
    dashboardTabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  };

  static defaultProps = {
    dashboardTabs: [
      {label: 'Courses', path: '/dashboard/teacher/courses'},
      {label: 'Email List', path: '/dashboard/teacher/email_list'},
      {label: 'Email History', path: '/dashboard/teacher/email_history'},
      {label: 'Analytics', path: '/dashboard/teacher/analytics'},
      {label: 'Profile', path: '/dashboard/teacher/profile'}
    ]
  };

  render() {
    const {dashboardTabs} = this.props;
    
    return (
      <div className={displayName}>
        <HorizontalNavbar links={dashboardTabs} />
        {this.props.children}
      </div>
    );
  }

}