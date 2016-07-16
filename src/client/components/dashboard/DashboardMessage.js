import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const CLS = 'DashboardMessage';

@pureRender
export default class DashboardMessage extends Component {
  static displayName = CLS;

  static propTypes = {
    center: PropTypes.bool.isRequired,
    className: PropTypes.string,
    message: PropTypes.string
  };

  static defaultProps = {
    center: true
  };

  render() {
    const {center, children, className, message} = this.props;

    const classes = classNames(
      className,
      CLS,
      {[`${CLS}-center`]: center}
    );

    return (
      <div className={classes}>
        {message && message}
        {children}
      </div>
    );
  }
}
