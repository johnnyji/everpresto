import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {minLength, noLowerCase} from '../.././utils/RegexHelper';
import {isTruthy, matchesAttr} from '../.././utils/immutable/IterableFunctions';

import Clickable from '.././ui/Clickable';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import List from '.././ui/List';
import ListItem from '.././ui/ListItem';

const ENTER_KEY = 13;
const matchesValue = matchesAttr('value');
const displayName = 'FormSidebarPlaceholderInput';

export default class FormSidebarPlaceholderInput extends Component {

  static displayName = displayName;

  static propTypes = {
    onAddPlaceholder: PropTypes.func.isRequired,
    onRemovePlaceholder: PropTypes.func.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        value: PropTypes.string.isRequired
      })
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      unsavedPlaceholder: Immutable.fromJS({
        values: {value: ''},
        errors: {value: null}
      })
    }
  }

  render() {
    const {unsavedPlaceholder} = this.state;

    return (
      <List className={`${displayName}-sidebar-placeholders-list`}>
        <Input
          autoFocus={true}
          className={`${displayName}-sidebar-placeholders-list-input`}
          defaultValue={unsavedPlaceholder.getIn(['values', 'value'])}
          error={unsavedPlaceholder.getIn(['errors', 'value'])}
          errorKeys='errors:value'
          label='ex. YOUR_PLACEHOLDER_HERE'
          onEnterKeyPress={this._saveUnsavedPlaceholder}
          onUpdate={(value, err, valObj, errObj, e) => this._updateUnsavedPlaceholder(value, err, e)}
          patternMatches={[
            minLength(1, 'Your placeholder can\'t be empty!'),
            noLowerCase('Sorry, no lower case chars allowed!')
          ]}
          ref='placeholder-input'
          successKeys='values:value'/>
        {this._renderPlaceholders()}
      </List>
    );
  }

  _renderPlaceholders = () => {
    const {onRemovePlaceholder, placeholders} = this.props;

    return placeholders.map((placeholder, i) => (
      <ListItem
        className={`${displayName}-sidebar-placeholders-placeholder`}
        key={i}
        onRemove={() => onRemovePlaceholder(placeholder)}
        removable={true}>
        <mark>{placeholder.get('value')}</mark>
      </ListItem>
    ));
  };

  _saveUnsavedPlaceholder = () => {
    const {unsavedPlaceholder} = this.state;
    // If this unsaved placeholder has an error, we don't save it
    const firstFoundError = unsavedPlaceholder.get('errors').find(isTruthy);
    if (firstFoundError !== undefined) return;

    const {onAddPlaceholder, placeholders} = this.props;
    const unsavedPlaceholderValue = unsavedPlaceholder.getIn(['values', 'value']);

    // If the placeholder is already taken, set the error on this placeholder
    if (placeholders.find(matchesValue(unsavedPlaceholderValue))) {
      return this.setState({
        unsavedPlaceholder: unsavedPlaceholder.setIn(['errors', 'value'], 'This placeholder is already being used!')
      });
    }

    // If the placeholder is correct
    this.refs['placeholder-input'].clear();
    this.setState({
      unsavedPlaceholder: Immutable.fromJS({
        values: {value: ''},
        errors: {value: null}
      })
    });
    onAddPlaceholder(unsavedPlaceholderValue);
  };

  _updateUnsavedPlaceholder = (value, error, e) => {
    // If the enter key is hit, we don't want to update, instead we want to ignore
    // because the placeholder will be sumitted instead in `this._saveUnsavedPlaceholder`
    if (e.which === ENTER_KEY) return;

    // Updates the unsavedPlaceholder state
    this.setState({
      unsavedPlaceholder: this.state.unsavedPlaceholder.merge({
        values: {value},
        errors: {error}
      })
    });
  };

}