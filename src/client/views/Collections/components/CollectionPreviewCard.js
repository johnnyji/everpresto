import React, {Component, PropTypes} from 'react';
import appConfig from '../../../../shared/config/app';
import classNames from 'classnames';
import Clickable from 'ui-components/src/Clickable';
import CollectionActionCreators from '../actions/ActionCreators';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import Folder from 'ui-components/src/Folder';
import Icon from 'ui-components/src/Icon';
import moment from 'moment';
import styles from '../styles/CollectionPreviewCard.scss';
import {truncateString} from '../../../utils/TextHelper';

const DEFAULT_TITLE = appConfig.collection.defaultTitle;
const ENTER_KEY = 13;

export default class CollectionPreviewCard extends Component {

  static displayName = 'CollectionPreviewCard';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    collection: CustomPropTypes.collectionPreview.isRequired,
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
    const createdAt = moment(collection.get('createdAt')).format('MMM DD, YYYY');

    return (
      <Folder
        className={className}
        contentClassName={classNames(styles.content, contentClassName)}
        height={height}
        width={width}>
        {this._renderTitle()}
        <div className={styles.options}>
          <small className={styles.date}>{createdAt}</small>
          <div>
            <Clickable className={styles.icon} onClick={this._handleEditCollection}>
              <Icon name='edit' size={20} />
            </Clickable>
            <Clickable className={styles.icon} onClick={this._handleDeleteCollection}>
              <Icon name='close' size={20} />
            </Clickable>
          </div>
        </div>
      </Folder>
    );
  }

  _handleEditCollection = () => {
    this.context.dispatch(CollectionActionCreators.edit.set(this.props.collection));
  }

  _handleUpdateCollection = (event) => {
    const title = event.target.value || DEFAULT_TITLE;

    this.context.dispatch(
      CollectionActionCreators.edit.update(this.props.collection.get('id'), {title})
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
        CollectionActionCreators.delete.destroy(this.props.collection.get('id'))
      );
    }
  }

  _handleKeyPress = (event) => {
    if (event.which === ENTER_KEY) this._handleUpdateCollection(event);
  }

  _renderTitle = () => {
    const {collection, isBeingEdited, maxTitleLength} = this.props;
    const title = collection.get('title');

    if (isBeingEdited) {
      return (
        <input
          autoFocus
          className={styles.titleInput}
          defaultValue={title === DEFAULT_TITLE ? '' : title}
          onBlur={this._handleUpdateCollection}
          onKeyPress={this._handleKeyPress}
          ref='titleInput' />
      );
    }

    return (
      <button
        className={styles.title}
        onClick={this._handleEnterCollection}>
        {truncateString(title, maxTitleLength)}
      </button>
    );
  }

}
