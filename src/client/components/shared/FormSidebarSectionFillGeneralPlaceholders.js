import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import handleFlashError from '../.././decorators/handleFlashError';
import {minLength} from '../.././utils/RegexHelper';
import {
  generateGeneralPlaceholderFormFields,
  updateGeneralPlaceholderFormField} from '../.././actions/DocumentNewActionCreators';

import Input from '.././ui/Input';
import DashboardMessage from '.././dashboard/DashboardMessage';
import FormSidebarSection from './FormSidebarSection';
import FormSidebarSectionTitle from './FormSidebarSectionTitle';

const displayName = 'FormSidebarSectionFillGeneralPlaceholders';

@handleFlashError
export default class FormSidebarSectionFillGeneralPlaceholders extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    handleFlashError: PropTypes.func.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['general']).isRequired,
        value: PropTypes.string
      }).isRequired
    ).isRequired,
    placeholderForm: ImmutablePropTypes.contains({
      values: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          placeholder: PropTypes.string.isRequired,
          value: PropTypes.string
        })
      ).isRequired,
      errors: ImmutablePropTypes.listOf(PropTypes.string).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      placeholderForm: Immutable.fromJS({
        values: [],
        errors: []
      })
    };
  }

  componentWillMount() {
    // Uses the placeholders prop to generate dynamic input fields
    // based on which placholders the template contains
    this.context.dispatch(generateGeneralPlaceholderFormFields());
  }

  render() {
    const {placeholders} = this.props;
    const content = placeholders.size
      ? this._renderGeneralPlaceholders()
      : this._renderNoPlaceholdersMessage();

    return (
      <FormSidebarSection className={displayName}>
        {placeholders.size &&
          <FormSidebarSectionTitle className={`${displayName}-title`}>General Fields</FormSidebarSectionTitle>
        }
        <ul className={`${displayName}-fields`}>{content}</ul>
      </FormSidebarSection>
    );
  }

  _renderGeneralPlaceholders = () => {
    const {placeholderForm} = this.props;

    return placeholderForm.get('values').map((formField, i) => {
      return (
        <li key={i}>
          <Input
            error={placeholderForm.getIn(['errors', i])}
            errorKeys={`errors:${i}`}
            label={formField.get('placeholder')}
            onUpdate={(val, err) => this._handleUpdatePlaceholder(val, err, i)}
            patternMatches={minLength(1, `Lets give ${formField.get('placeholder')} a value`)}
            successKeys={`values:${i}:value`}
            value={formField.get('value')}
            width={250}/>
        </li>
      );
    });
  };

  _renderNoPlaceholdersMessage = () => {
    return (
      <div className={`${displayName}-no-placeholder-message`}>
        <header className={`${displayName}-no-placeholder-message-title`}>
          No General Fields
        </header>
        <div>If you're seeing this message, it just means you don't have any general fields to replace, so kick back and relax!</div>
      </div>
    );
  };

  _handleUpdatePlaceholder = (val, err, i) => {
    this.context.dispatch(updateGeneralPlaceholderFormField({
      value: val,
      error: err,
      formFieldIndex: i
    }));
  };

}
