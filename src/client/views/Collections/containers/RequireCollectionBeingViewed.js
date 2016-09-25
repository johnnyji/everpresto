import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import CollectionActionCreators from '../actions/ActionCreators';
import DashboardError from '../../../components/dashboard/DashboardError';
import DashboardSpinner from '../../../components/dashboard/DashboardSpinner';

// This containers fetches all the collection preview cards
// from the database
export default (ComposedComponent) => {

  class RequireCollectionPreviews extends PureComponent {

    static displayName = 'RequireCollectionPreviews';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      collection: CustomPropTypes.collection,
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    };

    componentWillMount() {
      debugger;
      if (!this.props.fetched && !this.props.fetching) {
        debugger;
        this.props.dispatch(CollectionActionCreators.show.fetch(this.props.params.id));
      }
    }

    render() {
      const {fetched, fetching, fetchError, ...restProps} = this.props;

      if (fetchError) return <DashboardError>{fetchError}</DashboardError>;
      if (fetching && !fetched) return <DashboardSpinner />;

      return (
        <ComposedComponent {...restProps} />
      );
    }

  }

  return connect((state) => ({
    fetching: state.collectionsIndex.get('fetching'),
    fetched: state.collectionsIndex.get('fetched'),
    fetchError: state.collectionsIndex.get('fetchError'),
    collectionPreviews: state.collectionsIndex.get('collectionPreviews')
  }))(RequireCollectionPreviews);

};
