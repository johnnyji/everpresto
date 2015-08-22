import React from 'react';

export default class InputFieldLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;

    if (p.error) { return <p className='input-field-error'>{p.error}</p>; }
    return <label>{p.labelName}</label>
  }
}

InputFieldLabel.propTypes = {
  error: React.PropTypes.any,
  labelName: React.PropTypes.string.isRequired,
};