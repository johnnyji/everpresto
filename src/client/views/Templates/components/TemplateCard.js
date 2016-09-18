/* eslint-disable react/no-danger */
import React, {PropTypes, PureComponent} from 'react';
import Clickable from 'ui-components/src/Clickable';
import GridViewCard from '../../../components/ui/GridViewCard';
import Icon from 'ui-components/src/Icon';
import styles from '../styles/TemplateCard.scss';
import {truncateString} from '../../../utils/TextHelper';

export default class TemplateCard extends PureComponent {

  static displayName = 'TemplateCard';

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
      className,
      defaultTitle,
      onBodyClick,
      onTitleClick,
      title,
      titleDisplayLength
    } = this.props;

    return (
      <GridViewCard className={className}>
        <header className={styles.header} onClick={onTitleClick}>
          <h4 className={styles.headerTitle}>
            {title ? truncateString(title, titleDisplayLength) : defaultTitle}
          </h4>
        </header>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{__html: body || '<div></div>'}}
          onClick={onBodyClick} />
        {children &&
          <div className={styles.options}>
            {children}
          </div>
        }
      </GridViewCard>
    );
  };

  _renderNewCard = () => {
    return (
      <GridViewCard className={this.props.className}>
        <Clickable
          className={styles.newButton}
          icon='add'
          onClick={this.props.onNewIconClick}>
          <Icon name='add' size={72} />
        </Clickable>
      </GridViewCard>
    );
  };

}
/* eslint-disable react/no-danger */
