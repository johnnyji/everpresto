import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import CustomPropTypes from '.././CustomPropTypes';
import {truncateString} from '../.././utils/TextHelper';
import Config from '../.././config/main';

import CollectionActionCreators from '../.././actions/CollectionActionCreators';

import ClickableIcon from '.././ui/ClickableIcon';
import FolderCard from '.././ui/FolderCard';

const DEFAULT_TITLE = Config.collection.defaultTitle;
const ENTER_KEY = 13;
const displayName = 'CollectionPreviewCard';

export default class CollectionPreviewCard extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    collection: CustomPropTypes.collectionLite.isRequired,
    height: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    maxTitleLength: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 150,
    maxTitleLength: 65,
    width: 200
  };

  render() {
    const {className, collection, contentClassName, height, width} = this.props;
    const classes = classNames(className, displayName);
    const contentClasses = classNames(contentClassName, `${displayName}-main`);
    const createdAt = moment(collection.get('createdAt')).format('MMM DD, YYYY');

    return (
      <FolderCard
        className={classes}
        contentClassName={contentClasses}
        height={height}
        width={width}>
        {this._renderTitle()}
        <div className={`${displayName}-main-options`}>
          <small className={`${displayName}-main-options-date`}>{createdAt}</small>
          <div>
            <ClickableIcon
              className={`${displayName}-main-options-icon`}
              icon='create'
              onClick={this._handleEditCollection}
              size={20} />
            <ClickableIcon
              className={`${displayName}-main-options-icon`}
              icon='delete'
              onClick={this._handleDeleteCollection}
              size={20} />
          </div>
        </div>
      </FolderCard>
    );
  }

  _handleEditCollection = () => {
    this.context.dispatch(
      CollectionActionCreators.setCollectionBeingEdited(this.props.collection)
    );
  }

  _handleUpdateCollection = (event) => {
    const title = event.target.value || DEFAULT_TITLE;

    this.context.dispatch(
      CollectionActionCreators.updateCollection(
        this.props.collection.get('id'),
        {title}
      )
    );
  }

  _handleEnterCollection = () => {
    this.context.router.push(`/dashboard/collections/${this.props.collection.get('id')}`);
  }

  _handleDeleteCollection = () => {
    // TODO: Add message saying how many documents are in this collection
    const confirmMessage = 'Are you sure you want to delete this folder? All it\'s documents will be deleted as well!';

    if (confirm(confirmMessage)) {
      return this.context.dispatch(
        CollectionActionCreators.deleteCollection(this.props.collection.get('id'))
      );
    }
  }

  _handleKeyPress = (e) => {
    if (e.which === ENTER_KEY) this._handleUpdateCollection(e.target.value);
  }

  _renderTitle = () => {
    const {collection, isBeingEdited, maxTitleLength} = this.props;
    const title = collection.get('title');

    if (isBeingEdited) {
      return (
        <input
          autoFocus
          className={`${displayName}-main-title-input`}
          defaultValue={title === DEFAULT_TITLE ? '' : title}
          onKeyPress={this._handleKeyPress}
          onBlur={this._handleUpdateCollection}
          ref='titleInput' />
      );
    }
    
    return (
      <button
        className={`${displayName}-main-title`}
        onClick={this._handleEnterCollection}>
        {truncateString(title, maxTitleLength)}
      </button>
    );
  }

}
