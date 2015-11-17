import React, {PropTypes, Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux'
import {Link} from 'react-router';

@connect((state) => ({
  auth: state.auth
}))
export default class LandingPageHandler extends Component {

  // React Router history
  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.has('user')) {
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