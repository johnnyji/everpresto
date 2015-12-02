import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';
import Tab from '.././ui/Tab';

const displayName = 'DashboardHeader';

export default class DashboardHeader extends Component {

  static displayName = displayName;

  // Allows for this.context.____ to assume the role of the React Router
  static contextTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
      coursesOffered: ImmutablePropTypes.list.isRequired,
      coursesTaking: ImmutablePropTypes.list.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    dashboardModes: [
      'Teacher',
      'Student'
    ]
  };

  constructor (props) {
    super(props);
    this.state = {
      activeDashboardModeIndex: 0,
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser, dashboardModes} = this.props;
    const {activeDashboardModeIndex} = this.state;
    const profileNavOptions = [
      {name: 'Profile Settings', callback: this._viewProfile},
      {name: 'Logout', callback: this._logoutUser}
    ];

    return (
      <header className={displayName}>

        <nav className={`${displayName}-navbar`}>
          <Logo
            logoIconClassName={`${displayName}-navbar-logo`}
            logoIconSize='2.2rem'
            onLogoClick={this._handleLogoClick} />

          <div className={`${displayName}-navbar-nav`}>
            <Link to='profile'>
              <img
                className={`${displayName}-navbar-nav-profile-pic`}
                src={currentUser.get('profilePictureUrl')} />
            </Link>
            <span
              className={`${displayName}-navbar-nav-profile-name`}
              onMouseEnter={this._showProfileOptions}
              onMouseLeave={this._hideProfileOptions}>
              {`${currentUser.get('firstName')} ${currentUser.get('lastName')}`}
            </span>
            <DropdownOptions
              dropdownOptionsClassName={`${displayName}-navbar-nav-profile-dropdown`}
              onShowOptions={this._showProfileOptions}
              onHideOptions={this._hideProfileOptions}
              options={profileNavOptions}
              showDropdownOptions={this.state.showProfileOptions}/>
          </div>
        </nav>

      </header>
    );

  }

  _changeDashboardMode = (index) => {
    this.setState({activeDashboardModeIndex: index});
  }

  _handleLogoClick = () => {
    if (this.context.location.pathname !== '/dashboard') {
      this.context.history.pushState(null, '/dashboard');
    }
  }

  _hideProfileOptions = () => {
    this.setState({showProfileOptions: false});
  }

  _logoutUser = () => {
    this._hideProfileOptions();
  }

  _showProfileOptions = () => {
    this.setState({showProfileOptions: true});
  }

  _viewProfile = () => {
    this._hideProfileOptions();
    this.context.history.pushState(null, '/profile');
  }

}