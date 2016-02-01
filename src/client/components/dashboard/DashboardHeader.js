import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';
import MUIDivider from 'material-ui/lib/divider';
import MUIMenu from 'material-ui/lib/menus/menu';
import MUIPopover from 'material-ui/lib/popover/popover';
import CustomPropTypes from '.././CustomPropTypes';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';
import Clickable from '.././ui/Clickable';
import Icon from '.././ui/Icon';
import ListItem from '.././ui/ListItem';

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
      dropdownAnchorEl: null,
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser} = this.props;
    const {dropdownAnchorEl, showProfileOptions} = this.state;
    const firstName = currentUser.getIn(['account', 'firstName']);
    const lastName = currentUser.getIn(['account', 'lastName']);

    return (
      <header className={displayName}>
        <nav className={`${displayName}-navbar`} ref='navbar'>
          <h2 className={`${displayName}-navbar-logo`}>everpresto!</h2>
          <div className={`${displayName}-navbar-nav`}>
            <Link to='profile'>
              <img
                className={`${displayName}-navbar-nav-profile-pic`}
                src={currentUser.getIn(['account', 'profilePictureUrl'])} />
            </Link>
            <Clickable onClick={this._handleToggleDropdownMenu} ref='dropdown-anchor'>
              {firstName} {lastName}
            </Clickable>
              <MUIPopover
                anchorEl={dropdownAnchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                canAutoPosition={false}
                open={showProfileOptions}
                onRequestClose={() => this.setState({showProfileOptions: false})}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MUIMenu>
                  <ListItem onClick={this._viewProfile}>Profile Settings</ListItem>
                  <MUIDivider />
                  <ListItem onClick={this._logoutUser}>Logout</ListItem>
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
      dropdownAnchorEl: this.refs['navbar'],
      showProfileOptions: !this.state.showProfileOptions
    });
  };

  _handleLogout = () => {
    console.log('logout');
  };

  _viewProfile = () => {
    this.context.router.push('/profile');
  };

}