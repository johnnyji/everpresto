import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DashboardMessage from '../components/dashboard/DashboardMessage';
import DashboardSpinner from '../components/shared/DashboardSpinner';
import DocumentSigningActionCreators from '../actions/DocumentSigningActionCreators';

export default (ComposedComponent) => {
  class RequiresDocumentForSigning extends Component {

    static displayName = 'RequiresDocumentForSigning';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      // TODO: Convert to `shape`
      location: PropTypes.object.isRequired
    };

    componentWillMount() {
      if (!this.props.fetching && !this.props.fetched) {
        debugger;
        dispatch(DocumentSigningActionCreators.fetchDocument());
      }
    }

    render() {
      const {fetching, fetched, fetchError, ...restProps} = this.props;

      if (fetched && fetchError) return <DashboardMessage>{fetchError}</DashboardMessage>;
      if (fetching) return <DashboardSpinner />;

      return <ComposedComponent {...restProps} />;
    }
  }

  return connect((state) => ({
    fetched: state.documentFetched.get('fetched'),
    fetchError: state.documentFetchError.get('fetchError'),
    fetching: state.documentFetching.get('fetching')
  }))(RequiresDocumentForSigning);

}

