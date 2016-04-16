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
    ]).isRequired
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static defaultProps = {
    color: 'blue'
  };

  render() {
    const {children, color, content} = this.props;
    const className = `ui-${displayName}`;

    return (
      <div className={className} onClick={this._handleDismiss}>
        <div className={`${className}-content ${className}-${color}`}>
          <span className={`${className}-content-message`}>
            {content}
          </span>
        </div>
      </div>
    );
  }

  _handleDismiss = () => {
    this.context.dispatch(AppActionCreators.dismissFlashMessage());
  }

}
