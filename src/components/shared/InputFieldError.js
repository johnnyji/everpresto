import React from 'react';
import ReactTemplate from './ReactTemplate';

export default class InputFieldError extends ReactTemplate {
  constructor(props) {
    super(props)
  }
  render() {
    let p = this.props;

    if (p.error) { 
      return <p className='input-field-error'>{p.error}</p>; 
    }
    return <div />;
  }
}

InputFieldError.propTypes = {
  error: React.PropTypes.any
};