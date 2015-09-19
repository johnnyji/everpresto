import React from 'react';
import { DropdownList } from 'react-widgets';

export default class WeekdaySelector extends React.Component {
  constructor(props) {
    super(props);
    this._onSelect = this._onSelect.bind(this);
  }
  _onSelect(e) {
    this.props.onChange(e);
  }
  render() {
    return (
      <div>
        <DropdownList
          {...this.props}
          valueField='id'
          textField='name'
          defaultValue='Select Weekday'
          onChange={this._onSelect}
          data={[
            { id: 1, name: 'Monday' },
            { id: 2, name: 'Tuesday' },
            { id: 3, name: 'Wednesday' },
            { id: 4, name: 'Thursday' },
            { id: 5, name: 'Friday' },
            { id: 6, name: 'Saturday' },
            { id: 7, name: 'Sunday' }
          ]}
        />
      </div>
    );
  }
}

WeekdaySelector.propTypes = {
  onChange: React.PropTypes.func.isRequired
};