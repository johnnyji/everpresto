import React, {PropTypes, PureComponent} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import AuthActionCreators from '../../actions/AuthActionCreators';
import Clickable from 'ui-components/src/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import Icon from 'ui-components/src/Icon';
import {Link} from 'react-router';
import ListItem from '.././ui/ListItem';
import MUIDivider from 'material-ui/Divider';
import MUIMenu from 'material-ui/Menu';
import MUIPopover from 'material-ui/Popover';
import styles from './styles/DashboardHeader.scss';

export default class DashboardHeader extends PureComponent {

  static displayName = 'DashboardHeader';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired,
    sidenavShown: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      dropdownAnchorEl: null,
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser, sidenavShown} = this.props;
    // DO NOT REMOVE: This guard prevents the console from throwing a `getIn of undefined` error
    // after the user logs out... Need to figure out why that's happening
    if (!currentUser) return <div />;

    const {dropdownAnchorEl, showProfileOptions} = this.state;

    return (
      <header className={styles.main} ref='navbar'>
        <Clickable className={styles.logo} onClick={this._handleOpenSidebar}>
          {sidenavShown ? null : <Icon name='menu' size={28} />}
        </Clickable>
        <div className={styles.nav}>
          <Link to='profile'>
            <img
              className={styles.profilePic}
              src={currentUser.getIn(['account', 'profilePictureUrl'])} />
          </Link>
          <Clickable
            className={styles.profileName}
            onClick={this._handleToggleDropdownMenu}
            ref='dropdown-anchor'>
            {currentUser.getIn(['account', 'firstName'])} {currentUser.getIn(['account', 'lastName'])}
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
              <ListItem onClick={this._handleLogout}>Logout</ListItem>
            </MUIMenu>
          </MUIPopover>
        </div>
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

  _handleOpenSidebar = () => {
    this.context.dispatch(AppActionCreators.openSidebar());
  };

  _viewProfile = () => {
    this.context.router.push('/profile');
  };

}
