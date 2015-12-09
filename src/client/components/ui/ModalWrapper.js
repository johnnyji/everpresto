import React, {Component, PropTypes} from 'react';
import Card from './Card';

export default class ModalWrapper extends Component {

  static displayName = 'ModalWrapper';

  static propTypes = {
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
    const {height, unit, width} = this.props;
    const style = {
      height: `${height}${unit}`,
      width: `${width}${unit}`
    };

    return (
      <Card className='ui-ModalWrapper' style={style}>
        {this.props.children}
      </Card>
    );
  }
}
