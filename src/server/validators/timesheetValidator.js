import ModelValidator from './modelValidator';

export default class TimesheetValidator extends ModelValidator {
  constructor() {
    super();
    this.maxTimeInSeconds = 86400;
  }

  validateTimeInSeconds(value) {
    return parseInt(value) <= this.maxTimeInSeconds;
  }
}