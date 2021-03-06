import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from '.././ui/Icon';
import MUITextField from 'material-ui/TextField';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-SearchBar';

@pureRender
export default class SearchBar extends Component {

  static displayName = displayName;

  static propTypes = {
    autoFocus: PropTypes.bool.isRequired,
    className: PropTypes.string,
    focusLabel: PropTypes.string,
    funny: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    autoFocus: false,
    funny: true,
    label: 'I\'m just a lonely searchbar...',
    focusLabel: 'Yay, I have a friend!'
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus
    };
  }

  render() {
    const {autoFocus, className, onUpdate} = this.props;

    return (
      <div className={classNames(className, displayName)}>
        <MUITextField
          autoFocus={autoFocus}
          hintText={this._renderLabel()}
          onBlur={this._handleBlur}
          onChange={(e) => onUpdate(e.target.value)}
          onFocus={this._handleFocus}
          type='text' />
      </div>
    );
  }

  _handleBlur = () => {
    this.setState({focused: false});
  };

  _handleFocus = () => {
    this.setState({focused: true});
  };

  _renderLabel = () => {
    const {focusLabel, label} = this.props;
    const {focused} = this.state;
    return (
      <span>
        <Icon icon='search' iconClass={`${displayName}-search-icon`} />
        {focused ? focusLabel : label}
      </span>
    );
  }

}
