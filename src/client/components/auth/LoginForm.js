import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import {email} from '../.././utils/RegexHelper';

import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';

const displayName = 'LoginForm';

export default class LoginForm extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: Immutable.fromJS({
        values: {
          email: ''
          password: ''
        },
        errors: {
          email: null,
          password: null
        }
      })
    };
  }

  render () {
    const {user} = this.state;

    return (
      <Card className={displayName}>
        <Input
          autoFocus={true}
          className={`${displayName}-input`}
          error={user.getIn(['errors', 'username'])}
          errorKeys='errors:username'
          label='youremail@domain.com'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={email('Hmmm, are you sure that\'s your email?')}
          ref='email'
          successKeys='values:username'/>
        <Input
          className={`${displayName}-input`}
          error={user.getIn(['user', 'errors', 'name'])}
          errorKeys='user:errors:name'
          label='*************'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={email('Hmmm, are you sure that\'s your email?')}
          ref='email'
          successKeys='user:values:name'/>
        <Button color='green' onClick={this._handleLogin} text='Login' />
      </Card>
    );
  }

  _handleLogin = () => {
    const {user} = this.state;

    this.context.dispatch(AuthActionCreators.loginUser(user.get('values').toJS()));
  };
  
}