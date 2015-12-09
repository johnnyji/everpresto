import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FlashMessage from '.././ui/FlashMessage';
import Overlay from '.././ui/Overlay';

import AppActionCreators from '../.././actions/AppActionCreators';

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
      message: PropTypes.string,
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
      <div className={displayName}>

        {/* Displays a Flash Message */}
        {Boolean(flashMessage) &&
          <FlashMessage color={flash.get('color')} content={flashMessage} />
        }

        {/* Displays a Modal */}
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