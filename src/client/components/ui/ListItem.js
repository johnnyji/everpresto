import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './icon';

const displayName = 'ListItem';

export default class ListItem extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onRemove: PropTypes.func,
    removable: PropTypes.bool.isRequired
  };

  static defaultProps = {
    removable: false
  }

  render() {
    const {className, children, onRemove, removable} = this.props;
    const classes = classNames(className, displayName);

    return (
      <li className={classes}>
        <span className={`${displayName}-content`}>{children}</span>
        {removable && onRemove &&
          <button className={`${displayName}-remove-button`} onClick={onRemove}>
            <Icon
              icon='close'
              iconClass={`${displayName}-remove-button-icon`}
              size={12}/>
          </button>
        }
      </li>
    );
  }

}
