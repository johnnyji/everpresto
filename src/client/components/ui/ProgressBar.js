import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-ProgressBar';

/*
 * A progress/loading bar component
 */
export default class ProgressBar extends Component {

  static displayName = displayName;

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']).isRequired,
    height: PropTypes.number.isRequired,
    progressCount: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    backgroundColor: '#FFF',
    color: 'blue'
  };
  
  render() {
    const {
      backgroundColor,
      className,
      color,
      progressCount,
      style,
      totalCount
    } = this.props;
    const progressBarClasses = classNames(
      `${displayName}-progress-section`,
      `${displayName}-progress-section-${color}`
    );
    const progressBarPercentage = (progressCount / totalCount) * 100;

    return (
      <div className={classNames(displayName, className)} style={{...style, backgroundColor}}>
        <div className={progressBarClasses} style={{width: `${progressBarPercentage}%`}} />
      </div>
    );
  }

}

