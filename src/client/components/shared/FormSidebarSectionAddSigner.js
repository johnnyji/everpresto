import React, {Component, PropTypes} from 'react';
import {createModal} from '../.././actions/AppActionCreators';
import CustomPropTypes from '../CustomPropTypes';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import FormSidebarSection from './FormSidebarSection';
import handleFlashError from '../.././decorators/handleFlashError';
import Icon from '.././ui/Icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '.././ui/Input';
import {minLength} from '../.././utils/RegexHelper';
import ModalFillPlaceholders from '.././modals/ModalFillPlaceholders';
import MUIRoundButton from 'material-ui/FloatingActionButton';

const BRAND_COLOR_BLUE = '#4E9CC2';
const displayName = 'FormSidebarSectionAddSigner';

/*
 * The section of the DocumentsNew sidebar that adds an individual signer
 * to the document by using a form to fill out their SPECIFIC placeholders
 * and clicking the add button
 */
@handleFlashError
export default class FormSidebarSectionAddSigner extends Component {

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
        type: PropTypes.oneOf(['specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    savedSigner: PropTypes.bool.isRequired,
    savingSigner: PropTypes.bool.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired
  };

  componentWillMount() {
    // Uses the placeholders prop to generate dynamic input fields
    // based on which placholders the template contains
    this.context.dispatch(
      DocumentNewActionCreators.generateSpecificPlaceholderFormFields()
    );
  }

  componentWillUpdate (nextProps) {
    // Once we've just saved an individual signer, we want to clear the specific
    // placeholder form so we can add another signer
    if (this.props.savingSigner && !nextProps.savingSigner) {
      this.context.dispatch(
        DocumentNewActionCreators.clearSpecificPlaceholderForm()
      );
    }
  }

  render() {
    return (
      <div className={displayName}>
        <a
          className={`${displayName}-csv-link`}
          onClick={this._handleImportSigners}>
          Too many signers? Import CSV
        </a>
        <FormSidebarSection className={`${displayName}-form`}>
          <section className={`${displayName}-form-fields`}>
            {this._renderSpecificPlaceholderForm()}
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

  _renderSpecificPlaceholderForm = () => {
    const {specificPlaceholderForm, savingSigner} = this.props;

    return specificPlaceholderForm
      .get('values')
      .map((val, i) => (
        <Input
          className={`${displayName}-form-fields-field`}
          error={specificPlaceholderForm.getIn(['errors', i])}
          errorKeys={`errors:${i}`}
          key={i}
          label={val.get('placeholder')}
          onUpdate={(val, err) => this._handlePlaceholderUpdate(val, err, i)}
          patternMatches={minLength(1, `Give ${val.get('placeholder')} a value`)}
          ref={`specificPlaceholderForm-${i}`}
          shouldDisplayError={savingSigner}
          successKeys={`values:${i}:value`}
          value={val.get('value')}
          width={300} />
      ));
  }

  /**
   * Checks for the validity of the add signer form and then proceeds to
   * add the signer to the new document
   */
  _addSigner = () => {
    const {dispatch} = this.context;
    const {handleFlashError, specificPlaceholderForm} = this.props;

    // Begin the saving process
    dispatch(DocumentNewActionCreators.savingSigner());

    // If there are errors, do not proceed
    const firstFoundError = specificPlaceholderForm
      .get('errors')
      .find((_, i) => !this.refs[`specificPlaceholderForm-${i}`].valid());
    if (firstFoundError !== undefined) {
      return handleFlashError('Are you sure you filled out the form properly?');
    }
    
    // Adds the one new signer to the new document
    dispatch(
      DocumentNewActionCreators.addSigners([specificPlaceholderForm.get('values')])
    );
  };

  /**
   * Updates the values and errors of a field in `specificPlaceholderForm` store state
   * @param  {Integer} i        -  The index of the item we're updating in the signerForm state
   * @param  {String} val       - The value of a field in the signerForm state
   * @param  {String|Null} err  - The error of a field in the signerForm state
   */
  _handlePlaceholderUpdate = (val, err, i) => {
    this.context.dispatch(
      DocumentNewActionCreators.updateSpecificPlaceholderFormField({
        error: err,
        formFieldIndex: i,
        value: val
      })
    );
  };

  _handleImportSigners = () => {
    this.context.dispatch(
      createModal(<ModalFillPlaceholders placeholders={this.props.placeholders} />)
    );
  };

}
