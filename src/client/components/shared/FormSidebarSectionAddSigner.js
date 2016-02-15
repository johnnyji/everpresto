import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUIRoundButton from 'material-ui/lib/floating-action-button';
import FileUploader from './FileUploader';
import FormSidebarSection from './FormSidebarSection';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import {minLength} from '../.././utils/RegexHelper';
import {createFlashMessage} from '../.././actions/AppActionCreators';

import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';

const BRAND_COLOR_BLUE = '#4E9CC2';
const INIT_SIGNER_FORM_STATE = Immutable.fromJS({
  values: [],
  errors: []
});
const displayName = 'FormSidebarSectionAddSigner';

export default class FormSidebarSectionAddSigner extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    onAddSigner: PropTypes.func.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      signerForm: INIT_SIGNER_FORM_STATE,
      signerFormSubmitting: false
    };
  }

  componentWillMount() {
    // Uses the placeholders prop to generate dynamic input fields
    // based on which placholders the template contains
    this.setState({
      signerForm: this._generateSignerFormFromPlaceholders(INIT_SIGNER_FORM_STATE)
    });
  }

  render() {
    return (
      <div className={displayName}>
        <FileUploader
          label={<span><Icon icon='file-upload'/>Too many signers? Import CSV</span>}
          onUpload={this._handleImportSigners}
          permittedExtensions={['.csv']}/>
        <FormSidebarSection className={`${displayName}-form`}>
          <section className={`${displayName}-form-fields`}>
            {this._rendersignerFormFields()}
          </section>
          <aside className={`${displayName}-form-add-button`}>
            <MUIRoundButton
              backgroundColor={BRAND_COLOR_BLUE}
              mini={true}
              onMouseUp={this._addSigner}
              onTouchEnd={this._addSigner}>
              <Icon icon='add' />
            </MUIRoundButton>
          </aside>
        </FormSidebarSection>
      </div>
    );
  }

  _rendersignerFormFields = () => {
    const {signerForm, signerFormSubmitting} = this.state;

    return signerForm.get('values').map((val, i) => (
      <Input
        className={`${displayName}-form-fields-field`}
        error={signerForm.getIn(['errors', i])}
        errorKeys={`errors:${i}`}
        key={i}
        label={val.get('placeholder')}
        onUpdate={(val, err, e) => this._handlePlaceholderUpdate(val, err, i, e)}
        patternMatches={minLength(1, `Give ${val.get('placeholder')} a value`)}
        ref={`signerForm-${i}`}
        shouldDisplayError={signerFormSubmitting}
        successKeys={`values:${i}:value`}
        value={val.get('value')}
        width={300}/>
    ));
  };

  /**
   * Checks for the validity of the add signer form and then proceeds to
   * add the signer to the new document
   */
  _addSigner = () => {
    const {signerForm} = this.state;

    this.setState({signerFormSubmitting: true});
    // If there are errors, do not proceed
    const firstFoundError = signerForm.get('errors').find((_, i) => (
      !this.refs[`signerForm-${i}`].valid()
    ));
    if (firstFoundError !== undefined) {
      return this._handleError('Are you sure you filled out the form properly?');
    }
    
    // Adds the signer state as a signer to the new document
    this.context.dispatch(
      DocumentNewActionCreators.addSigner(signerForm.get('values'))
    );

    // Clears all the input values
    this._clearSignerFormInputs(signerForm.get('values').size - 1);

    // Reset the states so we can add another signer
    this.setState({
      signerForm: this._generateSignerFormFromPlaceholders(INIT_SIGNER_FORM_STATE),
      signerFormSubmitting: false
    });
  };

  /**
   * Clears the input fields in the signer form
   */
  _clearSignerFormInputs = (inputFieldIndex) => {
    this.refs[`signerForm-${inputFieldIndex}`].clear();
    // Keeps calling this function until we've recursively cleared all the fields
    if (inputFieldIndex > -1) this._clearSignerFormInputs(inputFieldIndex - 1);
  };

  /**
   * Iterates through the placeholders, and generates input field states for those placeholders,
   * which will store which input values belong to which placeholders, and any input errors as well.
   * @param {Immutable.Map} initSignerFormState - The blank `signerForm` that we're using to construct
   *                                              the dynamic `signerForm` state with the `placeholders` prop
   * @return - The constructed `signerForm` state using the placeholder props
   */
  _generateSignerFormFromPlaceholders = (initialSignerFormState) => {
    return this.props.placeholders.reduce((signerForm, placeholder) => {
      // Pushes on a placeholder input object -> {placholder: 'HELLO', value: null}
      let updatedState = signerForm.update('values', (vals) => (
        vals.push(Immutable.fromJS({
          placeholder: placeholder.get('value'),
          value: null
        }))
      ));
      // Also creates an error for that input
      return updatedState.update('errors', (errs) => errs.push(null));
    }, initialSignerFormState);
  };

  /**
   * Fires a flash message error
   * @param  {String|React.Element} error - The error being fired
   */
  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  /**
   * Updates the values and errors of a field in the signerForm state
   * @param  {String} val       - The value of a field in the signerForm state
   * @param  {String|Null} err  - The error of a field in the signerForm state
   * @param  {Integer} i        - The index of the item we're updating in the signerForm state
   */
  _handlePlaceholderUpdate = (val, err, i) => {
    let signerForm = this.state.signerForm.setIn(['values', i, 'value'], val);
    signerForm = signerForm.setIn(['errors', i], err);

    this.setState({signerForm});
  };

  _handleImportSigners = () => {

  };

}