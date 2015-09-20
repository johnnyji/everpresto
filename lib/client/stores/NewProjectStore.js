'use strict';

var Reflux = require('reflux');
var _ = require('lodash');
var NewProjectActions = require('.././actions/NewProjectActions');

var ErrorHandlerMixin = require('./mixins/ErrorHandlerMixin');
var InputValidator = require('.././validators/InputValidator');

var NewProjectStateTemplate = {
  project: {
    title: null,
    budgetInCents: null,
    invoice: {
      method: {
        weekly: false,
        biweekly: true,
        monthly: false,
        notSpecified: false
      },
      paymentDates: []
    },
    assignees: []
  },
  errors: {
    title: null,
    assignees: null
  }
};

var NewProjectStore = Reflux.createStore({
  mixins: [ErrorHandlerMixin],
  init: function init() {
    this.state = _.cloneDeep(NewProjectStateTemplate);
    this.listenToMany(NewProjectActions);
  },
  getState: function getState() {
    return this.state;
  },
  onSetTitle: function onSetTitle(title) {
    this.state.project.title = title;
    this.trigger(this.state);
  },
  onSetDescription: function onSetDescription(description) {
    this.state.project.description = description;
    this.trigger(this.state);
  },
  onSetBudget: function onSetBudget(value) {
    this.state.project.budgetInCents = value;
    this.trigger(this.state);
  },
  onSetInvoiceMethod: function onSetInvoiceMethod(invoiceMethod) {
    var methods = this.state.project.invoice.method;

    this.state.project.invoice.method = _.mapValues(methods, function (v) {
      return v = false;
    });
    this.state.project.invoice.method[invoiceMethod] = true;
    this.trigger(this.state);
  },
  onSetSinglePaymentDate: function onSetSinglePaymentDate(dateId) {
    var method = this.state.project.invoice.method;

    // if the invoice method is weekly or monthly, then only a single date needs to be set
    if (method.weekly) this.state.project.invoice.paymentDates = [dateId];
    if (method.monthly) this.state.project.invoice.paymentDates = [dateId];
    this.trigger(this.state);
  },
  onSetFirstBiweeklyPaymentDate: function onSetFirstBiweeklyPaymentDate(dateId) {
    this.state.project.invoice.paymentDates[0] = dateId;
    this.trigger(this.state);
  },
  onSetSecondBiweeklyPaymentDate: function onSetSecondBiweeklyPaymentDate(dateId) {
    this.state.project.invoice.paymentDates[1] = dateId;
    this.trigger(this.state);
  },
  onSetAssignees: function onSetAssignees(employees) {
    employees.length === 0 ? this._addInputError('assignees', 'Please select at least 1 assignee') : this._clearInputError('assignees');

    this.state.project.assignees = employees;
    this.trigger(this.state);
  }
});

module.exports = NewProjectStore;