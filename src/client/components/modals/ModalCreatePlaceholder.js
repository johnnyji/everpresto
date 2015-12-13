import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import Button from '.././ui/Button';
import Input from '.././ui/Input';
import ModalEnhancer from '../.././decorators/ModalEnhancer';
import ModalWrapper from '.././ui/ModalWrapper';
import RegexHelper from '../.././utils/RegexHelper';
import Spinner from '.././ui/Spinner';
import mergeDeep from '../.././utils/mergeDeep';
import AppActionCreators from '../.././actions/AppActionCreators';

const displayName = 'ModalCreatePlaceholder';

@ModalEnhancer
export default class ModalCreatePlaceholder extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      placeholder: Immutable.fromJS({
        values: {
          label: 'First Name',
          value: 'FIRST_NAME'
        },
        errors: {
          label: null,
          value: null
        }
      }),
      submitting: false
    };
  }

  render() {
    const {placeholder, submitting} = this.state;

    return (
      <ModalWrapper className={displayName} height={450} width={600}>
        <div className={`${displayName}-demo-section`}>
          <h2 className={`${displayName}-demo-section-heading`}>Placeholders make life easy!</h2>
          <p className={`${displayName}-demo-section-description`}>
            When you use this template, every <mark>{placeholder.getIn(['values', 'value'])}</mark> will be replaced with whatever you type into an input field called <b>{placeholder.getIn(['values', 'label'])}</b>
          </p>
        </div>
        <div className={`${displayName}-input-section`}>
          {submitting &&
            <Spinner className={`${displayName}-input-section-spinner`}/>
          }
          {!submitting &&
            <div>
              <Input
                autoFocus={true}
                className={`${displayName}-input-section-input-field`}
                defaultValue={placeholder.getIn(['values', 'label'])}
                error={placeholder.getIn(['errors', 'label'])}
                errorKeys='errors:label'
                label='Display'
                liveError={true}
                onUpdate={this._updatePlaceholder}
                patternMatches={RegexHelper.minLength(1, 'What\'s the display label for your placeholder?')}
                ref='label'
                successKeys='values:label'/>
              <Input
                className={`${displayName}-input-section-input-field`}
                defaultValue={placeholder.getIn(['values', 'value'])}
                error={placeholder.getIn(['errors', 'value'])}
                errorKeys='errors:value'
                label='Value'
                liveError={true}
                onUpdate={this._updatePlaceholder}
                patternMatches={[
                  RegexHelper.minLength(1, 'What\'s the actual placeholder gonna be?'),
                  RegexHelper.noLowerCase('Sorry, no lower case chars allowed!')
                ]}
                ref='value'
                successKeys='values:value'/>
              <Button
                className={`${displayName}-input-section-save-button`}
                color='green'
                onClick={this._createPlaceholder}
                text='Create Placeholder'/>
            </div>
          }
        </div>
      </ModalWrapper>
    );
  }

  _createFlashError = (message) => {
    this.context.dispatch(
      AppActionCreators.createFlashMessage('red', message)
    );
  }

  _createPlaceholder = () => {
    // Calls the valid method on every input field and returns the error of the first invalid field.
    const firstFoundError = this.state.placeholder.get('errors').find((v, k) => !this.refs[k].valid());
    if (firstFoundError !== undefined) return this._createFlashError(firstFoundError);

    const {placeholders} = this.props;
    const {placeholder} = this.state;

    // If the display name for the placeholder is already being used, alert an error
    const label = placeholder.getIn(['values', 'label']);
    const alreadyExistingPlaceholderLabels = placeholders.find((p) => p.get('label') === label);
    if (alreadyExistingPlaceholderLabels) {
      return this._createFlashError(`${label} is already being used for another placeholder. Try something else!`);
    }

    // If the placeholder is already taken, alert an error
    const value = placeholder.getIn(['values', 'value']);
    const alreadyExistingPlaceholderValues = placeholders.find((p) => p.get('value') === value);
    if (alreadyExistingPlaceholderValues) {
      return this._createFlashError(
        <span>
          <mark>{value}</mark> is already a placeholder for this template. Try something else!
        </span>
      );
    }

    this.setState({
      submitting: true
    });

    this._submitPlaceholder();
  }

  _updatePlaceholder = (value, error, nestedValueObj, nestedErrorObj) => {
    const placeholder = this.state.placeholder.mergeDeep(mergeDeep(nestedValueObj, nestedErrorObj));
    this.setState({placeholder});
  }

  _submitPlaceholder = () => {
    setTimeout(() => {
      this.props.onCreate(this.state.placeholder.get('values'));
      this.context.dispatch(AppActionCreators.dismissModal());
    }, 500);
  }

}