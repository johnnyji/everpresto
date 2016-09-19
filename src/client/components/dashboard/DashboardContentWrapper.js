import React, {PropTypes, PureComponent} from 'react';
import AppContentWrapper from '../app/AppContentWrapper';
import classNames from 'classnames';
import menuConfig from '../../config/menu';
import ProgressBar from 'ui-components/src/ProgressBar';
import styles from './styles/DashboardContentWrapper';

export default class DashboardContentWrapper extends PureComponent {

  static displayName = 'DashboardContentWrapper';

  static propTypes = {
    className: PropTypes.string,
    progressBarProgressCount: PropTypes.number.isRequired,
    progressBarTotalCount: PropTypes.number.isRequired,
    showProgressBar: PropTypes.bool.isRequired
  };

  static defaultProps = {
    progressBarProgressCount: 0,
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

    const contentClasses = classNames(styles.content, className);

    return (
      <div className={styles.main} id={menuConfig.pageWrapId}>
        {showProgressBar &&
          <ProgressBar
            progressCount={progressBarProgressCount}
            totalCount={progressBarTotalCount} />
        }
        {!showProgressBar &&
          <div className={styles.progressBarFiller} />
        }
        <AppContentWrapper className={contentClasses}>
          {this.props.children}
        </AppContentWrapper>
      </div>
    );
  }

}
