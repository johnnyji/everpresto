import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import ReactWidgets from 'react-widgets';
import ReactTemplate from '.././shared/ReactTemplate';

import TimesheetActions from '../.././actions/TimesheetActions';

import Icon from '.././shared/Icon';
import DateHelper from '../.././utils/DateHelper';

const DateTimePicker = ReactWidgets.DateTimePicker;
const Calender = ReactWidgets.Calender;

export default class DateNavbar extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { showCalenderSelect: false };
    this._bindFunctions(
      '_setDateBeingViewedFromCalender',
      '_setDateBeingViewed',
      '_showPrevWeek',
      '_showNextWeek',
      '_toggleCalenderSelect'
    );
  }
  _setDateBeingViewedFromCalender(date) {
    TimesheetActions.setDateBeingViewed(date);
    this.setState({ showCalenderSelect: false });
  }
  _setDateBeingViewed(e) {
    let selectedDate = new Date(e.target.dataset.date);
    TimesheetActions.setDateBeingViewed(selectedDate);
  }
  _showPrevWeek() {
    let prevWeek = DateHelper.getPreviousWeekFrom(this.props.dateBeingViewed);
    TimesheetActions.setDateBeingViewed(prevWeek);
  }
  _showNextWeek() {
    let nextWeek = DateHelper.getNextWeekFrom(this.props.dateBeingViewed);
    TimesheetActions.setDateBeingViewed(nextWeek);
  }
  _toggleCalenderSelect() {
    this.setState({ showCalenderSelect: !this.state.showCalenderSelect });
  }
  render() {
    let p = this.props;
    let s = this.state;
    let weekInDates = DateHelper.getWeekOf(p.dateBeingViewed);
    let weekAcronyms = DateHelper.getWeekInAcronyms();
    let calenderSelectClass = s.showCalenderSelect ? 'active' : '';
    let header;

    let weekdayList = weekAcronyms.map((dayAcronym, i) => {
      let todayIsDateBeingViewed = dayAcronym === DateHelper.formatWeekdayAcronym(p.dateBeingViewed);
      let dayObject = weekInDates[i];
      if (todayIsDateBeingViewed) {
        return <li className='active-day' key={i}>{dayAcronym}</li>;
      }
      return <li data-date={dayObject} onClick={this._setDateBeingViewed} key={i}>{dayAcronym}</li>;
    });

    if (s.showCalenderSelect) {
      header = (
        <div className='calender-container'>
          <DateTimePicker 
            defaultValue={p.dateBeingViewed}
            editFormat='d'
            format='MMM dd yyyy'
            time={false} 
            onChange={this._setDateBeingViewedFromCalender}
          />
        </div>
      );
    } else {
      header = (
        <h2 className='week-being-viewed' onClick={this._toggleCalenderSelect}>
          {p.weekBeingViewed}
        </h2>
      );
    }

    return (
      <nav className='date-navbar'>
        <div onClick={this._showPrevWeek}>
          <Icon icon='chevron-left' size='3.25rem' iconClass='prev-week pull-left' />
        </div>
        <div className='navbar-content'>
          <div className={`calender-icon-container ${calenderSelectClass}`} onClick={this._toggleCalenderSelect}>
            <Icon icon='today' size='1.8rem'/>
          </div>
          {header}
          <ul className='week'>{weekdayList}</ul>
        </div>
        <div onClick={this._showNextWeek}>
          <Icon icon='chevron-right' size='3.25rem' iconClass='next-week pull-right' />
        </div>
      </nav>
    );
  }
}

DateNavbar.propTypes = {
  weekBeingViewed: React.PropTypes.string.isRequired,
};