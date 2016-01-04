import moment from 'moment';

const DateHelper = {

  convertSecondsToHoursAndMinutes(seconds) {
    const momentSeconds = moment.duration(seconds, 'seconds');
    let hours = Math.floor(momentSeconds.asHours());
    let minutes = Math.floor(momentSeconds.asMinutes()) - (hours * 60);

    if (hours.toString().length === 1) hours = `0${hours}`;
    if (minutes.toString().length === 1) minutes = `0${minutes}`;

    return {hours, minutes};
  },

  getWeekOf(currentDate) {
    const startOfWeek = moment(currentDate).startOf('week');
    const endOfWeek = moment(currentDate).endOf('week');

    let days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd'); // increments the weekday to avoid infinite loop
    }
    return days;
  },

  getWeekInAcronyms() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  },

  getPreviousWeekFrom(dateObject) {
    const prevWeek = dateObject.setDate(dateObject.getDate() - 7);
    return new Date(prevWeek);
  },

  getNextWeekFrom(dateObject) {
    const nextWeek = dateObject.setDate(dateObject.getDate() + 7);
    return new Date(nextWeek);
  },

  formatDateString(dateString, dateFormat = 'MMM DD, YYYY') {
    return moment(dateString).format(dateFormat);
  },

  formatWeekdayAcronym(dateObject) {
    return moment(dateObject).format('ddd');
  },

  formatWeekDurationFromDate(dateObject = new Date()) {
    const formattedStartOfWeek = moment(dateObject).startOf('week').format('MMM Do');
    const formattedEndOfWeek = moment(dateObject).endOf('week').format('MMM Do');
    return `${formattedStartOfWeek} - ${formattedEndOfWeek}`;
  }

}

export default DateHelper;