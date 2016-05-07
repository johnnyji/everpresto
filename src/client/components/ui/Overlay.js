import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';

const className = 'ui-Overlay';

@pureRender
export default class Overlay extends Component {

  static displayName = 'Overlay';

  static propTypes = {
    onExit: PropTypes.func.isRequired,
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
        <div className={`${className}-background`} onClick={this.props.onExit}></div>
        {this.props.children}
      </div>
    );
  }

}
