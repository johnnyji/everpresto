import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from './Card';

export default class ModalWrapper extends Component {

  static displayName = 'ModalWrapper';

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
    const {className, height, unit, width} = this.props;
    const classes = classNames('ui-ModalWrapper', className);
    const style = {
      height: `${height}${unit}`,
      width: `${width}${unit}`
    };

    return (
      <Card className={classes} style={style}>
        {this.props.children}
      </Card>
    );
  }
}
