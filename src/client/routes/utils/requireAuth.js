import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

export default function requireAuth(ComposedComponent) {

  class AuthComponent extends Component {

    static contextTypes = {
      history: PropTypes.object.isRequired
    };

    static propTypes = {
      auth: ImmutablePropTypes.contains({
        user: ImmutablePropTypes.contains({
          _id: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          profilePictureUrl: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
          updatedAt: PropTypes.string.isRequired
        })
      }).isRequired
    };

    componentWillMount() {
      if (!Boolean(this.props.auth.get('user'))) {
        // Here we `pushState` and not `replaceState` so the user has the option to
        // navigate back to previous content if they wish
        this.context.history.pushState(null, '/join');
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.auth.get('user')) this.context.history.replaceState(null, '/');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  // maps the store state to our component props
  return connect((state) => ({
    auth: state.auth
  }))(AuthComponent);

}