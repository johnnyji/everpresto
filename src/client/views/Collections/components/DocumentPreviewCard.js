import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import Clickable from 'ui-components/src/Clickable';
import GridViewCard from '../../../components/ui/GridViewCard';
import Icon from 'ui-components/src/Icon';
import {formatDateString} from '../../../utils/DateHelper';
import styles from '../styles/DocumentPreviewCard.scss';

const STATUSES = {
  created: {icon: 'schedule', text: 'Sending...'},
  sent: {icon: 'done', text: 'Email sent'},
  signed: {icon: 'done-all', text: 'Signed'}
};

export default class DocumentPreviewCard extends Component {

  static displayName = 'DocumentPreviewCard';

  static propTypes = {
    className: PropTypes.string,
    doc: CustomPropTypes.document.isRequired
  };

  render() {
    const {className, doc} = this.props;
    const iconClasses = classNames({[styles[`statusIcon-${doc.get('status')}`]]: STATUSES[doc.get('status')].icon});

    // TODO: Implement tooltip with status icon
    return (
      <GridViewCard className={className}>
        <header className={styles.header}>
          <h3>
            {doc.getIn(['signer', 'firstName'])} {doc.getIn(['signer', 'lastName'])}
          </h3>
          <div className={status}>
            <Icon className={iconClasses} name={status[doc.get('status')].icon} />
            <small>{status[doc.get('status')].text}</small>
          </div>
        </header>

        <section className={styles.body}>
          
        </section>

        <footer>
          {formatDateString(doc.get('createdAt'))}
          <Clickable onClick={this._handleSendReminderEmail}>
            <Icon name='refresh' /> Resend
          </Clickable>
        </footer>
      </GridViewCard>
    );
  }

  _handleSendReminderEmail = () => {

  }

}
