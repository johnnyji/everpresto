import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../.././components/CustomPropTypes';
import Spinner from 'ui-components/src/Spinner';

export default (ComposedComponent) => {

  class RequiresAuth extends Component {

    static displayName = 'RequiresAuth';

    static contextTypes = {
      router: PropTypes.shape({
        replace: PropTypes.func.isRequired
      }).isRequired
    };

    static propTypes = {
      currentUser: CustomPropTypes.user
    };

    componentWillMount() {
      if (!this.props.currentUser) {
        return this.context.router.replace('/join');
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
