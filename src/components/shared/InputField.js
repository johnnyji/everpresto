import React from 'react';
import ReactTemplate from './ReactTemplate';
import InputFieldLabel from './InputFieldLabel';

export default class InputField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { showLabel: true };
    this._bindFunctions('_onInputChange', '_toggleLabel');
  }
  _toggleLabel() {
    this.setState({ showLabel: !this.state.showLabel });
  }
  _onInputChange(e) {
    this.props.onInputChange(e);
  }
  render() {
    let p = this.props;
    let s = this.state;
    let onChangeFunc = p.onInputChange || null;
    let showLabel = s.showLabel || p.error;

    return (
      <div className='input-field-wrapper'>
        {showLabel && <InputFieldLabel error={p.error} labelName={p.label} />}
        <input
          ref='input'
          className={p.inputClassName}
          placeholder={p.inputPlaceholder}
          type={p.type}
          name={p.name}
          onFocus={this._toggleLabel}
          onBlur={this._toggleLabel}
          onChange={onChangeFunc}></input>
      </div>
    );
  }
}

InputField.propTypes = {
  label: React.PropTypes.string,
  error: React.PropTypes.any,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string.isRequired,
  onInputChange: React.PropTypes.func,
  inputClassName: React.PropTypes.string
};