import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

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
    if (Boolean(this.props.currentUser)) {
      // We replace state here when the user is authed, so the user can't navigate back to the landing page
      this.context.router.replace('/dashboard');
    }
  }

  render () {
    return (
      <div>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='/join'>Try for free!</Link>
      </div>
    );
  }
}