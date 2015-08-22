let TimeFormatterMixin = {
  _formatMinutesToSeconds: (minutes) => {
    return minutes * 60;
  },
  formatHoursToSeconds: (hours) => {
    let minutes = hours * 60;
    _formatMinutesToSeconds(minutes);
  }
};

export default TimeFormatterMixin;

