import React, {Component, PropTypes} from 'react';
import {createFlashMessage} from '.././actions/AppActionCreators';

export default (ComposedComponent) => (class FlashMessageHandler extends Component {

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return <ComposedComponent {...this.props} />;
  }

  _handleFlashError = (err) => {
    console.log('hit')
    this.context.dispatch(createFlashMessage('red', err));
  };

  _handleFlashMessage = (message) => {
    this.context.dispatch(createFlashMessage('blue', message));
  };

  _handleFlashSuccess = (message) => {
    this.context.dispatch(createFlashMessage('green', message));
  };

});

