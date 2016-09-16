import React, {PropTypes, PureComponent} from 'react';
import Clickable from 'ui-components/src/Clickable';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import {Link} from 'react-router';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class LandingPage extends PureComponent {

  static displayName = 'LandingPage';

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  static contextTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    if (this.props.currentUser) {
      this.context.router.replace('/dashboard');
    }
  }

  componentWillReceiveProps({currentUser}) {
    if (!this.props.currentUser && currentUser) {
      this.context.router.replace('/dashboard');
    }
  }

  render () {
    return (
      <div>
        <Link to='/login'>Login</Link>
        <h1>Everpresto</h1>
        <Link to='/join'>Try for free!</Link>
      </div>
    );
  }

  _handleLoginView = () => {
    this.context.router.push('/login');
  };

}
