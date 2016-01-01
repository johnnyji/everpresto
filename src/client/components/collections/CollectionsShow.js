import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardSpinner from '.././shared/DashboardSpinner';

import CollectionActionCreators from '../.././actions/CollectionActionCreators';

const displayName = 'CollectionsShow';

@connect((state) => ({
  collection: state.collections.get('collectionBeingViewed')
}))
export default class CollectionsShow extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    collection: ImmutablePropTypes.contains({
      _company: PropTypes.string.isRequired,
      _creator: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      documents: ImmutablePropTypes.listOf(CustomPropTypes.document).isRequired,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  };

  componentWillMount() {
    // If the collection being viewed do not exist, fetch them
    if (!this.props.collection) {
      this.context.dispatch(
        CollectionActionCreators.fetchCollectionBeingViewed(this.props.params.id)
      );
    }
  }

  componentWillUnmount() {
    CollectionActionCreators.resetCollectionBeingViewed();
  }

  render() {
    const {collection} = this.props;

    if (!collection) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper>
        {collection.get('documents').size}
      </DashboardContentWrapper>
    );
  }
}
