import React, {Component, PropTypes} from 'react';
import AppActionCreators from '.././actions/AppActionCreators';

export default (ComposedComponent) => (class ModalEnhancer extends Component {

  static displayName = 'ModalEnhancer';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return <ComposedComponent {...this.props} />;
  }

  _submitModalForm(onSubmitCallback) {
    // Fakes a load and submits the placeholder
    setTimeout(() => {
      onSubmitCallback();
      this.context.dispatch(AppActionCreators.dismissModal());
    }, 500);
  }

});