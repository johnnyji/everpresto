import React, {Component, PropTypes} from 'react';
import AppActionCreators from '../.././actions/AppActionCreators';
import classNames from 'classnames';
import {connect} from 'react-redux';
import EverprestoMUITheme from '../.././config/mui-theme';
import FlashMessage from '.././ui/FlashMessage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Overlay from '.././ui/Overlay';
import MUIThemeProvider from 'material-ui/styles/MuiThemeProvider';

const displayName = 'AppHandler';

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
    dispatch: PropTypes.func.isRequired
  };

  // Sets the store's `dispatch` method as context accesible on any child component
  getChildContext() {
    return {
      dispatch: this.props.dispatch
    };
  }

  render() {
    const {flash, modal} = this.props;
    const flashMessage = flash.get('message');
    const modalShouldDisplay = modal.get('display');
    const modalElement = modal.get('element');

    return (
      <MUIThemeProvider muiTheme={getMuiTheme(EverprestoMUITheme)}>
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
      </MUIThemeProvider>
    );

  }

  _handleExitModal = () => {
    this.props.dispatch(AppActionCreators.dismissModal());
  }

}
