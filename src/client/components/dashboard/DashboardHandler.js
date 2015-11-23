import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import DashboardHeader from './DashboardHeader';
import HorizontalNavbar from '.././ui/HorizontalNavbar';
import AppActions from '../.././actions/AppActions';

const displayName = 'DashboardHandler';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class DashboardHandler extends Component {

  static displayName = displayName;

  // Router history
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    auth: ImmutablePropTypes.contains({
      user: ImmutablePropTypes.contains({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      })
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // If the next `currentUser` prop is null, we want to the user to the main page
    if (!Boolean(nextProps.currentUser)) {
      this.context.history.replaceState(null, '/');
    }
  }

  render() {
    const navLinks = [
      { path: '/dashboard', name: 'Student' },
      { path: '/dashboard/teacher', name: 'Teacher' }
    ];

    return (
      <div className={displayName}>
        <DashboardHeader />
        <HorizontalNavbar navLinks={navLinks} />
        {/*Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0*/}
        {this.props.children}
      </div>
    );
  }

}