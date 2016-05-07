import React, {Component, PropTypes} from 'react';
import Card from './Card';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-ModalWrapper';

@pureRender
export default class ModalWrapper extends Component {
  static displayName = 'ui-ModalWrapper';

  static propTypes = {
    className: PropTypes.string,
    height: PropTypes.number.isRequired,
    unit: PropTypes.oneOf(['px', 'rem', 'em', '%']).isRequired,
    width: PropTypes.number.isRequired
  };

  static defaultProps = {
    height: 400,
    unit: 'px',
    width: 600
  };

  render() {
    const {children, className, height, unit, width} = this.props;
    const classes = classNames(displayName, className);
    const style = {
      height: `${height}${unit}`,
      width: `${width}${unit}`
    };

    return <Card className={classes} style={style}>{children}</Card>;
  }
}
