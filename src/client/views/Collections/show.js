import React, {Component, PropTypes} from 'react';
import Button from 'ui-components/src/Button';
import CollectionActionCreators from './actions/ActionCreators';
import CustomPropTypes from '../../utils/CustomPropTypes';
import DashboardContentHeader from '../../components/dashboard/DashboardContentHeader';
import DashboardContentWrapper from '../../components/dashboard/DashboardContentWrapper';
import DashboardQuote from '../../components/dashboard/DashboardQuote';
import DocumentPreviewCard from './components/DocumentPreviewCard';
import SearchBar from '../../components/ui/SearchBar';
import io from 'socket.io-client';
import RequireCollectionBeingViewed from './containers/RequireCollectionBeingViewed';
import styles from './styles/show.scss';

@RequireCollectionBeingViewed
export default class CollectionsShow extends Component {

  static displayName = 'CollectionsShow';

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

  state = {
    filter: null,
    sentStatus: 'Checking...'
  };

  componentDidMount() {
    // Remove?
    this.socket = io.connect('http://localhost:3000/collections');
    this.socket.on('connected', this._handleSocketConnection);
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
    this.context.dispatch(CollectionActionCreators.resetCollectionBeingViewed());
  }

  render() {
    const {collection} = this.props;

    return (
      <DashboardContentWrapper>
        <DashboardContentHeader className={styles.header}>
          <div>
            <h1>{collection.get('title')}</h1>
            <Button
              isPill={true}
              onClick={this._handleCreateDocuments}>
              Create Documents
            </Button>
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

  _handleCreateDocuments = () => {
    this.context.router.push(`/dashboard/collections/${this.props.params.id}/documents/new/choose_template`);
  };

  _handleFilterDocuments = () => {

  };

  _handleSocketConnection = () => {
    const {collection} = this.props;

    if (collection && collection.get('documents').every((d) => d.get('status') === 'sent' || d.get('status') === 'signed')) {
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
      <div className={styles.documents}>
        {documents.map((doc, i) => <DocumentPreviewCard doc={doc} key={i} />)}
      </div>
    );
  };

}
