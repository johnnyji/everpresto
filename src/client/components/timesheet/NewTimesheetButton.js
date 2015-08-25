import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';
import Icon from '.././shared/Icon';

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
      <div className='new-timesheet-button-wrapper'>
        <button className='new-timesheet-button' onClick={this._toggleNewTimesheetModal}>
          <Icon icon='create' size='3rem' />
        </button>
      </div>
    );
  }
}
