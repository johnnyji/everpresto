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

import AuthActionCreators from '../.././actions/AuthActionCreators';

const displayName = 'DashboardHeader';

export default class DashboardHeader extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
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
              {currentUser.getIn(['account', 'firstName'])} {currentUser.getIn(['account', 'lastName'])}
            </Clickable>
              <MUIPopover
                anchorEl={dropdownAnchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                canAutoPosition={false}
                open={showProfileOptions}
                onRequestClose={() => this.setState({showProfileOptions: false})}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
              {/*
                Wrapping the menu in div will prevent this error:
                http://stackoverflow.com/questions/31998227/using-material-design-lite-with-react
              */}
                <div>
                  <MUIMenu>
                    <span onClick={this._viewProfile}><ListItem>Profile Settings</ListItem></span>
                    <MUIDivider />
                    <span onClick={this._handleLogout}><ListItem>Logout</ListItem></span>
                  </MUIMenu>
                </div>
              </MUIPopover>
          </div>
        </nav>
      </header>
    );

  }

  _handleLogoClick = () => {
    const {location, router} = this.context;
    if (location.pathname !== '/dashboard') router.push('/dashboard');
  };

  _handleToggleDropdownMenu = () => {
    this.setState({
      dropdownAnchorEl: this.refs['navbar'],
      showProfileOptions: !this.state.showProfileOptions
    });
  };

  _handleLogout = () => {
    this.context.dispatch(AuthActionCreators.logout());
  };

  _viewProfile = () => {
    this.context.router.push('/profile');
  };

}