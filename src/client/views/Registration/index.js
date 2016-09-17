import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import RegistrationForm from './components/RegistrationForm';
import Spinner from 'ui-components/src/Spinner';
import styles from './styles/index.scss';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class Registration extends PureComponent {

  static displayName = 'Registration';

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    if (this.props.currentUser) {
      this.context.router.replace('/dashboard');
    }
  }

  componentWillUpdate(nextProps) {
    const {currentUser} = this.props;
    const {currentUser: nextUser} = nextProps;

    // If there's currently no user, but there will be one coming up, redirect to dashboard
    if (!currentUser && nextUser) return this.context.router.replace('/dashboard');
    // If there's a current user and no next user, redirect to main page.
    if (currentUser && !nextUser) this.context.router.replace('/');
  }

  render() {
    // This is here to show a spinner while route redirects,
    // this route will not be visible if theres a currentUser session
    if (this.props.currentUser) return <Spinner />;


    return (
      <div className={styles.main}>
        <img className={styles.backgroundImage} src={require('../../../../public/images/registration.jpg')} />
        <RegistrationForm className={styles.form} />
      </div>
    );
  }
}
