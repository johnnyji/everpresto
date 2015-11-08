import React, {Component, PropTypes} from 'react';

import HorizontalNavbar from '.././ui/HorizontalNavbar';
import AppActions from '../.././actions/AppActions';

export default class DashboardHandler extends Component {

  static displayName = 'DashboardHandler';

  static contextTypes = {
    currentUser: PropTypes.object
    // currentUser: PropTypes.shape({
    //   _id: PropTypes.string.isRequired,
    //   createdAt: PropTypes.string,
    //   email: PropTypes.string,
    //   groupPreviews: PropTypes.arrayOf(
    //     PropTypes.shape({
    //       name: PropTypes.string.isRequired,
    //       iconUrl: PropTypes.string.isRequired
    //     })
    //   ),
    //   profilePictureUrl: PropTypes.string.isRequired,
    //   updatedAt: PropTypes.string
    // })
  };

  // static propTypes = {
  //   apiToken: PropTypes.string,
  //   currentUser: PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //     createdAt: PropTypes.string,
  //     email: PropTypes.string,
  //     groupPreviews: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //         iconUrl: PropTypes.string.isRequired
  //       })
  //     ),
  //     profilePictureUrl: PropTypes.string.isRequired,
  //     updatedAt: PropTypes.string
  //   })
  // };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    // AppActions.loadInitialDashboardData();
  }

  render() {

    const navLinks = [
      { path: '/dashboard', name: 'Groups' },
      { path: '/dashboard/notes', name: 'Notes' },
      { path: '/dashboard/contacts', name: 'Contacts' }
    ];

    return (
      <div>
        <HorizontalNavbar navLinks={navLinks} />
        {/*Allows the React Router to run the correct child route,
        replaced RouteHandler in v1.0.0*/}
        {this.props.children}
      </div>
    );
  }

}