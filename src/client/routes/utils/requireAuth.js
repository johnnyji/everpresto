import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../.././components/CustomPropTypes';

export default function requireAuth(ComposedComponent) {

  class AuthComponent extends Component {

    static contextTypes = {
      history: PropTypes.object.isRequired
    };

    static propTypes = {
      currentUser: CustomPropTypes.user
    };

    componentWillMount() {
      if (!Boolean(this.props.currentUser)) {
        // Here we `push` and not `replace` so the user has the option to
        // navigate back to previous content if they wish
        this.context.history.push('/join');
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.currentUser) this.context.history.replace('/');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  // maps the store state to our component props
  return connect((state) => ({
    currentUser: state.auth.get('user')
  }))(AuthComponent);

}