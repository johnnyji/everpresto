import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import CollectionActionCreators from '../actions/ActionCreators';
import DashboardError from '../../../components/dashboard/DashboardError';
import DashboardSpinner from '../../../components/dashboard/DashboardSpinner';
import ImmutablePropTypes from 'react-immutable-proptypes';

// This containers fetches all the collection preview cards
// from the database
export default (ComposedComponent) => {

  class RequireCollectionPreviews extends Component {

    static displayName = 'RequireCollectionPreviews';

    static propTypes = {
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      collectionPreviews: ImmutablePropTypes.listOf(CustomPropTypes.collectionLite)
    };

    componentWillMount() {
      if (!this.props.fetched && !this.props.fetching) {
        this.context.dispatch(CollectionActionCreators.previews.fetch());
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
    fetching: state.collectionPreviews.get('fetching'),
    fetched: state.collectionPreviews.get('fetched'),
    fetchError: state.collectionPreviews.get('fetchError'),
    collectionPreviews: state.collectionPreviews.get('collections')
  }))(RequireCollectionPreviews);

};
