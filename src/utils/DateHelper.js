import moment from 'moment';

export default class DateHelper {
  static getWeekOf(currentDate) {
    var startOfWeek = moment(currentDate).startOf('week');
    var endOfWeek = moment(currentDate).endOf('week');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd'); // increments the weekday to avoid infinite loop
    }
    return days;
  }

  static getWeekInAcronyms() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  static formatWeekdayAcronym(dateObject) {
    return moment(dateObject).format('ddd');
  }

  static formatHeaderDate(dateObject) {
    return moment(dateObject).format('ddd, MMM Do');
  }

  static convertSecondsToHoursAndMinutes(seconds) {
    let momentSeconds = moment.duration(seconds, 'seconds');
    let hours = Math.floor(momentSeconds.asHours());
    let minutes = Math.floor(momentSeconds.asMinutes()) - (hours * 60);

    if (hours.toString().length === 1) { hours = '0' + hours; }
    if (minutes.toString().length === 1) { minutes = '0' + minutes; }
    return {
      hours: hours,
      minutes: minutes
    };
  }

}