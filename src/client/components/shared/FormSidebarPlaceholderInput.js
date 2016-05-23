import React, {Component, PropTypes} from 'react';
import {minLength, noLowerCase} from '../.././utils/RegexHelper';
import AppActionCreators from '../.././actions/AppActionCreators';
import Clickable from '.././ui/Clickable';
import ClickableIcon from '.././ui/ClickableIcon';
import ListItem from '.././ui/ListItem';
import FormSidebarSection from './FormSidebarSection';
import FormSidebarSectionTitle from './FormSidebarSectionTitle';
import Icon from '.././ui/Icon';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '.././ui/Input';
import IterableFunctions from '../.././utils/immutable/IterableFunctions';
import ModalPlaceholderTipBox from '.././modals/ModalPlaceholderTipBox';

const {isTruthy, matchesAttr} = IterableFunctions;
const ENTER_KEY = 13;
const matchesValue = matchesAttr('value');
const isRequired = matchesAttr('isRequired');
const displayName = 'FormSidebarPlaceholderInput';

export default class FormSidebarPlaceholderInput extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    allPlaceholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['general', 'specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ),
    onAddPlaceholder: PropTypes.func.isRequired,
    onRemovePlaceholder: PropTypes.func.isRequired,
    placeholderInputLabel: PropTypes.string.isRequired,
    placeholderType: PropTypes.oneOf(['general', 'specific']).isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['general', 'specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ),
    title: PropTypes.string
  };

  static defaultProps = {
    placeholderInputLabel: 'ADD_PLACEHOLDER_HERE'
  };

  constructor(props) {
    super(props);
    this.state = {
      unsavedPlaceholder: Immutable.fromJS({
        values: {value: ''},
        errors: {value: null}
      })
    };
  }

  render() {
    const {placeholderInputLabel, title} = this.props;
    const {unsavedPlaceholder} = this.state;

    return (
      <FormSidebarSection className={`${displayName}`}>
        {title &&
          <FormSidebarSectionTitle className={`${displayName}-title`}>
            {title}
          </FormSidebarSectionTitle>
        }
        <div className={`${displayName}-input-wrapper`}>
          <Input
            className={`${displayName}-input`}
            error={unsavedPlaceholder.getIn(['errors', 'value'])}
            errorKeys='errors:value'
            label={<span><Icon icon='edit' /> {placeholderInputLabel}</span>}
            onKeyPress={this._handleKeyPress}
            onEnterKeyPress={this._saveUnsavedPlaceholder}
            onUpdate={(value, err, valObj, errObj, e) => this._updateUnsavedPlaceholder(value, err, e)}
            patternMatches={[
              minLength(1, 'Your placeholder can\'t be empty!'),
              noLowerCase('Sorry, no lower case chars allowed!')
            ]}
            ref='placeholder-input'
            successKeys='values:value'
            value={unsavedPlaceholder.getIn(['values', 'value'])}
            width={300} />
        </div>
        <ul className={`${displayName}-placeholders`}>
          {this._renderRequiredPlaceholders()}
          {this._renderPlaceholders()}
        </ul>
      </FormSidebarSection>
    );
  }


  /**
   * Renders the required placeholders
   * @return {Immutable.List} The list of required placeholder React elements
   */
  _renderRequiredPlaceholders = () => {
    const requiredPlaceholders = this.props.placeholders.filter(isRequired(true));
    
    if (!requiredPlaceholders) return;

    return requiredPlaceholders.map((placeholder, i) => (
      <li className={`${displayName}-placeholders-required`} key={i}>
        <mark>{placeholder.get('value')}</mark>
        <span className={`${displayName}-placeholders-required-text`}>
          <Icon icon='info' iconClass={`${displayName}-placeholders-required-text-icon`} size={16} />
          Required
        </span>
      </li>
    ));
  };

  _renderPlaceholders = () => {
    const generalPlaceholders = this.props.placeholders.filter(isRequired(false));
    // TODO: Refactor the fuck out of this
    if (generalPlaceholders.size === 0) {
      return (
        <div className={`${displayName}-placeholder-tip`}>
          <ClickableIcon
            className={`${displayName}-placeholder-tip-icon`}
            icon='info'
            onClick={this._showPlaceholderInfoModal} />
          <Clickable
            className={`${displayName}-placeholder-tip-text`}
            onClick={this._showPlaceholderInfoModal}>
            What are placeholders?
          </Clickable>
        </div>
      );
    }

    return generalPlaceholders.map((placeholder, i) => (
      <ListItem
        className={`${displayName}-placeholders-placeholder`}
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

    const {allPlaceholders, onAddPlaceholder, placeholderType} = this.props;
    const unsavedPlaceholderValue = unsavedPlaceholder.getIn(['values', 'value']);

    // If the placeholder is already taken, set the error on this placeholder
    if (allPlaceholders.find(matchesValue(unsavedPlaceholderValue))) {
      return this.setState({
        unsavedPlaceholder: unsavedPlaceholder.setIn(['errors', 'value'], 'This placeholder is already being used!')
      });
    }

    // If the unsaved placeholder is conflicting with another existing placeholder such as
    // `HELLO` and `HELL`. In this case, there's a conflict because `HELLO` would never
    // get matched because `HELL` would always match first
    // TODO: Refactor to be functional
    const firstConflictingPlaceholder = allPlaceholders.find((ph) => {
      const placeholderValue = ph.get('value');
      return placeholderValue.length > unsavedPlaceholderValue.length
        ? placeholderValue.match(new RegExp(unsavedPlaceholderValue))
        : unsavedPlaceholderValue.match(new RegExp(placeholderValue));
    });

    if (firstConflictingPlaceholder) {
      return this.setState({
        unsavedPlaceholder: unsavedPlaceholder.setIn(
          ['errors', 'value'],
          `Conflicting with existing placeholder ${firstConflictingPlaceholder.get('value')}`
        )
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

    // Adds the placeholder by providing the value and what type
    // the placeholder was (specific | general)
    onAddPlaceholder(unsavedPlaceholderValue, placeholderType);
  };

  _showPlaceholderInfoModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(<ModalPlaceholderTipBox />)
    );
  };

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
