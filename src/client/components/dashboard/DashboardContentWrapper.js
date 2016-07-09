import React, {Component, PropTypes} from 'react';
import AppContentWrapper from '../app/AppContentWrapper';
import classNames from 'classnames';
import ProgressBar from '../ui/ProgressBar';

const displayName = 'DashboardContentWrapper';

export default class DashboardContentWrapper extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    progressBarProgressCount: PropTypes.number.isRequired,
    progressBarTotalCount: PropTypes.number.isRequired,
    showProgressBar: PropTypes.bool.isRequired
  };

  static defaultProps = {
    progressBarProgressCount: 12,
    progressBarTotalCount: 100,
    showProgressBar: false
  };

  render() {
    const {
      className,
      progressBarProgressCount,
      progressBarTotalCount,
      showProgressBar
    } = this.props;
    const contentClasses = classNames(
      className,
      `${displayName}-content`
    );


    return (
      <AppContentWrapper className={displayName}>
        {showProgressBar &&
          <ProgressBar
            className={`${displayName}-progress-bar`}
            height={6}
            progressCount={progressBarProgressCount}
            totalCount={progressBarTotalCount}
            width='100%' />
        }
        {!showProgressBar && <div className={`${displayName}-progess-bar-fillter`} />}
        <div className={contentClasses}>{this.props.children}</div>
      </AppContentWrapper>
    );
  }

}
