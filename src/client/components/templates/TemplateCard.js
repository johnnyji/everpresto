/* eslint-disable react/no-danger */
import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import ClickableIcon from '.././ui/ClickableIcon';
import GridViewCard from '.././ui/GridViewCard';
import {truncateString} from '../.././utils/TextHelper';

const displayName = 'TemplateCard';

@pureRender
export default class TemplateCard extends Component {

  static displayName = displayName;

  static propTypes = {
    body: PropTypes.string,
    className: PropTypes.string,
    defaultTitle: PropTypes.string.isRequired,
    isNewCard: PropTypes.bool.isRequired,
    onBodyClick: PropTypes.func,
    onNewIconClick: PropTypes.func,
    onTitleClick: PropTypes.func,
    title: PropTypes.string,
    titleDisplayLength: PropTypes.number.isRequired
  };

  static defaultProps = {
    defaultTitle: 'Untitled',
    isNewCard: false,
    titleDisplayLength: 25
  };

  render() {
    if (this.props.isNewCard) return this._renderNewCard();
    return this._renderCard();
  }

  _renderCard = () => {
    const {
      body,
      children,
      defaultTitle,
      onBodyClick,
      onTitleClick,
      title,
      titleDisplayLength
    } = this.props;

    return (
      <GridViewCard className={classNames(this.props.className, displayName)}>
        <header className={`${displayName}-header`} onClick={onTitleClick}>
          <h4 className={`${displayName}-header-title`}>
            {title ? truncateString(title, titleDisplayLength) : defaultTitle}
          </h4>
        </header>
        <div
          className={`${displayName}-body`}
          dangerouslySetInnerHTML={{__html: body || '<div></div>'}}
          onClick={onBodyClick} />
        {children &&
          <div className={`${displayName}-options`}>
            {children}
          </div>
        }
      </GridViewCard>
    );
  };

  _renderNewCard = () => {
    return (
      <GridViewCard className={classNames(this.props.className, displayName)}>
        <ClickableIcon
          className={`${displayName}-new-button`}
          icon='add'
          onClick={this.props.onNewIconClick}
          size={70} />
      </GridViewCard>
    );
  };

}
/* eslint-disable react/no-danger */