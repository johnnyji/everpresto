import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import { Link } from 'react-router';

import AppStore from '../.././stores/AppStore';

export default class HomeHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { currentUser: AppStore.getCurrentUser() };
    this._bindFunctions('_updateState');
  }
  componentWillMount() {
    if (AppStore.getCurrentUser()) {
      this.context.router.transitionTo('/dashboard');
    }
  }
  componentDidMount() {
    this._unsubscribe = AppStore.listen(this._updateState);
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentUser) {
      this.context.router.transitionTo('/dashboard');
    }
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

HomeHandler.contextTypes = {
  router: React.PropTypes.func
};

HomeHandler.defaultProps = {
  currentUser: AppStore.getCurrentUser()
};