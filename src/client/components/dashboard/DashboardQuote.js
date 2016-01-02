import React, {PropTypes} from 'react';
import DashboardMessage from './DashboardMessage';

const displayName = 'DashboardQuote';

const DashboardQuote = ({className, quote, author}) => (
  <DashboardMessage className={displayName}>
    <div className={`${displayName}-quote`}>
      <p className={`${displayName}-quote-message`}>{quote}</p>
      <small className={`${displayName}-quote-author`}>- {author}</small>
    </div>
  </DashboardMessage>
);

DashboardQuote.displayName = displayName;
DashboardQuote.propTypes = {
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired
};
DashboardQuote.defaultProps = {
  author: 'Anonoymous'
};

export default DashboardQuote;