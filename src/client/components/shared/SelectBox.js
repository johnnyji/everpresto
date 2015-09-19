import React from 'react';
import { DropdownList } from 'react-widgets';
import _ from 'lodash';
import ReactTemplate from './ReactTemplate';

import InputFieldLabel from './InputFieldLabel';

export default class SelectBox extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { shrinkLabel: false };
    this._bindFunctions(
      '_handleChange',
      '_shrinkLabel',
      '_unshrinkLabel'
    );
  }
  _handleChange(value) {
    this._unshrinkLabel();
    this.props.onSelectChange(value);
  }
  _shrinkLabel() {
    this.setState({ shrinkLabel: true });
  }
  _unshrinkLabel() {
    this.setState({ shrinkLabel: false });
  }
  render() {
    let p = this.props;
    let s = this.state;

    return (
      <div>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={p.labelName} />
        <DropdownList
          {...this.props}
          ref='select'
          onFocus={this._shrinkLabel}
          onBlur={this._unshrinkLabel}
          onChange={this._handleChange}
          data={p.options}
        />
      </div>
    );
  }
}

SelectBox.propTypes = {
  error: React.PropTypes.any,
  labelName: React.PropTypes.string.isRequired,
  options: React.PropTypes.any.isRequired,
  onSelectChange: React.PropTypes.func.isRequired,
};