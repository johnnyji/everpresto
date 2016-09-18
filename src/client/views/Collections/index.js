import React, {Component, PropTypes} from 'react';
import Button from 'ui-components/src/Button';
import Clickable from 'ui-components/src/Clickable';
import Icon from 'ui-components/src/Icon';
import CollectionActionCreators from './actions/ActionCreators';
import CollectionPreviewCard from './components/CollectionPreviewCard';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import DashboardContentWrapper from '../../components/dashboard/DashboardContentWrapper';
import DashboardMessage from '../../components/dashboard/DashboardMessage';
import DashboardSpinner from '../../components/dashboard/DashboardSpinner';
import Folder from 'ui-components/src/Folder';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateActionCreators from '../../actions/TemplateActionCreators';
import RequireTemplates from '../Templates/containers/RequireTemplates';
import RequireCollectionPreviews from './containers/RequireCollectionPreviews';
import styles from './styles/index.scss';

@connect((state) => ({
  collectionBeingEdited: state.collectionsEdit.get('collection'),
  shouldFetchCollections: state.collectionsIndex.get('shouldFetchCollections'),
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
}))
@RequireTemplates
@RequireCollectionPreviews
export default class CollectionsIndex extends Component {

  static displayName = 'CollectionsIndex';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    collectionBeingEdited: CustomPropTypes.collectionLite,
    collections: ImmutablePropTypes.listOf(CustomPropTypes.collectionLite).isRequired,
    shouldFetchCollections: PropTypes.bool.isRequired,
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    // Fetches the templates and collections if needed, otherwise if the templates are already fetched, render the view.
    if (this.props.shouldFetchCollections) {
      return this.context.dispatch(CollectionActionCreators.fetchCollections());
    }
    if (this.props.shouldFetchTemplates) {
      return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }

  componentWillReceiveProps(nextProps) {
    // Fetches the templates and sets render view to true only if needed.
    if (nextProps.shouldFetchCollections) {
      return this.context.dispatch(CollectionActionCreators.fetchCollections());
    }
    if (nextProps.shouldFetchTemplates) {
      return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }

  componentWillUnmount() {
    this.context.dispatch(CollectionActionCreators.resetShouldFetchCollections());
  }

  render() {
    const {shouldFetchCollections, shouldFetchTemplates, templates} = this.props;

    if (shouldFetchTemplates || shouldFetchCollections) return <DashboardSpinner />;

    if (!shouldFetchTemplates && templates.size === 0) return this._renderCreateTemplateMessage();

    return (
      <DashboardContentWrapper className={styles.main}>
        <Folder
          className={styles.folder}
          contentClassName={styles.folderContent}
          height={150}
          width={200}>
          <Clickable
            className={styles.createIcon}
            onClick={this._createCollection}>
            <Icon name='add' size={48} />
          </Clickable>
        </Folder>
        {this._renderCollections()}
      </DashboardContentWrapper>
    );
  }

  _createCollection = () => {
    this.context.dispatch(CollectionActionCreators.createCollection());
  };

  _renderCollections = () => {
    const {collectionBeingEdited, collections} = this.props;

    return collections.map((collection, i) => {
      const isBeingEdited = collectionBeingEdited
        ? collectionBeingEdited.get('id') === collection.get('id')
        : false;
      return (
        <CollectionPreviewCard
          collection={collection}
          className={styles.folder}
          contentClassName={styles.folderContent}
          isBeingEdited={isBeingEdited}
          key={i} />
      );
    });
  };

  _renderCreateTemplateMessage = () => {
    return (
      <DashboardContentWrapper className={styles.main}>
        <DashboardMessage className={styles.createTemplate}>
          <div className={styles.createTemplateMessage}>
            Looks like you don't have any templates yet. Create one first so you can start sending documents for people to sign!
          </div>
          <Button onClick={this._navigateTemplateView}>Create a template</Button>
        </DashboardMessage>
      </DashboardContentWrapper>
    );
  }

  _navigateTemplateView = () => {
    this.context.router.push('/dashboard/templates');
  }

}