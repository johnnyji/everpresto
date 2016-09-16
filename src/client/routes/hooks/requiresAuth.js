import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../.././components/CustomPropTypes';
import Spinner from 'ui-components/src/Spinner';

export default (ComposedComponent) => {

  class RequiresAuth extends Component {

    static displayName = 'RequiresAuth';

    static contextTypes = {
      router: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }).isRequired
    };

    static propTypes = {
      currentUser: CustomPropTypes.user
    };

    componentWillMount() {
      if (!this.props.currentUser) {
        // Here we `push` and not `replace` so the user has the option to
        // navigate back to previous content if they wish
        return this.context.router.push('/join');
      }
    }

    componentWillReceiveProps({currentUser}) {
      if (!currentUser) this.context.router.replace('/');
    }

    render() {
      if (!this.props.currentUser) return <Spinner />;
      return <ComposedComponent {...this.props} />;
    }

  }

  return connect((state) => ({
    currentUser: state.auth.get('user')
  }))(RequiresAuth);

};
