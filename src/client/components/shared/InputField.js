import React from 'react';
import ReactTemplate from './ReactTemplate';
import InputFieldLabel from './InputFieldLabel';

export default class InputField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { shrinkLabel: false };
    this._bindFunctions('_onInputChange', '_toggleShrinkLabel');
  }
  _toggleShrinkLabel() {
    this.setState({ shrinkLabel: !this.state.shrinkLabel });
  }
  _onInputChange(e) {
    this.props.onInputChange(e);
  }
  render() {
    let p = this.props;
    let s = this.state;
    let placeholder = p.inputPlaceholder || '';
    let onChangeFunc = p.onInputChange || null;
    let inputClass = p.error ? `${p.inputClassName || ''} input-error` : p.inputClassName;

    return (
      <div className='input-field-wrapper'>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={p.label} />
        <input
          ref='input'
          className={inputClass}
          placeholder={placeholder}
          type={p.type || 'text'}
          name={p.name}
          onFocus={this._toggleShrinkLabel}
          onBlur={this._toggleShrinkLabel}
          onChange={onChangeFunc}></input>
      </div>
    );
  }
}

InputField.propTypes = {
  label: React.PropTypes.string,
  error: React.PropTypes.any,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  onInputChange: React.PropTypes.func,
  inputClassName: React.PropTypes.string
};