import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './styles/AppContentWrapper.scss';

// This component restricts it's children to the app's min and max width
export default class AppContentWrapper extends PureComponent {

  static displayName = 'AppContentWrapper';

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;

    return (
      <div className={classNames(styles.main, className)}>
        {children}
      </div>
    );
  }

}
