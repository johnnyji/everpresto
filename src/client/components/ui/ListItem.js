import React, {Component, PropTypes} from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import MUIListItem from 'material-ui/lib/lists/list-item';
import MUIIconButton from 'material-ui/lib/icon-button';
import classNames from 'classnames';
import Icon from './Icon';
// injectTapEventPlugin();

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
    const {className, children, onRemove, removable} = this.props;
    const classes = classNames(className, displayName);

    if (removable && onRemove) {
      return (
        <MUIListItem
          className={classes}
          onTouchTap={this._handleTouchTap}
          rightIconButton={this._renderRemoveButton()}>
          {children}
        </MUIListItem>
      );
    }

    return (
      <MUIListItem className={classes}>
        {children}
      </MUIListItem>
    );
  }

  _handleTouchTap = () => {
    console.log('tapped');
    if (this.props.onClick) this.props.onClick();
  };

  _renderRemoveButton = () => {
    return (
      <MUIIconButton onClick={this.props.onRemove}>
        <Icon icon='close' iconClass={`${displayName}-remove-icon`}/>
      </MUIIconButton>
    );
  };

}