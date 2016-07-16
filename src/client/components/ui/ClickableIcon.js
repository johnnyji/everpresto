import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-ClickableIcon';

@pureRender
export default class ClickableIcon extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    isWhite: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired
  };

  static defaultProps = {
    isWhite: false,
    size: 24
  };

  render() {
    const {className, icon, isWhite, onClick, size} = this.props;
    const classes = classNames(
      className,
      displayName,
      {[`${displayName}-white`]: isWhite}
    );

    return (
      <button className={classes} onClick={onClick}>
        <Icon icon={icon} size={size} />
      </button>
    );
  }
}
