import React from 'react';
import _ from 'lodash';
import ReactTemplate from './ReactTemplate';

export default class SelectBox extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_handleChange');
  }
  _handleChange(e) {
    this.props.onSelectChange(e);
  }
  render() {
    let p = this.props;
    let options;

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
      <select defaultValue={p.selectPlaceholder} onChange={this._handleChange}>
        <option value='' disabled>{p.selectPlaceholder}</option>
        {options}
      </select>
    );
  }
}

SelectBox.propTypes = {
  options: React.PropTypes.any.isRequired,
  selectPlaceholder: React.PropTypes.string.isRequired,
  onSelectChange: React.PropTypes.func.isRequired,
};