import React from 'react';
import accounting from 'accounting';

export default class CurrencyInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value : props.value };
    this._onChange = this._onChange.bind(this);
  }
  _onChange(e) {
    let value = this._maskedInputValue(e.target.value, e.target.validity);

    this.setState({value}, () => {
      if (this.props.onChange) {
        // call original callback, if it exists
        let valueInCents = parseInt(value) * 100;
        this.props.onChange(valueInCents);
      }
    });
  }
  _maskedInputValue(value, validity = {}) {
    // a falsy value with "good" input indicates the user is clearing the text,
    // so allow them to.
    if (!value && !validity.badInput) { return null; }

    // extract digits. if no digits, fill in a zero.
    let digits = value.match(/\d/g) || ['0'];

    // zero-pad a one-digit input
    if (digits.length === 1) {
      digits.unshift('0');
    }

    // add a decimal point
    digits.splice(digits.length - 2, 0, '.');

    // make a number with 2 decimal points
    return Number(digits.join('')).toFixed(2);
  }
  render() {
    let value = accounting.formatMoney(this.state.value, '$', 2);
    
    return (
      <input 
        {...this.props}
        type='text' 
        pattern='\d*'
        value={value}
        onChange={this._onChange}
      />
    );
  }

}

CurrencyInputField.propTypes = {
  onChange: React.PropTypes.func
};