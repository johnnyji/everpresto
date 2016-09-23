import React, {Component, PropTypes} from 'react';
import Button from 'ui-components/src/Button';
import Clickable from 'ui-components/src/Clickable';
import CollectionActionCreators from './actions/ActionCreators';
import CollectionPreviewCard from './components/CollectionPreviewCard';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import DashboardContentWrapper from '../../components/dashboard/DashboardContentWrapper';
import DashboardMessage from '../../components/dashboard/DashboardMessage';
import Icon from 'ui-components/src/Icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Folder from 'ui-components/src/Folder';
import RequireTemplates from '../Templates/containers/RequireTemplates';
import RequireCollectionPreviews from './containers/RequireCollectionPreviews';
import styles from './styles/index.scss';

@connect((state) => ({
  collectionBeingEdited: state.collectionsEdit.get('collection')
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
    collectionBeingEdited: CustomPropTypes.collectionPreview,
    collectionPreviews: ImmutablePropTypes.listOf(CustomPropTypes.collectionPreview).isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  render() {
    // If there are no templates to begin with, we want to show the user
    // a onboarding message
    if (!this.props.templates.size) return this._renderCreateTemplateMessage();

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
    this.context.dispatch(CollectionActionCreators.new.create());
  };

  _renderCollections = () => {
    const {collectionBeingEdited, collectionPreviews: collections} = this.props;

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
    // TODO: Graphic needed here
    return (
      <DashboardContentWrapper className={styles.main}>
        <DashboardMessage className={styles.createTemplate}>
          <div className={styles.createTemplateMessage}>
            Looks like you don't have any templates yet. Create one first so you can start sending documents for people to sign!
          </div>
          <Button onClick={this._navigateTemplateView}>Create a Template</Button>
        </DashboardMessage>
      </DashboardContentWrapper>
    );
  }

  _navigateTemplateView = () => {
    this.context.router.push('/dashboard/templates');
  }

}
