import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import CustomPropTypes from '.././CustomPropTypes';

import DashboardHeader from './DashboardHeader';
import HorizontalNavbar from '.././ui/HorizontalNavbar';

const displayName = 'DashboardHandler';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class DashboardHandler extends Component {

  static displayName = displayName;

  // Router history
  static contextTypes = {
    router: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser) this.context.router.replace('/');
  }

  render() {
    const dashboardTabs = [
      {label: 'Collections', path: '/dashboard/collections'},
      {label: 'Documents', path: '/dashboard/documents'},
      {label: 'Activity', path: '/dashboard/activity'},
      {label: 'Templates', path: '/dashboard/templates'},
      {label: 'Profile Settings', path: '/dashboard/profile_settings'}
    ];

    return (
      <div className={displayName}>
        <DashboardHeader currentUser={this.props.currentUser} />
        <HorizontalNavbar links={dashboardTabs} />
        {/*Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0*/}
        {this.props.children}
      </div>
    );
  }

}