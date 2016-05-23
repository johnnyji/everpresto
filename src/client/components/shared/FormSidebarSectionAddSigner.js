import React, {Component, PropTypes} from 'react';
import {createModal} from '../.././actions/AppActionCreators';
import CustomPropTypes from '../CustomPropTypes';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import FormSidebarSection from './FormSidebarSection';
import handleFlashError from '../.././decorators/handleFlashError';
import Icon from '.././ui/Icon';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '.././ui/Input';
import {isNull} from '../../utils/immutable/IterableFunctions';
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
    shouldClearSpecificPlaceholderForm: PropTypes.bool.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // This forces all the form's input fields to show their current error state. This becomes true
      // when we attempt to add a signer but their specific placeholder form was filled incorrectly
      showAddSignerErrors: false
    };
  }

  componentWillMount() {
    // Uses the placeholders prop to generate dynamic input fields
    // based on which placholders the template contains
    this.context.dispatch(
      DocumentNewActionCreators.generateSpecificPlaceholderFormFields()
    );
  }

  componentWillUpdate(nextProps) {
    // Clears out the form so we can add another signer
    if (nextProps.shouldClearSpecificPlaceholderForm) {
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
    const {specificPlaceholderForm} = this.props;
    const {showAddSignerErrors} = this.state;

    return specificPlaceholderForm
      .get('values')
      .map((val, i) => {
        return (
          <Input
            className={`${displayName}-form-fields-field`}
            error={specificPlaceholderForm.getIn(['errors', i])}
            displayErrorOn={showAddSignerErrors ? 'change' : 'blur'}
            forceDisplayError={showAddSignerErrors}
            key={i}
            label={val.get('placeholder')}
            onUpdate={(val, err) => this._handlePlaceholderUpdate(val, err, i)}
            patternMatches={minLength(1, `Give ${val.get('placeholder')} a value`)}
            value={val.get('value') || ''}
            width={300} />
        );
      });
  }

  _addSigner = () => {
    const errorsExist = !this.props.specificPlaceholderForm.get('errors').every(isNull);

    // If there are invalid fields, show all the errors in the form
    if (errorsExist) return this.setState({showAddSignerErrors: true});

    // If all fields are valid, we add the signer
    this.context.dispatch(
      DocumentNewActionCreators.addSigner(this.props.specificPlaceholderForm.get('values'))
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
