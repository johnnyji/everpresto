import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardHeader from './DashboardHeader';
import HorizontalNavbar from '.././ui/HorizontalNavbar';
import styles from './styles/DashboardHandler.scss';

const DASHBOARD_TABS = [
  {label: 'Collections', path: '/dashboard/collections'},
  {label: 'Documents', path: '/dashboard/documents'},
  {label: 'Activity', path: '/dashboard/activity'},
  {label: 'Templates', path: '/dashboard/templates'},
  {label: 'Profile Settings', path: '/dashboard/profile_settings'}
];

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class DashboardHandler extends PureComponent {

  static displayName = 'DashboardHandler';

  static contextTypes = {
    router: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  componentWillReceiveProps({currentUser}) {
    if (!currentUser) this.context.router.replace('/');
  }

  render() {
    return (
      <div className={styles.main}>
        <DashboardHeader currentUser={this.props.currentUser} />
        <HorizontalNavbar links={DASHBOARD_TABS} />
        {/* Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0 */}
        {this.props.children}
      </div>
    );
  }

}
