import React, {Component, PropTypes} from 'react';

const displayName = 'Overlay';

export class Overlay extends Component {

  static displayName = displayName;

  static propTypes = {
    onExitModal: PropTypes.func.isRequired,
  }

  componentWillMount() {
    document.body.classList.add('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.add('noscroll'); 
  }

  render() {
    return (
      <div className={displayName}>
        <div className={`${displayName}-background`} onClick={this.props.onExitModal}></div>
        {this.props.children}
      </div>
    );
  }

}