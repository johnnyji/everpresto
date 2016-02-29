import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from '.././ui/Card';
import ClickableIcon from '.././ui/ClickableIcon';
import {truncateString} from '../.././utils/TextHelper';

const displayName = 'DocumentPreviewCard';

export default class DocumentPreviewCard extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number,
    isNewCard: PropTypes.bool.isRequired,
    onNewIconClick: PropTypes.func,
    title: PropTypes.string,
    titleDisplayLength: PropTypes.number.isRequired
  };

  static defaultProps = {
    defaultTitle: 'Untitled',
    height: 300,
    isNewCard: false,
    titleDisplayLength: 25
  };

  render() {
    const {className, height} = this.props;
    const classes = classNames(className, displayName);
    const style = {height: `${height}px`};

    return <Card className={classes} style={style}>{this._renderContent()}</Card>;
  }

  _renderContent = () => {
    const {
      body,
      children,
      defaultTitle,
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
        <header className={`${displayName}-header`} onClick={onTitleClick}>
          <h4 className={`${displayName}-header-title`}>
            {title ? truncateString(title, titleDisplayLength) : defaultTitle}
          </h4>
        </header>
        <div
          className={`${displayName}-body`}
          dangerouslySetInnerHTML={{__html: body || '<div></div>'}}
          onClick={onBodyClick}/>
        {children &&
          <div className={`${displayName}-options`}>
            {children}
          </div>
        }
      </div>
    );
  }

}