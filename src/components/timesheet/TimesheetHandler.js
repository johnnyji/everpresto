import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import NewTimesheetButton from '.././timesheet/NewTimesheetButton';
import PreviousTimesheets from '.././timesheet/PreviousTimesheets';

import TimesheetStore from '../.././stores/TimesheetStore';
import TimesheetActions from '../.././actions/TimesheetActions';

export default class TimesheetHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_getInitialState',
      '_updateState'
    );
  }
  componentDidMount() {
    this._unsubscribe = TimesheetStore.listen(this._updateState); 
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    let state = TimesheetStore.getState();
    return {
      timesheets: state.timesheets
    };
  }
  _updateState(state) {
    this.setState({
      timesheets: state.timesheets
    });
  }
  render() {
    let s = this.state;
    let p = this.props;
    let content;

    if (s.timesheets.length === 0) {
      content = (
        <div>
          <h2 className='no-timesheets-header'>No Timesheets Yet.</h2>
          <p className='no-timesheets-message'>Go create one. They're free!</p>
        </div>
      );
    } else {
      content = <PreviousTimesheets />
    }

    return (
      <div className='timesheet-handler-wrapper'>
        <NewTimesheetButton />
        {content}
      </div>
    );
  }
}
