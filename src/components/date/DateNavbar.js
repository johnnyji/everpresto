import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import TimesheetActions from '../.././actions/TimesheetActions';

import Icon from '.././shared/Icon';
import DateHelper from '../.././utils/DateHelper';

export default class DateNavbar extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_setDateBeingViewed');
  }
  _setDateBeingViewed(e) {
    let selectedDate = new Date(e.target.dataset.date);
    TimesheetActions.setDateBeingViewed(selectedDate);
  }
  render() {
    let p = this.props;
    let weekInDates = DateHelper.getWeekOf(p.dateBeingViewed);
    let weekAcronyms = DateHelper.getWeekInAcronyms();

    let headerDate = DateHelper.formatHeaderDate(p.dateBeingViewed);

    let weekdayList = _.map(weekAcronyms, (dayAcronym, i) => {
      let todayIsDateBeingViewed = dayAcronym === DateHelper.formatWeekdayAcronym(p.dateBeingViewed);
      let dayObject = weekInDates[i];
      if (todayIsDateBeingViewed) {
        return <li className='active-day' key={i}>{dayAcronym}</li>;
      }
      return <li data-date={dayObject} onClick={this._setDateBeingViewed} key={i}>{dayAcronym}</li>;
    }.bind(this));

    return (
      <div className='date-navbar'>
        <Icon icon='chevron-left' size='3.5rem' iconClass='prev-week pull-left' />
        <div className='navbar-content'>
          <h2 className='current-date'>{headerDate}</h2>
          <ul className='week'>{weekdayList}</ul>
        </div>
        <Icon icon='chevron-right' size='3.5rem' iconClass='next-week pull-right' />
      </div>
    );
  }
}

DateNavbar.propTypes = {
  dateBeingViewed: React.PropTypes.object.isRequired
};