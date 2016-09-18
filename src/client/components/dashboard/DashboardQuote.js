import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import DashboardMessage from './DashboardMessage';
import styles from './styles/DashboardQuote.scss';

// This is the random quotes that shows up on the dashboard
// for the user when the dashboard is empty
export default class DashboardQuote extends PureComponent {

  static displayName = 'DashboardQuote';

  static propTypes = {
    author: PropTypes.string.isRequired,
    className: PropTypes.string,
    quote: PropTypes.string.isRequired
  };

  static defaultProps = {
    author: 'Anonoymous'
  };

  render() {
    const {author, className, quote} = this.props;

    return (
      <DashboardMessage className={classNames(styles.main, className)}>
        <div className={styles.quote}>
          <p className={styles.message}>{quote}</p>
          {author && <small>- {author}</small>}
        </div>
      </DashboardMessage>
    );
  }

}