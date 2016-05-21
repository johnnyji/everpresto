import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-ProgressBar';

/*
 * A progress/loading bar component
 */
export default class ProgressBar extends Component {

  static displayName = displayName;

  static propTypes = {
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']).isRequired,
    progressCount: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired
  };

  static defaultProps = {
    color: 'blue'
  };
  
  render() {
    const {className, color} = this.props;
    const progressBarClasses = classNames(
      `${displayName}-progress-section`,
      `${displayName}-progress-section-${color}`
    );

    return (
      <div className={classNames(displayName, className)}>
        <div className={progressBarClasses} style={{width: this._calculateProgessBarWidth()}} />
      </div>
    );
  }

  /**
   * Calculates how wide the completed progress section of the progress bar should be
   * compared to the entire bar. This is based on the width of the entire bar and the
   * current progressCount/totalCount
   * @returns {String} - The width in percentages of the completed progress bar width
   */
  _calculateProgessBarWidth = () => {
  };

}

