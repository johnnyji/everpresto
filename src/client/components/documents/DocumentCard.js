import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import CustomPropTypes from '.././CustomPropTypes';
import GridViewCard from '.././ui/GridViewCard';
import Icon from '.././ui/Icon';
import {formatDateString} from '../.././utils/DateHelper';

const displayName = 'DocumentCard';

export default class DocumentCard extends Component {
  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    doc: CustomPropTypes.document.isRequired
  };

  render() {
    const {className, doc} = this.props;
    const classes = classNames({
      [className]: className,
      [displayName]: true
    });
    const status = {
      created: {icon: 'schedule', text: 'Sending...'},
      sent: {icon: 'done',text: 'Email sent'},
      signed: {icon: 'done-all', text: 'Signed'}
    };
    const iconClasses = classNames({
      [`${displayName}-header-status-icon`]: true,
      [`${displayName}-header-status-icon-sent`]: doc.get('status') === 'sent'
    })

    return (
      <GridViewCard className={classes}>
        <header className={`${displayName}-header`}>
          <h3 className={`${displayName}-header-signer`}>
            {doc.getIn(['signer', 'firstName'])} {doc.getIn(['signer', 'lastName'])}
          </h3>
          <div className={`${displayName}-header-status`}>
            <Icon
              icon={status[doc.get('status')].icon}
              iconClass={iconClasses}/>
            <small className={`${displayName}-header-status-text`}>
              {status[doc.get('status')].text}
            </small>
          </div>
        </header>
        <small>{formatDateString(doc.get('createdAt'))}</small>
      </GridViewCard>
    );
  }
}