import React from 'react';
import ReactTemplate from './ReactTemplate';
import InputFieldLabel from './InputFieldLabel';

export default class TextField extends ReactTemplate {
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
    let onChangeFunc = p.onInputChange || null;
    let inputClass = p.error ? `${p.inputClassName || ''} input-error` : p.inputClassName;

    return (
      <div className='input-field-wrapper'>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={p.label} />
        <textarea
          ref='textarea'
          className={inputClass}
          placeholder={p.inputPlaceholder}
          name={p.name}
          onFocus={this._toggleShrinkLabel}
          onBlur={this._toggleShrinkLabel}
          onChange={onChangeFunc}></textarea>
      </div>
    );
  }
}

TextField.propTypes = {
  label: React.PropTypes.string,
  error: React.PropTypes.any,
  name: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func,
  inputClassName: React.PropTypes.string
};