import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createFlashMessage} from '../../actions/AppActionCreators';
import CustomPropTypes from '../.././components/CustomPropTypes';

export default (ComposedComponent) => {

  class RequiresAdmin extends Component {

    static displayName = 'RequiresAdmin';

    static contextTypes = {
      router: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired
    };

    static propTypes = {
      currentUser: CustomPropTypes.user.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (this.props.currentUser.get('clearanceLevel') !== 'admin') {
        // If they're not an admin, take them back to the collections view
        this.props.dispatch(createFlashMessage('red', 'Restricted to Admins Only'));
        this.context.router.push('/dashboard/collections');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.currentUser.get('clearanceLevel') !== 'admin') {
        // If they're not an admin, take them back to the collections view
        nextProps.dispatch(createFlashMessage('red', 'Restricted to Admins Only'));
        this.context.router.push('/dashboard/collections');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  return connect((state) => ({
    currentUser: state.auth.get('user')
  }))(RequiresAdmin);

};
