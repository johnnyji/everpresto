import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

export default function requireAuth(ComponentToRender) {

  class AuthComponent extends Component {

    static contextTypes = {
      history: PropTypes.object.isRequired
    };

    static propTypes = {
      auth: ImmutablePropTypes.map.isRequired
    };

    componentWillMount() {
      if (!this.props.auth.has('user')) {
        // Here we `pushState` and not `replaceState` so the user has the option to
        // navigate back to previous content if they wish
        this.context.history.pushState(null, '/join');
      }
    }

    render() {
      return <ComponentToRender {...this.props} />;
    }

  }

  // maps the store state to our component props
  return connect((state) => ({
    auth: state.auth
  }))(AuthComponent);

}