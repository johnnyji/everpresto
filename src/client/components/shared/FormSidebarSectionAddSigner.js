import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUIRoundButton from 'material-ui/lib/floating-action-button';
import FormSidebarSection from './FormSidebarSection';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import {minLength} from '../.././utils/RegexHelper';

const BRAND_COLOR_BLUE = '#4E9CC2';
const displayName = 'FormSidebarSectionAddSigner';

export default class FormSidebarSectionAddSigner extends Component {

  static displayName = displayName;

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
      <FormSidebarSection className={displayName}>
        <section className={`${displayName}-fields`}>
          {this._renderNewSignerFields()}
        </section>
        <aside className={`${displayName}-add-button`}>
          <MUIRoundButton
            backgroundColor={BRAND_COLOR_BLUE}
            mini={true}
            onTouchEnd={this._addSigner}>
            <Icon icon='add' />
          </MUIRoundButton>
        </aside>
      </FormSidebarSection>
    );
  }

  _renderNewSignerFields = () => {
    return this.props.placeholders.map((placeholder, i) => (
      <Input
        className={`${displayName}-fields-field`}
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

  _updatePlaceholder = (val, err, valObj, errObj, e) => {

  };

}