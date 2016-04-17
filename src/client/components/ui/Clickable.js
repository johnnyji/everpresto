import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-Clickable';

@pureRender
export default class Clickable extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {className, children, onClick} = this.props;
    const classes = classNames({
      [className]: className,
      [displayName]: true
    });

    return <button className={classes} onClick={onClick}>{children}</button>;
  }
}
