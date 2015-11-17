import React, {Component} from 'react';

import DashboardHeader from './DashboardHeader';
import HorizontalNavbar from '.././ui/HorizontalNavbar';
import AppActions from '../.././actions/AppActions';

export default class DashboardHandler extends Component {

  static displayName = 'DashboardHandler';

  constructor (props) {
    super(props);
  }

  componentWillMount() {
    // TODO: Figure out why this component is still flash rendering even though we replace state
  }

  render() {
    const navLinks = [
      { path: '/dashboard', name: 'Student' },
      { path: '/dashboard/teacher', name: 'Teacher' }
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