import React, {Component, PropTypes} from 'react';
import AppActionCreators from '../.././actions/AppActionCreators';
import {connect} from 'react-redux';
import EverprestoMUITheme from '../.././config/mui-theme';
import FlashMessage from '.././ui/FlashMessage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Icon from 'ui-components/src/Icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';
import menuConfig from '../../config/menu';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Overlay from '.././ui/Overlay';
import Radium from 'radium';
import {push as Menu} from 'react-burger-menu';
import styles from './styles/App.scss';

const RouterLink = Radium(Link);
const MENU_STYLES = {
  bmMenu: {
    background: '#F5F5F5',
    paddingTop: '3.25rem',
    fontSize: '1.15rem'
  },
  bmCrossButton: {
    cursor: 'pointer',
    right: 16,
    top: 16
  },
  bmMenuWrap: {
    zIndex: 6
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmOverlay: {
    zIndex: 5
  }
};

@connect((state) => ({
  currentUser: state.auth.get('user'),
  flash: state.app.get('flash'),
  modal: state.app.get('modal'),
  sidenavShown: state.app.get('sidenavShown')
}))
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    currentUser: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    flash: ImmutablePropTypes.contains({
      color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']),
      message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ])
    }).isRequired,
    sidenavShown: PropTypes.bool.isRequired,
    modal: ImmutablePropTypes.contains({
      display: PropTypes.bool.isRequired,
      element: PropTypes.element
    }).isRequired
  };

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  // Sets the store's `dispatch` method as context accesible on any child component
  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  render() {
    const {currentUser, flash, modal} = this.props;
    const flashMessage = flash.get('message');
    const modalShouldDisplay = modal.get('display');
    const modalElement = modal.get('element');

    return (
      <MUIThemeProvider muiTheme={getMuiTheme(EverprestoMUITheme)}>
        <main className={styles.main} id={menuConfig.outerContainerId}>
          {flashMessage && <FlashMessage color={flash.get('color')} content={flashMessage} />}
          {modalShouldDisplay && <Overlay onExit={this._handleExitModal}>{modalElement}</Overlay>}
          {currentUser && this._renderMenu()}
          {/* Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0 */}
          {this.props.children}
        </main>
      </MUIThemeProvider>
    );
  }

  _renderMenu = () => {
    const closeIcon = <Icon name='close' size={28} />;

    return (
      <Menu
        customBurgerIcon={false}
        customCrossIcon={closeIcon}
        isOpen={this.props.sidenavShown}
        onStateChange={this._handleMenuState}
        outerContainerId={menuConfig.outerContainerId}
        pageWrapId={menuConfig.pageWrapId}
        styles={MENU_STYLES}>
        <RouterLink activeClassName={styles.menuItemActive} className={styles.menuItem} to='/dashboard/collections'>Collections</RouterLink>
        <RouterLink activeClassName={styles.menuItemActive} className={styles.menuItem} to='/dashboard/documents'>Documents</RouterLink>
        <RouterLink activeClassName={styles.menuItemActive} className={styles.menuItem} to='/dashboard/activity'>Activity</RouterLink>
        <RouterLink activeClassName={styles.menuItemActive} className={styles.menuItem} to='/dashboard/templates'>Templates</RouterLink>
        <RouterLink activeClassName={styles.menuItemActive} className={styles.menuItem} to='/dashboard/profile_settings'>Profile Settings</RouterLink>
      </Menu>
    );
  };


  _handleExitModal = () => {
    this.props.dispatch(AppActionCreators.dismissModal());
  };

  _handleMenuState = ({isOpen}) => {
    if (!isOpen) {
      this.props.dispatch(AppActionCreators.closeSidebar());
    }
  };

}
