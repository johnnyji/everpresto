import React, {Component, PropTypes} from 'react';

import Input from '.././ui/Input';

export default class LoginForm extends Component {

  _loginUser (e) {
  }

  render () {
    return (
      <form className='login-form-wrapper' onSubmit={this._loginUser}>
      </form>
    );
  }
  
}