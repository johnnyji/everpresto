import React, {PureComponent} from 'react';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import Spinner from 'ui-components/src/Spinner';
import styles from './styles/DashboardSpinner.scss';

export default class DashboardSpinner extends PureComponent {

  static displayName = 'DashboardSpinner';
  
  render() {
    return (
      <DashboardContentWrapper>
        <Spinner className={styles.spinner} />
      </DashboardContentWrapper>
    );
  }

}
