import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import Button from '.././ui/Button';
import Input from '.././ui/Input';
import ModalWrapper from '.././ui/ModalWrapper';
import RegexHelper from '../.././utils/RegexHelper';
import mergeDeep from '../.././utils/mergeDeep';

const displayName = 'ModalCreatePlaceholder';

export default class ModalCreatePlaceholder extends Component {

  static displayName = displayName;

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
      })
    };
  }

  render() {
    const {placeholder} = this.state;

    return (
      <ModalWrapper className={displayName} height={400} width={600}>
        <div className={`${displayName}-demo-section`}>
          <h2 className={`${displayName}-demo-section-heading`}>Placeholders make life easy!</h2>
          <p className={`${displayName}-demo-section-description`}>
            When you use this template, every <mark>{placeholder.getIn(['values', 'value'])}</mark> will be replaced with whatever you type into an input field called <b>{placeholder.getIn(['values', 'label'])}</b>
          </p>
        </div>
        <div className={`${displayName}-input-section`}>
          <Input
            autoFocus={true}
            className={`${displayName}-input-section-input-field`}
            defaultValue={placeholder.getIn(['values', 'label'])}
            errorKeys='errors:label'
            label='Display'
            onUpdate={this._updatePlaceholder}
            patternMatches={RegexHelper.minLength(1, 'What\'s the display label for your placeholder?')}
            ref='placeholderLabel'
            successKeys='values:label'/>
          <Input
            className={`${displayName}-input-section-input-field`}
            defaultValue={placeholder.getIn(['values', 'value'])}
            errorKeys='errors:value'
            label='Value'
            onUpdate={this._updatePlaceholder}
            patternMatches={RegexHelper.minLength(1, 'What\'s the actual placeholder gonna be?')}
            ref='placeholderValue'
            successKeys='values:value'/>
          <Button
            className={`${displayName}-input-section-save-button`}
            color='green'
            onClick={() => {}}
            text='Create Placeholder'/>
        </div>
      </ModalWrapper>
    );
  }

  _updatePlaceholder = (value, error, nestedValueObj, nestedErrorObj) => {
    const placeholder = this.state.placeholder.mergeDeep(mergeDeep(nestedValueObj, nestedErrorObj));
    console.log(placeholder.toJS());
    this.setState({placeholder});
  }

}
