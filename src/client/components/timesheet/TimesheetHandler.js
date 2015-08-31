import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import DateNavbar from '.././date/DateNavbar';
import NewTimesheetButton from '.././timesheet/NewTimesheetButton';
import PreviousTimesheets from '.././timesheet/PreviousTimesheets';

import DateHelper from '../.././utils/DateHelper';

import TimesheetActions from '../.././actions/TimesheetActions';
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
  componentWillMount() {
    this._protectComponent();
    TimesheetActions.loadTimesheets();
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
      dateBeingViewed: state.dateBeingViewed,
      timesheets: state.timesheets,
      componentReady: state.componentReady
    };
  }
  _updateState(state) {
    this.setState({
      dateBeingViewed: state.dateBeingViewed,
      timesheets: state.timesheets,
      componentReady: state.componentReady
    });
  }
  render() {
    let s = this.state;
    let p = this.props;
    let weekBeingViewed = DateHelper.formatWeekDurationFromDate(s.dateBeingViewed);
    let formattedDateBeingViewed = DateHelper.formatHeaderDate(s.dateBeingViewed);
    let timesheetsBeingViewed =  _.filter(s.timesheets, function(timesheet) {
      return  DateHelper.formatDate(timesheet.createdAt).toLocaleDateString() === DateHelper.formatDate(s.dateBeingViewed).toLocaleDateString();
    }.bind(this));

    return (
      <div className='timesheet-handler-wrapper'>
        <DateNavbar 
          weekBeingViewed={weekBeingViewed} 
          dateBeingViewed={s.dateBeingViewed}
        />
        <NewTimesheetButton />
        <PreviousTimesheets
          timesheets={timesheetsBeingViewed} 
          dateBeingViewed={formattedDateBeingViewed}
        />
      </div>
    );
  }
}