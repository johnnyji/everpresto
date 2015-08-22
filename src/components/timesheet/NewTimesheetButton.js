import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';

export default class NewTimesheetButton extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_toggleNewTimesheetModal');
  }
  _toggleNewTimesheetModal() {
    AppActions.toggleModal('newTimesheet');
  }
  render() {
    return (
      <div>
        <p onClick={this._toggleNewTimesheetModal}>New Timesheet</p>
      </div>
    );
  }
}
