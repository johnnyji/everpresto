'use strict';

var Reflux = require('reflux');

var NewProjectActions = Reflux.createActions({
  'setTitle': {},
  'setDescription': {},
  'setBudget': {},
  'setInvoiceMethod': {},
  'setFirstBiweeklyPaymentDate': {},
  'setSecondBiweeklyPaymentDate': {},
  'setSinglePaymentDate': {}
});

module.exports = NewProjectActions;