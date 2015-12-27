import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

import ClickableIcon from '.././ui/ClickableIcon';
import FolderCard from '.././ui/FolderCard';

import AppActionCreators from '../.././actions/AppActionCreators';
import CollectionActionCreators from '../.././actions/CollectionActionCreators';

const displayName = 'CollectionPreviewCard';

const dateString = new Date();

export default class CollectionPreviewCard extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    collection: CustomPropTypes.collection.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 150,
    width: 200
  };

  render() {
    const {className, collection, contentClassName, height, width} = this.props;
    const classes = classNames(className, displayName);
    const contentClasses = classNames(contentClassName, `${displayName}-main`);
    const createdAt = moment(collection.get('createdAt')).format('MMM DD, YYYY');

    return (
      <FolderCard
        className={className}
        contentClassName={contentClasses}
        height={height}
        width={width}>
        <button
          className={`${displayName}-main-title`}
          onClick={this._handleEnterCollection}>
          {collection.get('title')}
        </button>
        <div className={`${displayName}-main-options`}>
          <small className={`${displayName}-main-options-date`}>{createdAt}</small>
          <div>
            <ClickableIcon
              className={`${displayName}-main-options-icon`}
              icon='create'
              onClick={this._handleEditCollection}
              size={20}/>
            <ClickableIcon
              className={`${displayName}-main-options-icon`}
              icon='delete'
              onClick={this._handleDeleteCollection}
              size={20}/>
          </div>
        </div>
      </FolderCard>
    );
  }

  _handleEditCollection = () => {
    // TODO: Make sure the user can edit the name of the collection
    // this.context.dispatch(
    //   AppActionCreators.createModal(
    //     <ModalInputField value={} onChange={} onSubmit={}/>
    //   )
    // );
  }

  _handleEnterCollection = () => {

  }

  _handleDeleteCollection = () => {
    const {collection} = this.props;
    const amountOfDocuments = collection.get('documents').size;
    const confirmMessage = amountOfDocuments === 0
      ? 'Are you sure you want to delete this folder? No backsies!'
      : `Are you sure you want to delete this folder? \n All ${amountOfDocuments} documents will be deleted!`;

    if (confirm(confirmMessage)) {
      this.context.dispatch(CollectionActionCreators.deleteCollection(collection.get('_id')));
    }
  }
}
