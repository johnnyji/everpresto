import React, {Component, PropTypes} from 'react';

import Input from '.././ui/Input';
import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

export default class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {loginError: AuthStore.getState.loginError};
  }

  componentDidMount () {
    this._unsubscribe = AuthStore.listen(this._updateState);
  }

  componentWillUnmount () {
    this._unsubscribe();
  }

  _updateState (state) {
    this.setState({loginError: state.loginError});
  }

  _loginUser (e) {
    e.preventDefault();

    AuthActions.loginUser({
      user: {
        firstName: this.refs.firstName.getValue(),
        lastName: this.refs.lastName.getValue(),
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      }
    });
  }

  render () {
    return (
      <form className='login-form-wrapper' onSubmit={this._loginUser}>
        {this.state.loginError && <p>{this.state.loginError}</p>}
      </form>
    );
  }

  _handleInputError = (error, errorObj) => {
    this.setState({
      
    });
  }
  
}