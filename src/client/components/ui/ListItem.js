import React, {Component, PropTypes} from 'react';
import MUIListItem from 'material-ui/lib/lists/list-item';
import MUIIconButton from 'material-ui/lib/icon-button';
import classNames from 'classnames';
import Icon from './Icon';

const displayName = 'ui-ListItem';

export default class ListItem extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    removable: PropTypes.bool.isRequired
  };

  static defaultProps = {
    removable: false
  };

  render() {
    const {className, children, onClick, onRemove, removable} = this.props;
    const classes = classNames(className, displayName);

    if (removable && onRemove) {
      return (
        <MUIListItem
          onTouchTap={onClick}
          rightIconButton={this._renderRemoveButton()}>
          {/* Material-UI's ListItem doesn't support className */}
          <div className={classes}>
            {children}
          </div>
        </MUIListItem>
      );
    }

    return (
      <MUIListItem className={classes} onTouchTap={onClick}>
        {children}
      </MUIListItem>
    );
  }

  _renderRemoveButton = () => {
    return (
      <MUIIconButton onClick={this.props.onRemove}>
        <Icon icon='close' iconClass={`${displayName}-remove-icon`}/>
      </MUIIconButton>
    );
  };

}