import React from 'react';
import ReactWidgets from 'react-widgets';
import _ from 'lodash';
import ReactTemplate from './ReactTemplate';

import InputFieldLabel from './InputFieldLabel';

const DropdownList = ReactWidgets.DropdownList;

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
    // let options;

    // if (_.isArray(p.options)) {
    //   options = p.options;
    // } else if (_.isObject(p.options)) {
    //   options = _.map(p.options, (value, key) => {
    //     return <option key={key} value={key}>{value}</option>;
    //   });
    // }

    return (
      <div>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={p.labelName} />
        <DropdownList
          ref='select'
          defaultValue={p.selectPlaceholder}
          onFocus={this._shrinkLabel}
          onBlur={this._unshrinkLabel}
          onChange={this._handleChange}
          data={p.options}
        />
        {/*<select
          ref='select'
          defaultValue={p.selectPlaceholder} 
          onFocus={this._shrinkLabel}
          onBlur={this._unshrinkLabel}
          onChange={this._handleChange}>
          <option className='default-option' value='' disabled>{p.selectPlaceholder}</option>
          {options}
        </select>*/}
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