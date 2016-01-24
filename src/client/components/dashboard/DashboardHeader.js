import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import MUIDivider from 'material-ui/lib/divider';
import MUIMenu from 'material-ui/lib/menus/menu';
import MUIMenuItem from 'material-ui/lib/menus/menu-item';
import MUIPopover from 'material-ui/lib/popover/popover';
import CustomPropTypes from '.././CustomPropTypes';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';
import Clickable from '.././ui/Clickable';
import Icon from '.././ui/Icon';

const displayName = 'DashboardHeader';

export default class DashboardHeader extends Component {

  static displayName = displayName;

  static contextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser} = this.props;
    const firstName = currentUser.getIn(['account', 'firstName']);
    const lastName = currentUser.getIn(['account', 'lastName']);
    const profilePictureUrl = currentUser.getIn(['account', 'profilePictureUrl']);
    const profileNavOptions = [
      {label: 'Profile Settings', callback: this._viewProfile},
      {label: 'Logout', callback: this._logoutUser}
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
                src={profilePictureUrl} />
            </Link>
            <Clickable onClick={this._handleToggleDropdownMenu} ref='dropdown-anchor'>
              {firstName} {lastName}
            </Clickable>
              <MUIPopover
                anchorEl={this._getDropdownAnchorEl()}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                canAutoPosition={false}
                open={this.state.showProfileOptions}
                onRequestClose={() => this.setState({showProfileOptions: false})}
                targetOrigin={{horizontal: 'middle', vertical: 'top'}}>
                <MUIMenu>
                  <MUIMenuItem primaryText='Profile Settings'/>
                  <MUIDivider />
                  <MUIMenuItem primaryText='Logout' onTouchTap={console.log('olo')}/>
                </MUIMenu>
              </MUIPopover>
          </div>
        </nav>
      </header>
    );

  }

  _handleLogoClick = () => {
    const {location, history} = this.context;
    if (location.pathname !== '/dashboard') history.push('/dashboard');
  };

  _handleToggleDropdownMenu = () => {
    this.setState({
      showProfileOptions: !this.state.showProfileOptions
    });
  };

  _handleLogout = () => {
    this._hideProfileOptions();
  };

  _viewProfile = () => {
    this._hideProfileOptions();
    this.context.router.push('/profile');
  };

}