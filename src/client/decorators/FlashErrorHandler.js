import React, {PropTypes, Component} from 'react';
import {createFlashMessage} from '.././actions/AppActionCreators';

const FlashErrorHandler = (ComposedComponent) => (class extends Component {

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return <ComposedComponent {...this.props} handleFlashError={this._handleError}/>;
  }

  _handleError = (err) => {
    this.context.dispatch(createFlashMessage('red', err));
  };

});

export default FlashErrorHandler;