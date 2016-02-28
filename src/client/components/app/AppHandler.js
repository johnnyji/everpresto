import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import io from 'socket.io-client';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FlashMessage from '.././ui/FlashMessage';
import Overlay from '.././ui/Overlay';

import AppActionCreators from '../.././actions/AppActionCreators';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import EverprestoMUITheme from '../.././config/mui-theme';

const displayName = 'AppHandler';

@ThemeDecorator(ThemeManager.getMuiTheme(EverprestoMUITheme))
@connect((state) => ({
  flash: state.app.get('flash'),
  modal: state.app.get('modal')
}))
export default class AppHandler extends Component {

  static displayName = displayName;

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    flash: ImmutablePropTypes.contains({
      color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']),
      message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
    }).isRequired,
    modal: ImmutablePropTypes.contains({
      display: PropTypes.bool.isRequired,
      element: PropTypes.element
    }).isRequired,
  };

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
  };

  componentWillMount() {
    // TODO: Change this dependant on prod/dev environments
    this.socket = io('http://localhost:3000');
  }

  // Sets the store's `dispatch` method as context accesible on any child component
  getChildContext() {
    return {
      dispatch: this.props.dispatch,
      socket: this.socket
    };
  }

  render() {
    const {flash, modal} = this.props;
    const flashMessage = flash.get('message');
    const modalShouldDisplay = modal.get('display');
    const modalElement = modal.get('element');

    return (
      <div className={displayName}>

        {/* Displays Flash Message */}
        {Boolean(flashMessage) &&
          <FlashMessage color={flash.get('color')} content={flashMessage} />
        }

        {/* Displays Modal */}
        {modalShouldDisplay &&
          <Overlay onExit={this._handleExitModal}>
            {modalElement}
          </Overlay>
        }

        <div className={`${displayName}-content-container`}>
          {/*Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0*/}
          {this.props.children}
        </div>
      </div>
    );

  }

  _handleExitModal = () => {
    this.props.dispatch(AppActionCreators.dismissModal());
  }

}