import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';
import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import Button from '.././ui/Button';
import SearchBar from '.././ui/SearchBar';
import {matchesAttr} from '../.././utils/immutable/IterableFunctions'

import CollectionActionCreators from '../.././actions/CollectionActionCreators';

const displayName = 'CollectionsShow';
const isSent = matchesAttr('status', /(^sent$|^signed$)/);

@connect((state) => ({
  collection: state.collections.get('collectionBeingViewed')
}))
export default class CollectionsShow extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
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
      filter: null,
      sentStatus: 'Checking...'
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

  componentDidMount() {
    this.socket = io.connect('http://localhost:3000/collections');
    this.socket.on('connected', this._handleSocketConnection);
  }

  componentWillUnmount() {
    this.context.dispatch(
      CollectionActionCreators.resetCollectionBeingViewed()
    );
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
              icon='group-add'
              onClick={this._handleCreateDocument}
              text='Create Documents' />
          </div>
          <SearchBar
            label={this.state.count}
            focusLabel='Yay, a new friend!'
            onUpdate={this._handleFilterDocuments} />
        </DashboardContentHeader>
        {this._renderDocuments(collection)}
      </DashboardContentWrapper>
    );
  }

  _handleCreateDocument = () => {
    this.context.router.push(`/dashboard/documents/${this.props.params.id}/new`);
  };

  _handleFilterDocuments = () => {

  };

  _handleSocketConnection = () => {
    const {collection} = this.props;

    if (collection && collection.get('documents').every(isSent)) {
      return this.setState({sentStatus: 'All Sent'});
    }

    this.socket.emit()
  };

  _renderDocuments = (collection) => {
    const documents = collection.get('documents');

    if (documents.size === 0) {
      return (
        <DashboardQuote
          author='Jedi Master Yoda'
          quote="If it's ease of workflow you seek, create from templates you must!"/>
      );
    }

    return (
      <div className={`${displayName}-documents`}>
        {documents.map((doc, i) => (
          <DocumentPreviewCard
            body={doc.get('body')}
            key={i}
            title={doc.get('title')}/>
        ))}
      </div>
    );
  };

}