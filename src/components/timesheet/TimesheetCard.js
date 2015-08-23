import React from 'react';

export default class TimesheetCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let timesheet = this.props.timesheet;

    return (
      <div className='timesheet-card-wrapper'>
        <p>{timesheet.email}</p>
      </div>
    );
  }
}

TimesheetCard.propTypes = {
  timesheet: React.PropTypes.object.isRequired,
};