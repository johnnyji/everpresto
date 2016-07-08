import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Clickable from '../ui/Clickable';
import CustomPropTypes from '../CustomPropTypes';
import Spinner from '../ui/Spinner';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class LandingPageHandler extends Component {

  // React Router history
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  componentWillMount() {
    if (this.props.currentUser) {
      // We replace state here when the user is authed, so the user can't navigate back to the landing page
      this.context.router.replace('/dashboard');
    }
  }

  render () {
    if (this.props.currentUser) return <Spinner />;

    return (
      <div>
        <Clickable onClick={this._handleLoginView}>Login</Clickable>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='/join'>Try for free!</Link>
      </div>
    );
  }

  _handleLoginView = () => {
    this.context.router.push('/login');
  }
}
