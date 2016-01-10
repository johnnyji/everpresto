import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

import DashboardSpinner from '.././shared/DashboardSpinner';
import Button from '.././ui/Button';
import ClickableIcon from '.././ui/ClickableIcon';
import FolderCard from '.././ui/FolderCard';
import GridView from '.././ui/GridView';
import GridViewItem from '.././ui/GridViewItem';
import CollectionPreviewCard from './CollectionPreviewCard';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardMessage from '.././dashboard/DashboardMessage';
import ModalCreateCollection from '.././modals/ModalCreateCollection';

import AppActionCreators from '../.././actions/AppActionCreators';
import CollectionActionCreators from '../.././actions/CollectionActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'CollectionsIndex';

@connect((state) => ({
  collectionBeingEdited: state.collections.get('collectionBeingEdited'),
  collections: state.collections.get('collections'),
  shouldFetchCollections: state.collections.get('shouldFetchCollections'),
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templates: state.templates.get('templates')
}))
export default class CollectionsIndex extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    collectionBeingEdited: CustomPropTypes.collection,
    collections: ImmutablePropTypes.listOf(CustomPropTypes.collection).isRequired,
    shouldFetchCollections: PropTypes.bool.isRequired,
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    // Fetches the templates and collections if needed, otherwise if the templates are already fetched, render the view.
    if (this.props.shouldFetchCollections) return this.context.dispatch(CollectionActionCreators.fetchCollections());
    if (this.props.shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  componentWillReceiveProps(nextProps) {
    // Fetches the templates and sets render view to true only if needed.
    if (nextProps.shouldFetchCollections) return this.context.dispatch(CollectionActionCreators.fetchCollections());
    if (nextProps.shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  componentWillUnmount() {
    this.context.dispatch(CollectionActionCreators.resetShouldFetchCollections());
  }

  render() {
    const {shouldFetchCollections, shouldFetchTemplates, templates} = this.props;

    if (shouldFetchTemplates || shouldFetchCollections) return <DashboardSpinner />;

    if (!shouldFetchTemplates && templates.size === 0) return this._renderCreateTemplateMessage();

    return (
      <DashboardContentWrapper className={displayName}>
        <GridView className={`${displayName}-folders`}>
          <GridViewItem isCard={false}>
            <FolderCard
              className={`${displayName}-folders-folder`}
              contentClassName={`${displayName}-folders-folder-main`}
              height={150}
              width={200}>
              <ClickableIcon
                className={`${displayName}-folders-folder-main-create-icon`}
                icon='add'
                isWhite={true}
                onClick={this._createCollection}
                size={48}/>
            </FolderCard>
          </GridViewItem>
          {this._renderCollections()}
        </GridView>
      </DashboardContentWrapper>
    );
  }

  _createBlankCollection = () => {
    this.context.dispatch(CollectionActionCreators.createCollection());
  }

  _createCollection = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalCreateCollection
          onCreateBlank={this._createBlankCollection}
          onCreatePopulated={this._createPopulatedCollection}/>
      )
    );
  }

  _createPopulatedCollection = () => {
    console.log('populated!');
  }

  _renderCollections = () => {
    const {collectionBeingEdited, collections} = this.props;

    return collections.map((collection, i) => {
      const isBeingEdited = Boolean(collectionBeingEdited)
        ? collectionBeingEdited.get('_id') === collection.get('_id')
        : false;
      return (
        <GridViewItem key={i} isCard={false}>
          <CollectionPreviewCard
            collection={collection}
            className={`${displayName}-folders-folder`}
            contentClassName={`${displayName}-folders-folder-main`}
            isBeingEdited={isBeingEdited}/>
        </GridViewItem>
      );
    });
  }

  _renderCreateTemplateMessage = () => {
    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardMessage className={`${displayName}-create-template`}>
          <span className={`${displayName}-create-template-message`}>
            Looks like you don't have any templates yet. Create one first so you can start sending documents for people to sign!
          </span>
          <Button
            className={`${displayName}-create-template-button`}
            color='green'
            onClick={this._navigateNewTemplateView}
            text='Create a Template!'/>
        </DashboardMessage>
      </DashboardContentWrapper>
    );
  }

  _navigateNewTemplateView = () => {
    this.context.history.push('/dashboard/templates/new');
  }

}