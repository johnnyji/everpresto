import React from 'react';
import _ from 'lodash';
import ReactTemplate from './ReactTemplate';

import InputFieldLabel from './InputFieldLabel';

export default class SelectBox extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { shrinkLabel: false };
    this._bindFunctions(
      '_handleChange',
      '_toggleShrinkLabel'
    );
  }
  _handleChange(e) {
    this.props.onSelectChange(e);
  }
  _toggleShrinkLabel() {
    this.setState({ shrinkLabel: !this.state.shrinkLabel });
  }
  render() {
    let p = this.props;
    let s = this.state;
    let options;
    let selectClass = p.error ? 'input-error' : '';

    if (_.isArray(p.options)) {
      options = _.map(p.options, (option, i) => {
        return <option key={i} value={option}>{option}</option>;
      });
    } else if (_.isObject(p.options)) {
      options = _.map(p.options, (value, key) => {
        return <option key={key} value={key}>{value}</option>;
      });
    }

    return (
      <div>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={p.labelName} />
        <select
          className={selectClass}
          defaultValue={p.selectPlaceholder} 
          onFocus={this._toggleShrinkLabel}
          onBlur={this._toggleShrinkLabel}
          onChange={this._handleChange}>
          <option value='' disabled>{p.selectPlaceholder}</option>
          {options}
        </select>
      </div>
    );
  }
}

SelectBox.propTypes = {
  error: React.PropTypes.any,
  labelName: React.PropTypes.string.isRequired,
  options: React.PropTypes.any.isRequired,
  selectPlaceholder: React.PropTypes.string.isRequired,
  onSelectChange: React.PropTypes.func.isRequired,
};