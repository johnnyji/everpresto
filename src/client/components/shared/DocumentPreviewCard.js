import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import GridViewItem from '.././ui/GridViewItem';
import {truncateString} from '../.././utils/TextHelper';

const displayName = 'DocumentPreviewCard';

export default class DocumentPreviewCard extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string,
    className: PropTypes.string,
    isGridViewItem: PropTypes.bool.isRequired,
    title: PropTypes.string,
    titleDisplayLength: PropTypes.number.isRequired
  };

  static defaultProps = {
    isGridViewItem: true,
    titleDisplayLength: 25
  };

  render() {
    const {className, isGridViewItem} = this.props;
    const classes = classNames(className, displayName);

    if (isGridViewItem) {
      return <GridViewItem className={classes}>{this._renderContent()}</GridViewItem>
    }

    return <div className={classes}>{this._renderContent()}</div>;
  }

  _renderContent = () => {
    const {body, children, onBodyClick, onTitleClick, title, titleDisplayLength} = this.props;

    return (
      <div>
        {title &&
          <header className={`${displayName}-header`} onClick={onTitleClick}>
            <h4 className={`${displayName}-header-title`}>{truncateString(title, titleDisplayLength)}</h4>
          </header>
        }
        {body &&
          <div
            className={`${displayName}-body`}
            dangerouslySetInnerHTML={{__html: body}}
            onClick={onBodyClick}/>
        }
        {children}
      </div>
    );
  }

}