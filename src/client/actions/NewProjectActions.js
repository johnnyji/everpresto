var Reflux = require('reflux');

var NewProjectActions = Reflux.createActions({
  'setTitle': {},
  'setDescription': {},
  'setBudget': {},
  'setInvoiceMethod': {},
  'setFirstBiweeklyPaymentDate': {},
  'setSecondBiweeklyPaymentDate': {},
  'setSinglePaymentDate': {},
  'setAssignees': {}
});

module.exports = NewProjectActions;