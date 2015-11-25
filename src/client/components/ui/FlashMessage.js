import React, {Component, PropTypes} from 'react';
import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'FlashMessage';

export default class FlashMessage extends Component {

  static displayName = displayName;

  static propTypes = {
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow']).isRequired,
    content: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    color: 'blue'
  };

  render() {
    const {children, color, content} = this.props;

    return (
      <div className={`${displayName}`} onClick={this._handleDismiss}>
        <div className={`${displayName}-content ${displayName}-${color}`}>
          <span className={`${displayName}-content-message`}>{content}</span>
        </div>
      </div>
    );
  }

  _handleDismiss = () => {
    this.context.dispatch(AppActionCreators.dismissFlashMessage());
  }

}
