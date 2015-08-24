import React from 'react';
import moment from 'moment';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././shared/Icon';

export default class PostTimesheetSubmissionView extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_onRegenerateForm',
      '_formatSecondsToHoursAndMinutes'
    );
  }
  _onRegenerateForm() {
    this.props.regenerateForm();
  }
  _formatSecondsToHoursAndMinutes() {
    let momentSeconds = moment.duration(this.props.timesheet.timeInSeconds, 'seconds');
    let hours = Math.floor(momentSeconds.asHours());
    let minutes = Math.floor(momentSeconds.asMinutes()) - (hours * 60);
    return `${hours}hrs and ${minutes}mins`;
  }
  render() {
    let p = this.props;
    let timeLogged = this._formatSecondsToHoursAndMinutes();

    return (
      <div className='post-timesheet-submission-view-wrapper'>
        <Icon icon='done' size='5rem' />
        <h2>Thanks <strong>{p.timesheet.email}!</strong></h2>
        <p>You have logged {timeLogged} of work today.</p>
        <button className='button' onClick={this._onRegenerateForm}>Submit Another!</button>
      </div>
    );
  }
}

PostTimesheetSubmissionView.propTypes = {
  timesheet: React.PropTypes.object.isRequired,
  regenerateForm: React.PropTypes.func.isRequired,
};