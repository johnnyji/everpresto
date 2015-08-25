let TimeFormatterMixin = {
  _formatMinutesToSeconds: (minutes) => {
    minutes = parseInt(minutes);
    return minutes * 60;
  },
  _formatHoursToSeconds: (hours) => {
    hours = parseInt(hours);
    let minutes = hours * 60;
    return minutes * 60;
  }
};

export default TimeFormatterMixin;

