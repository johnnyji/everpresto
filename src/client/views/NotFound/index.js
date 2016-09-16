import React, {PureComponent} from 'react';
import styles from './styles/index.scss';

export default class NotFound extends PureComponent {

  static displayName = 'NotFound';

  render() {
    return (
      <div className={styles.main}>
        <h1 className={styles.shrug}>¯\_(ツ)_/¯</h1>
        <h1 className={styles.status}>404.</h1>
      </div>
    );
  }

}
