'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var DateHelper = (function () {
  function DateHelper() {
    _classCallCheck(this, DateHelper);
  }

  _createClass(DateHelper, null, [{
    key: 'formatDate',
    value: function formatDate(dateString) {
      return new Date(dateString);
    }
  }, {
    key: 'getWeekOf',
    value: function getWeekOf(currentDate) {
      var startOfWeek = (0, _moment2['default'])(currentDate).startOf('week');
      var endOfWeek = (0, _moment2['default'])(currentDate).endOf('week');

      var days = [];
      var day = startOfWeek;

      while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd'); // increments the weekday to avoid infinite loop
      }
      return days;
    }
  }, {
    key: 'getWeekInAcronyms',
    value: function getWeekInAcronyms() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  }, {
    key: 'getPreviousWeekFrom',
    value: function getPreviousWeekFrom(dateObject) {
      var prevWeek = dateObject.setDate(dateObject.getDate() - 7);
      return new Date(prevWeek);
    }
  }, {
    key: 'getNextWeekFrom',
    value: function getNextWeekFrom(dateObject) {
      var nextWeek = dateObject.setDate(dateObject.getDate() + 7);
      return new Date(nextWeek);
    }
  }, {
    key: 'formatWeekdayAcronym',
    value: function formatWeekdayAcronym(dateObject) {
      return (0, _moment2['default'])(dateObject).format('ddd');
    }
  }, {
    key: 'formatHeaderDate',
    value: function formatHeaderDate(dateObject) {
      return (0, _moment2['default'])(dateObject).format('dddd, MMMM Do YYYY');
    }
  }, {
    key: 'formatWeekDurationFromDate',
    value: function formatWeekDurationFromDate(dateObject) {
      dateObject = dateObject || new Date();
      var formattedStartOfWeek = (0, _moment2['default'])(dateObject).startOf('week').format('MMM Do');
      var formattedEndOfWeek = (0, _moment2['default'])(dateObject).endOf('week').format('MMM Do');
      return formattedStartOfWeek + ' - ' + formattedEndOfWeek;
    }
  }, {
    key: 'convertSecondsToHoursAndMinutes',
    value: function convertSecondsToHoursAndMinutes(seconds) {
      var momentSeconds = _moment2['default'].duration(seconds, 'seconds');
      var hours = Math.floor(momentSeconds.asHours());
      var minutes = Math.floor(momentSeconds.asMinutes()) - hours * 60;

      if (hours.toString().length === 1) {
        hours = '0' + hours;
      }
      if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
      }
      return {
        hours: hours,
        minutes: minutes
      };
    }
  }]);

  return DateHelper;
})();

exports['default'] = DateHelper;
module.exports = exports['default'];