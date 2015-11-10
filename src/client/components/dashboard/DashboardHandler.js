import React, {Component, PropTypes} from 'react';

import DashboardHeader from './DashboardHeader';
import HorizontalNavbar from '.././ui/HorizontalNavbar';
import AppActions from '../.././actions/AppActions';

export default class DashboardHandler extends Component {

  static displayName = 'DashboardHandler';

  static contextTypes = {
    currentUser: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  render() {
    const navLinks = [
      { path: '/dashboard', name: 'Groups' },
      { path: '/dashboard/notes', name: 'Notes' },
      { path: '/dashboard/contacts', name: 'Contacts' }
    ];

    return (
      <div>
        <DashboardHeader />
        <HorizontalNavbar navLinks={navLinks} />
        {/*Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0*/}
        {this.props.children}
      </div>
    );
  }

}