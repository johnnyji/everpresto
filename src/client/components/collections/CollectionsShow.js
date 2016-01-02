import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';
import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import Button from '.././ui/Button';
import GridView from '.././ui/GridView';
import SearchBar from '.././ui/SearchBar';

import CollectionActionCreators from '../.././actions/CollectionActionCreators';

const displayName = 'CollectionsShow';
const SIGNED = 'signed';
const UNSIGNED = 'unsigned';

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

  constructor(props) {
    super(props);
    this.state = {
      filter: null
    };
  }

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
      <DashboardContentWrapper className={displayName}>
        <DashboardContentHeader className={`${displayName}-header`}>
          <div className={`${displayName}-header-options`}>
            <Button
              className={`${displayName}-header-options-create-button`}
              color='green'
              icon='add'
              onClick={this._handleCreateContract}
              text='Create Contract' />
            <Button
              className={`${displayName}-header-options-create-button`}
              color='green'
              icon='group-add'
              onClick={this._handleBatchCreateContract}
              text='Batch Create Contract' />
          </div>
          <SearchBar onUpdate={() => {}} />
        </DashboardContentHeader>
        {this._renderDocuments(collection)}
      </DashboardContentWrapper>
    );
  }

  _handleCreateContract = () => {

  }

  _handleBatchCreateContract = () => {

  }

  _renderDocuments = (collection) => {
    const documents = collection.get('documents');

    if (documents.size === 0) {
      return (
        <DashboardQuote
          author='Jedi Master Yoda'
          quote="If it's ease of workflow you seek, create contracts from templates you must!"/>
      );
    }

    return (
      <GridView>
        {documents.map((doc, i) => (
          <DocumentPreviewCard
            body={doc.get('body')}
            key={i}
            title={doc.get('title')}/>
        ))}
      </GridView>
    );
  }

}