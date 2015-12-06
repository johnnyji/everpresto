import React, {PropTypes, Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux'
import {Link} from 'react-router';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class LandingPageHandler extends Component {

  // React Router history
  static contextTypes = { 
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: ImmutablePropTypes.contains({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired
    })
  };

  componentWillMount() {
    if (Boolean(this.props.currentUser)) {
      // We replace state here so the user is authed, so the user can't navigate back to the landing page
      this.context.history.replaceState(null, '/dashboard');
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