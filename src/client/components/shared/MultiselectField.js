import React from 'react';
import ReactTemplate from './ReactTemplate';
import { Multiselect } from 'react-widgets';
import InputFieldLabel from './InputFieldLabel';

export default class MultiselectField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { shrinkLabel: false };
    this._bindFunctions(
      '_toggleShrinkLabel',
      '_updateSelections'
    );
  }
  _toggleShrinkLabel() {
    this.setState({ shrinkLabel: !this.state.shrinkLabel });
  }
  _updateSelections(selections) {
    this.props.onUpdateSelections(selections);
  }
  render() {
    let p = this.props;
    let s = this.state;

    return (
      <div className='multiselect-field-wrapper'>
        {p.label &&
          <InputFieldLabel 
            labelName={p.label}
            error={p.error}
            shrinkLabel={s.shrinkLabel}
          />
        }
        <Multiselect
          className='multiselect-input'
          placeholder='Type or click to filter'
          valueField='id'
          textField='name'
          caseSensitive={false}
          filter='contains'
          onChange={this._updateSelections}
          onFocus={this._toggleShrinkLabel}
          onBlur={this._toggleShrinkLabel}
          data={p.options}
        />
      </div>
    );
  }
}

MultiselectField.propTypes = {
  label: React.PropTypes.string,
  options: React.PropTypes.object.isRequired,
  onUpdateSelections: React.PropTypes.func.isRequired,
  error: React.PropTypes.any
};