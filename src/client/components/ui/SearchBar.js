import React, {Component, PropTypes} from 'react';
import MUITextField from 'material-ui/lib/text-field';
import classNames from 'classnames';
import Icon from '.././ui/Icon';

const displayName = 'ui-SearchBar';

export default class SearchBar extends Component {

  static displayName = displayName;

  static propTypes = {
    labelText: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
  };

  static defaultProps = {
    labelText: ''
  };

  render() {
    const {className, labelText, onUpdate} = this.props;

    return (
      <div className={classNames(className, displayName)}>
        <MUITextField
          hintText={<span><Icon icon='search' iconClass={`${displayName}-search-icon`}/>{labelText}</span>}
          onChange={(e) => onUpdate(e.target.value)}
          type='text'/>
      </div>
    );
  }

}