import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUIList from 'material-ui/lib/lists/list';
import {minLength, noLowerCase} from '../.././utils/RegexHelper';
import {containsAttr, isTruthy, matchesAttr} from '../.././utils/immutable/IterableFunctions';

import ModalPlaceholderTipBox from '.././modals/ModalPlaceholderTipBox';
import Clickable from '.././ui/Clickable';
import ClickableIcon from '.././ui/ClickableIcon';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import ListItem from '.././ui/ListItem';

import AppActionCreators from '../.././actions/AppActionCreators';

const ENTER_KEY = 13;
const matchesValue = matchesAttr('value');
const displayName = 'FormSidebarPlaceholderInput';

export default class FormSidebarPlaceholderInput extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

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
      <div className={`${displayName}`}>
        <div className={`${displayName}-item-input-wrapper`}>
          <Input
            className={`${displayName}-item-input`}
            defaultValue={unsavedPlaceholder.getIn(['values', 'value'])}
            error={unsavedPlaceholder.getIn(['errors', 'value'])}
            errorKeys='errors:value'
            icon='edit'
            label={<span><Icon icon='edit' /> YOUR_PLACEHOLDER_HERE</span>}
            liveError={true}
            onKeyPress={this._handleKeyPress}
            onEnterKeyPress={this._saveUnsavedPlaceholder}
            onUpdate={(value, err, valObj, errObj, e) => this._updateUnsavedPlaceholder(value, err, e)}
            patternMatches={[
              minLength(1, 'Your placeholder can\'t be empty!'),
              noLowerCase('Sorry, no lower case chars allowed!')
            ]}
            ref='placeholder-input'
            successKeys='values:value'/>
        </div>
        <MUIList>
          {this._renderPlaceholders()}
        </MUIList>
      </div>
    );
  }

  _renderPlaceholders = () => {
    // TODO: Refactor the fuck out of this
    if (this.props.placeholders.size === 0) {
      return (
        <div className={`${displayName}-placeholder-tip`}>
          <ClickableIcon
            className={`${displayName}-placeholder-tip-icon`}
            icon='info'
            onClick={this._showPlaceholderInfoModal}/>
          <Clickable
          className={`${displayName}-placeholder-tip-text`}
            onClick={this._showPlaceholderInfoModal}>
            What are placeholders?
          </Clickable>
        </div>
      );
    }

    return this.props.placeholders.map((placeholder, i) => (
      <ListItem
        className={`${displayName}-item-placeholder`}
        key={i}
        onRemove={() => this.props.onRemovePlaceholder(placeholder)}
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

    // If the unsaved placeholder is conflicting with another existing placeholder such as
    // `HELLO` and `HELL`. In this case, there's a conflict because `HELLO` would never
    // get matched because `HELL` would always match first
    // TODO: Refactor to be functional
    const firstConflictingPlaceholder = placeholders.find((ph) => {
      const placeholderValue = ph.get('value');
      return placeholderValue.length > unsavedPlaceholderValue.length
        ? placeholderValue.match(new RegExp(unsavedPlaceholderValue))
        : unsavedPlaceholderValue.match(new RegExp(placeholderValue));
    });
    if (firstConflictingPlaceholder) {
      return this.setState({
        unsavedPlaceholder: unsavedPlaceholder.setIn(['errors', 'value'], `Conflicting with existing placeholder ${firstConflictingPlaceholder.get('value')}`)
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

  _showPlaceholderInfoModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(<ModalPlaceholderTipBox />)
    );
  }

  _updateUnsavedPlaceholder = (value, error, e) => {
    // If the enter key is hit, we don't want to update, instead we want to ignore
    // because the placeholder will be sumitted instead in `this._saveUnsavedPlaceholder`
    if (e.which === ENTER_KEY) return;
    // Updates the unsavedPlaceholder state
    this.setState({
      unsavedPlaceholder: this.state.unsavedPlaceholder.merge({
        values: {value},
        errors: {value: error}
      })
    });
  };

}