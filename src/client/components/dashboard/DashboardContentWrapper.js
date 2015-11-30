import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardContentWrapper';

export default class DashboardContentWrapper extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const classes = classNames(displayName, this.props.className);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }

}