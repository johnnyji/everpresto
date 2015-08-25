import React from 'react';

export default class InputFieldLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;
    let labelClass = p.shrinkLabel ? 'shrinked-label' : '';

    if (p.error) { return <p className='input-field-error'>{p.error}</p>; }
    return <label className={labelClass}>{p.labelName}</label>
  }
}

InputFieldLabel.propTypes = {
  shrinkLabel: React.PropTypes.bool.isRequired,
  error: React.PropTypes.any,
  labelName: React.PropTypes.string.isRequired,
};