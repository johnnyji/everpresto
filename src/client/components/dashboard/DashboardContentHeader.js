import React, {PropTypes, PureComponent} from 'react';
import AppContentWrapper from '../app/AppContentWrapper';
import classNames from 'classnames';
import styles from './styles/DashboardContentHeader.scss';

export default class DashboardContentHeader extends PureComponent {

  static displayName = 'DashboardContentHeader';

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;

    return (
      <AppContentWrapper className={classNames(styles.main, className)}>
        {children}
      </AppContentWrapper>
    );
  }
}
