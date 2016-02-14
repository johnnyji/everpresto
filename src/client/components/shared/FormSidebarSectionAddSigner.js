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

const BRAND_COLOR_BLUE = '#4E9CC2';
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
      signerForm: Immutable.fromJS({
        values: [],
        errors: []
      })
    };
  }

  componentWillMount() {
    // Uses the placeholders prop to generate dynamic input fields
    // based on which placholders the template contains
    this._generatePlaceholderInputs();
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
              onTouchEnd={this._addSigner}>
              <Icon icon='add' />
            </MUIRoundButton>
          </aside>
        </FormSidebarSection>
      </div>
    );
  }

  _rendersignerFormFields = () => {
    const {signerForm} = this.state;

    return signerForm.get('values').map((val, i) => (
      <Input
        className={`${displayName}-form-fields-field`}
        error={signerForm.getIn(['errors', i])}
        errorKeys={`errors:${i}`}
        key={i}
        label={val.get('placeholder')}
        onUpdate={(val, err) => this._handlePlaceholderUpdate(val, err, i)}
        patternMatches={minLength(1, `Lets give ${val.get('placeholder')} a value`)}
        successKeys={`values:${i}:value`}
        value={val.get('value')}
        width={300}/>
    ));
  };

  _addSigner = () => {

  };

  /**
   * Iterates through the placeholders, and generates input field states for those placeholders,
   * which will store which input values belong to which placeholders, and any input errors as well.
   */
  _generatePlaceholderInputs = () => {
    const signerForm = this.props.placeholders.reduce((signerForm, placeholder) => {
      // Pushes on a placeholder input object -> {placholder: 'HELLO', value: null}
      let updatedState = signerForm.update('values', (vals) => (
        vals.push(Immutable.fromJS({
          placeholder: placeholder.get('value'),
          value: null
        }))
      ));
      // Also creates an error for that input
      return updatedState.update('errors', (errs) => errs.push(null));
    }, this.state.signerForm);

    this.setState({signerForm});
  };

  /**
   * Fires a flash message error
   * @param  {String|React.Element} error - The error being fired
   */
  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  _handlePlaceholderUpdate = (val, err, i) => {
    let signerForm = this.state.signerForm.setIn(['values', i, 'value'], val);
    signerForm = signerForm.setIn(['errors', i], err);
    console.log(signerForm.toJS());
    this.setState({signerForm});
  };

  _handleImportSigners = () => {

  };

}