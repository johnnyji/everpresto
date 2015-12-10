/*
  This component will provide some shared functionality for all components
  that have inputs fields that can be submitted (aka, a form).

  In order for this component to behave properly, it expects the follow state structure:

    formDataState: {
      values: {
        field1: '',
        field2: ''
      },
      errors: {
        field1: '',
        field2: ''
      }
    }
  
  It also expects that the input field have the same `ref` as it's state value key:

    `<Input ref='field1' />` => This should be the input for `field1`



 */



// TODO: Find good way to bind `this`
import React, {Component, PropTypes} from 'react';
import mergeDeep from '.././utils/mergeDeep';

export default (ComposedComponent) => (class FormComponent extends Component {

  static displayName = 'FormComponent';

  render() {
    return (
      <ComposedComponent {...this.props} />
    );
  }

  _handleFormSubmission = (readyToSubmit) => {
    // Goes through each input field by ref, calls the `valid` method on them and on
    // the first invalid field, `find` will return the error message of that input field.
    const firstFoundError = this.state[this.formDataState]
      .get('errors')
      .find((v, k) => !this.refs[k].valid());

    // Dispatches the input error if there is one.
    if (firstFoundError !== undefined) {
      return this.context.dispatch(
        AppActionCreators.createFlashMessage('red', firstFoundError || 'Please fill out the form properly')
      );
    }
    // Fires the callback that actually submits the form
    readyToSubmit();
  }

  _handleInputUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    // We're merging a newly created object with all our nested values and errors into the form data state,
    // so that our state is up to date with the input's returns
    this.setState({
      [this.formData]: this.state[this.formDataState].mergeDeep(mergeDeep(nestedValueObj, nestedErrorObj));
    });
  }

});
