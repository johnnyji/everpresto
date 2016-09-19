import React, {Component, PropTypes} from 'react';
import AppActionCreators from '../.././actions/AppActionCreators';
import {connect} from 'react-redux';
import EverprestoMUITheme from '../.././config/mui-theme';
import FlashMessage from '.././ui/FlashMessage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';
import menuConfig from '../../config/menu';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Overlay from '.././ui/Overlay';
import Radium from 'radium';
import {pushRotate as Menu} from 'react-burger-menu';
import styles from './styles/App.scss';

const RouterLink = Radium(Link);
const MENU_STYLES = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#FFF',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMenuWrap: {
    zIndex: 6
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
  },
  bmOverlay: {
    zIndex: 5
  }
};

@connect((state) => ({
  currentUser: state.auth.get('user'),
  flash: state.app.get('flash'),
  modal: state.app.get('modal'),
  menuShown: state.app.get('menuShown', true)
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
    menuShown: PropTypes.bool.isRequired,
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
    return (
      <Menu
        isOpen={this.props.menuShown}
        outerContainerId={menuConfig.outerContainerId}
        pageWrapId={menuConfig.pageWrapId}
        styles={MENU_STYLES}>
        <RouterLink to='/dashboard/collections'>Collections</RouterLink>
        <RouterLink to='/dashboard/documents'>Documents</RouterLink>
        <RouterLink to='/dashboard/activity'>Activity</RouterLink>
        <RouterLink to='/dashboard/templates'>Templates</RouterLink>
        <RouterLink to='/dashboard/profile_settings'>Profile Settings</RouterLink>
      </Menu>
    );
  };


  _handleExitModal = () => {
    this.props.dispatch(AppActionCreators.dismissModal());
  }

}
