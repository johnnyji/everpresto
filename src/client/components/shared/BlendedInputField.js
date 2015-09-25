import React from 'react';

export default class BlendedInputField extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let inputClass = `blended-input-field ${this.props.className}`;
    let field;

    if (this.props.text) {
      field = (
        <textarea 
          {...this.props}
          className={inputClass}
        ></textarea>
      );
    } else {
      field = (
        <input 
          {...this.props}
          className={inputClass}
        ></input>
      );
    }

    return field;
  }
}

BlendedInputField.propTypes = {
  text: React.PropTypes.bool
};