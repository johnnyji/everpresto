"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TimeFormatterMixin = {
  _formatMinutesToSeconds: function _formatMinutesToSeconds(minutes) {
    minutes = parseInt(minutes);
    return minutes * 60;
  },
  _formatHoursToSeconds: function _formatHoursToSeconds(hours) {
    hours = parseInt(hours);
    var minutes = hours * 60;
    return minutes * 60;
  }
};

exports["default"] = TimeFormatterMixin;
module.exports = exports["default"];