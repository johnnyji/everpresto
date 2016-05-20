import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardContentHeader';

export default class DashboardContentHeader extends Component {

  static displayName = displayName;

  static propTypes = {
    children: PropTypes.object,
    className: PropTypes.string
  };

  render() {
    const {children, className} = this.props;

    return (
      <header className={classNames(className, displayName)}>
        {children}
      </header>
    );
  }
}
