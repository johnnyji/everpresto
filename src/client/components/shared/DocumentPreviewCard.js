import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ClickableIcon from '.././ui/ClickableIcon';
import GridViewItem from '.././ui/GridViewItem';
import {truncateString} from '../.././utils/TextHelper';

const displayName = 'DocumentPreviewCard';

export default class DocumentPreviewCard extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    isNewCard: PropTypes.bool.isRequired,
    isGridViewItem: PropTypes.bool.isRequired,
    onNewIconClick: PropTypes.func,
    title: PropTypes.string,
    titleDisplayLength: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 300,
    isNewCard: false,
    isGridViewItem: true,
    titleDisplayLength: 25
  };

  render() {
    const {className, height, isGridViewItem} = this.props;
    const classes = classNames(className, displayName);
    const style = {height: `${height}px`};

    if (isGridViewItem) {
      return <GridViewItem className={classes} style={style}>{this._renderContent()}</GridViewItem>
    }

    return <div className={classes} style={style}>{this._renderContent()}</div>;
  }

  _renderContent = () => {
    const {
      body,
      children,
      isNewCard,
      onBodyClick,
      onNewIconClick,
      onTitleClick,
      title,
      titleDisplayLength} = this.props;

    if (isNewCard) {
      return (
        <ClickableIcon
          className={`${displayName}-new-button`}
          icon='add'
          onClick={onNewIconClick}
          size={70}/>
      );
    }

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
        {children &&
          <div className={`${displayName}-options`}>
            {children}
          </div>
        }
      </div>
    );
  }

}