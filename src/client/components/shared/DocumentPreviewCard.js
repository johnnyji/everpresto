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
    title: PropTypes.string,
    titleDisplayLength: PropTypes.number.isRequired
  };

  static defaultProps = {
    titleDisplayLength: 25
  }

  render() {
    const {body, children, className, title} = this.props;
    const classes = classNames(className, displayName);
    // DO NOT REMOVE: This is used for the `create` cards
    if (!body && !title && children) return <GridViewItem className={classes}>{children}</GridViewItem>;

    const {onBodyClick, onTitleClick, titleDisplayLength} = this.props;
    const titlePreview = truncateString(title, titleDisplayLength);

    return (
      <GridViewItem className={classes}>
        <header className={`${displayName}-header`} onClick={onTitleClick}>
          <h4 className={`${displayName}-header-title`}>{titlePreview}</h4>
        </header>
        <div
          className={`${displayName}-body`}
          dangerouslySetInnerHTML={{__html: body}}
          onClick={onBodyClick}/>
        {children}
      </GridViewItem>
    );
  }

}