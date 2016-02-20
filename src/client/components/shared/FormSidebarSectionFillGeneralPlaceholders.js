import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FlashErrorHandler from '../.././decorators/FlashErrorHandler';
import {minLength} from '../.././utils/RegexHelper';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';

import Input from '.././ui/Input';
import DashboardMessage from '.././dashboard/DashboardMessage';
import FormSidebarSection from './FormSidebarSection';

const displayName = 'FormSidebarSectionFillGeneralPlaceholders';

@FlashErrorHandler
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
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };

  render() {
    const content = this.props.placeholders.size
      ? this._renderGeneralPlaceholders()
      : this._renderNoPlaceholdersMessage();

    return (
      <FormSidebarSection className={displayName}>
        <ul className={`${displayName}-fields`}>{content}</ul>
      </FormSidebarSection>
    );
  }

  _renderGeneralPlaceholders = () => {
    return this.props.placeholders.map((placeholder, i) => (
      <li className={`${displayName}-fields-field`} key={i}>
        <Input
          error={''}
          errorKeys={`errors:${i}`}
          label={placeholder.get('value')}
          onUpdate={(val, err) => this._updatePlaceholder(val, err, i)}
          patternMatches={minLength(1, `Lets give ${placeholder.get('value')} a value`)}
          successKeys={`values:${i}:header`}
          value={'hello'}
          width={250}/>
      </li>
    ));
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

  };

}
