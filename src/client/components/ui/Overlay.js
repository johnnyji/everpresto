import React, {Component, PropTypes} from 'react';

const className = 'ui-Overlay';

export class Overlay extends Component {

  static displayName = 'Overlay';

  static propTypes = {
    onExitModal: PropTypes.func.isRequired,
  }

  componentWillMount() {
    document.body.classList.add('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('noscroll'); 
  }

  render() {
    return (
      <div className={className}>
        <div className={`${className}-background`} onClick={this.props.onExitModal}></div>
        {this.props.children}
      </div>
    );
  }

}