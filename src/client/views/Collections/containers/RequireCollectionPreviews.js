import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import CollectionActionCreators from '../actions/ActionCreators';
import DashboardError from '../../../components/dashboard/DashboardError';
import DashboardSpinner from '../../../components/dashboard/DashboardSpinner';
import ImmutablePropTypes from 'react-immutable-proptypes';

// This containers fetches all the collection preview cards
// from the database
export default (ComposedComponent) => {

  class RequireCollectionPreviews extends PureComponent {

    static displayName = 'RequireCollectionPreviews';

    static propTypes = {
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      collectionPreviews: ImmutablePropTypes.listOf(CustomPropTypes.collectionPreview)
    };

    componentWillMount() {
      if (!this.props.fetched && !this.props.fetching) {
        this.context.dispatch(CollectionActionCreators.fetchPreviews());
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
    fetching: state.collectionIndex.get('fetching'),
    fetched: state.collectionIndex.get('fetched'),
    fetchError: state.collectionIndex.get('fetchError'),
    collectionPreviews: state.collectionIndex.get('collectionPreviews')
  }))(RequireCollectionPreviews);

};
