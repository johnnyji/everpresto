import React from 'react';
import ReactTemplate from './ReactTemplate';
import InputFieldError from './InputFieldError';

export default class InputField extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_onInputChange');
  }
  _onInputChange(e) {
    this.props.onInputChange(e);
  }
  render() {
    let p = this.props;
    let onChangeFunc = p.onInputChange || null;

    return (
      <div className='input-field-wrapper'>
        {p.error && <InputFieldError error={p.error} />}
        <input 
          ref='input'
          className={p.inputClassName}
          placeholder={p.inputPlaceholder}
          type={p.type}
          name={p.name}
          onChange={onChangeFunc}></input>
      </div>
    );
  }
}

InputField.propTypes = {
  error: React.PropTypes.any,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func,
  inputClassName: React.PropTypes.string
};