import React, {PropTypes, PureComponent} from 'react';
import Button from 'ui-components/src/Button';
import classNames from 'classnames';
import DashboardMessage from './DashboardMessage';

export default class DashboardError extends PureComponent {

  static displayName = 'DashboardError';

  static propTypes = {
    buttonText: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  };

  render() {
    const {buttonText, className, onClick, text} = this.props;

    return (
      <DashboardMessage className={classNames(styles.main, className)}>
        <p className={styles.text}>{text}</p>
        {buttonText && onClick &&
          <Button className={styles.button} onClick={onClick}>{buttonText}</Button>
        }
      </DashboardMessage>
    );
  }
}
