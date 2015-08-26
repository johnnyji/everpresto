import ApiCaller from './ApiCaller';

export default class TimesheetCaller extends ApiCaller {
  constructor() {
    super();
  }
  loadTimesheets() {
    return new Promise((resolve, reject) => {
      this._sendAjaxRequest({
        method: 'GET',
        url: `${this.urlPrefix}/timesheets`
      })
      .then(result => { resolve(result) })
      .catch(result => { reject(result) });
    }.bind(this));
  }
}
