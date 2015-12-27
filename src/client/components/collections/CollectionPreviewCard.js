import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ClickableIcon from '.././ui/ClickableIcon';
import FolderCard from '.././ui/FolderCard';

import AppActionCreators from '../.././actions/AppActionCreators';

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
    collection: ImmutablePropTypes.map,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    collection: Immutable.fromJS({
      createdAt: dateString.toString(),
      documents: [1,2,2,2,2,2],
      title: 'Employee Wage Contracts'
    }),
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
          <ClickableIcon icon='delete' onClick={this._handleDeleteCollection}/>
        </div>
      </FolderCard>
    );
  }

  _handleEnterCollection = () => {

  }

  _handleDeleteCollection = () => {
    const confirmDelete = confirm(`Are you sure you want to delete this folder? \n All ${this.props.collection.get('documents').size} documents will be deleted!`);

    if (confirmDelete) {
      this.context.dispatch(AppActionCreators.createFlashMessage('green', 'Deleted!'));
    }
  }
}
