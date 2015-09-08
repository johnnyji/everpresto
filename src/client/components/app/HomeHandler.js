import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import AuthHelper from '../.././utils/AuthHelper';
import { Link } from 'react-router';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

export default class HomeHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { currentUser: AuthStore.getCurrentUser() };
    this._bindFunctions('_updateState');
  }
  componentDidMount() {
    this._unsubscribe = AuthStore.listen(this._updateState);
    AuthHelper.updateCurrentUser();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _updateState(state) {
    this.setState({ currentUser: state.currentUser });
  }
  render() {
    return (
      <div>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='join'>Try for free!</Link>
      </div>
    );
  }
}

HomeHandler.defaultProps = {
  currentUser: AuthStore.getCurrentUser()
};