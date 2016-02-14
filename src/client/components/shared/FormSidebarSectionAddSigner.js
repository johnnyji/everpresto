import React, {Component, PropTypes} from 'react';
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

  render() {
    return (
      <div className={displayName}>
        <FileUploader
          label={<span><Icon icon='file-upload'/>Too many signers? Import CSV</span>}
          onUpload={this._handleImportSigners}
          permittedExtensions={['.csv']}/>
        <FormSidebarSection className={`${displayName}-form`}>
          <section className={`${displayName}-form-fields`}>
            {this._renderNewSignerFields()}
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

  _renderNewSignerFields = () => {
    return this.props.placeholders.map((placeholder, i) => (
      <Input
        className={`${displayName}-form-fields-field`}
        error={''}
        errorKeys={`errors:${i}`}
        key={i}
        label={placeholder.get('value')}
        onUpdate={(val, err) => this._updatePlaceholder(val, err, i)}
        patternMatches={minLength(1, `Lets give ${placeholder.get('value')} a value`)}
        successKeys={`values:${i}:header`}
        value={'hello'}
        width={300}/>
    ));
  };

  _addSigner = () => {

  };

  /**
   * Fires a flash message error
   * @param  {String|React.Element} error - The error being fired
   */
  _handleError = (error) => {
    this.context.dispatch(createFlashMessage('red', error));
  };

  _handleImportSigners = () => {

  };

  _updatePlaceholder = (val, err, valObj, errObj, e) => {

  };

}