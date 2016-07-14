import React, {Component, PropTypes} from 'react';
import Button from '.././ui/Button';
import CollectionActionCreators from '../.././actions/CollectionActionCreators';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';
import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentCard from '.././documents/DocumentCard';
import SearchBar from '.././ui/SearchBar';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {matchesAttr} from '../.././utils/immutable/IterableFunctions';

const displayName = 'CollectionsShow';
const isSent = matchesAttr('status', /(^sent$|^signed$)/);

@connect((state) => ({
  collection: state.collectionsShow.get('collection')
}))
export default class CollectionsShow extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    collection: CustomPropTypes.collection,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      sentStatus: 'Checking...'
    };
  }

  componentWillMount() {
    // If the collection being viewed do not exist, fetch it
    if (!this.props.collection) {
      this.context.dispatch(
        CollectionActionCreators.fetchCollectionBeingViewed(this.props.params.id)
      );
    }
  }

  componentDidMount() {
    // Remove?
    this.socket = io.connect('http://localhost:3000/collections');
    this.socket.on('connected', this._handleSocketConnection);
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
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
            label="I'm lonely..."
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
  };

  _renderDocuments = (collection) => {
    const documents = collection.get('documents');

    if (!documents.size) {
      return (
        <DashboardQuote
          author='Jedi Master Yoda'
          quote="If it's ease of workflow you seek, create from templates you must!" />
      );
    }

    return (
      <div className={`${displayName}-documents`}>
        {documents.map((doc, i) => <DocumentCard doc={doc} key={i} />)}
      </div>
    );
  };

}
