import React, {Component, PropTypes} from 'react';
import ProgressBar from '../ui/ProgressBar';

const CLS = 'DashboardProgressBar';

export default class DashboardProgressBar extends Component {

  static displayName = CLS;

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']).isRequired,
    height: PropTypes.number.isRequired,
    progressCount: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };
  
  render() {
    const {color, progressCount, totalCount} = this.props;

    return (
      <ProgressBar
        color={color}
        height={10}
        progressCount={progressCount}
        totalCount={totalCount}
        width='100%' />
    );
  }

}

