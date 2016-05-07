import React, {Component, PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import MUIIconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import Icon from './Icon';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-ListItem';

@pureRender
export default class EverprestoListItem extends Component {

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
    const classes = classNames({
      className,
      [displayName]: true
    });

    // Makes sure that list items that are about to overflow will break works onto the
    // next line instead of overflowing
    const styles = {
      wordBreak: 'break-all'
    };
    // Styles for an inner div that MUI adds right before the actual contents of the
    // ListItem, we need to make sure the background color is changed so it doesn't look
    // like a button
    const innerDivStyles = {
      background: '#FFF'
    };

    if (removable && onRemove) {
      return (
        <ListItem
          onTouchTap={onClick}
          innerDivStyle={innerDivStyles}
          rightIconButton={this._renderRemoveButton()}
          style={styles}>
          {/* Material-UI's ListItem doesn't support className */}
          <div className={classes}>
            {children}
          </div>
        </ListItem>
      );
    }

    return (
      <ListItem
        className={classes}
        innerDivStyle={innerDivStyles}
        onTouchTap={onClick}
        style={styles}>
        {children}
      </ListItem>
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
