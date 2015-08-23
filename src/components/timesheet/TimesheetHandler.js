import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import NewTimesheetButton from '.././timesheet/NewTimesheetButton';
import PreviousTimesheets from '.././timesheet/PreviousTimesheets';

import TimesheetStore from '../.././stores/TimesheetStore';

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

    return (
      <div className='timesheet-handler-wrapper'>
        <NewTimesheetButton />
        <PreviousTimesheets timesheets={s.timesheets} />
      </div>
    );
  }
}
