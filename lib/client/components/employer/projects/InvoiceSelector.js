'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedReactTemplate = require('../.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _reactWidgets = require('react-widgets');

var _sharedInputFieldLabel = require('../.././shared/InputFieldLabel');

var _sharedInputFieldLabel2 = _interopRequireDefault(_sharedInputFieldLabel);

var _sharedWeekdaySelector = require('../.././shared/WeekdaySelector');

var _sharedWeekdaySelector2 = _interopRequireDefault(_sharedWeekdaySelector);

var _sharedSelectBox = require('../.././shared/SelectBox');

var _sharedSelectBox2 = _interopRequireDefault(_sharedSelectBox);

var _utilsNumberHelper = require('../../.././utils/NumberHelper');

var _utilsNumberHelper2 = _interopRequireDefault(_utilsNumberHelper);

var _actionsNewProjectActions = require('../../.././actions/NewProjectActions');

var _actionsNewProjectActions2 = _interopRequireDefault(_actionsNewProjectActions);

var InvoiceSelector = (function (_ReactTemplate) {
  _inherits(InvoiceSelector, _ReactTemplate);

  function InvoiceSelector(props) {
    _classCallCheck(this, InvoiceSelector);

    _get(Object.getPrototypeOf(InvoiceSelector.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_setInvoiceMethod', '_setSinglePaymentDate', '_setFirstBiweeklyPaymentDate', '_setSecondBiweeklyPaymentDate');
  }

  _createClass(InvoiceSelector, [{
    key: '_setInvoiceMethod',
    value: function _setInvoiceMethod(selection) {
      _actionsNewProjectActions2['default'].setInvoiceMethod(selection.id);
    }
  }, {
    key: '_setSinglePaymentDate',
    value: function _setSinglePaymentDate(date) {
      _actionsNewProjectActions2['default'].setSinglePaymentDate(date.id);
    }
  }, {
    key: '_setFirstBiweeklyPaymentDate',
    value: function _setFirstBiweeklyPaymentDate(date) {
      _actionsNewProjectActions2['default'].setFirstBiweeklyPaymentDate(date.id);
    }
  }, {
    key: '_setSecondBiweeklyPaymentDate',
    value: function _setSecondBiweeklyPaymentDate(date) {
      _actionsNewProjectActions2['default'].setSecondBiweeklyPaymentDate(date.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var selectorContent = undefined;
      var p = this.props;
      console.log('Payment Dates: ', p.paymentDates);
      var monthDates = _.map(Array.apply(null, { length: 30 }), function (arrayItem, i) {
        var day = i + 1;
        var dayOfMonth = _utilsNumberHelper2['default'].addSuffix(day);
        return { id: i, name: 'Every ' + dayOfMonth };
      });

      var invoiceOptions = [{ id: 'weekly', name: 'Weekly' }, { id: 'biweekly', name: 'Bi-Weekly' }, { id: 'monthly', name: 'Monthly' }, { id: 'notSpecified', name: 'Not Specified' }];

      if (p.invoiceMethod.weekly) {
        selectorContent = _react2['default'].createElement(_sharedWeekdaySelector2['default'], {
          className: 'invoice-datepicker',
          onChange: this._setSinglePaymentDate
        });
      }

      if (p.invoiceMethod.biweekly) {
        selectorContent = _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(_reactWidgets.DropdownList, {
            className: 'invoice-datepicker',
            valueField: 'id',
            textField: 'name',
            defaultValue: '1st Payment',
            onChange: this._setFirstBiweeklyPaymentDate,
            data: monthDates
          }),
          _react2['default'].createElement(
            'span',
            { className: 'divider' },
            '/'
          ),
          _react2['default'].createElement(_reactWidgets.DropdownList, {
            className: 'invoice-datepicker',
            valueField: 'id',
            textField: 'name',
            defaultValue: '2nd Payment',
            onChange: this._setSecondBiweeklyPaymentDate,
            data: monthDates
          })
        );
      }

      if (p.invoiceMethod.monthly) {
        _react2['default'].createElement(_reactWidgets.DropdownList, {
          className: 'invoice-datepicker',
          valueField: 'id',
          textField: 'name',
          defaultValue: 'Payment Date',
          onChange: this._setFirstPaymentDate,
          data: monthDates
        });
      }

      return _react2['default'].createElement(
        'div',
        { className: 'invoice-selector-wrapper' },
        _react2['default'].createElement(
          'div',
          { className: 'invoice-selector' },
          _react2['default'].createElement(_sharedSelectBox2['default'], {
            labelName: 'Invoice Method',
            valueField: 'id',
            textField: 'name',
            defaultValue: invoiceOptions[1],
            options: invoiceOptions,
            onSelectChange: this._setInvoiceMethod
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'duration-selector' },
          _react2['default'].createElement(_sharedInputFieldLabel2['default'], { labelName: 'Payment Dates:', shrinkLabel: false }),
          selectorContent
        )
      );
    }
  }]);

  return InvoiceSelector;
})(_sharedReactTemplate2['default']);

exports['default'] = InvoiceSelector;

InvoiceSelector.propTypes = {
  invoiceMethod: _react2['default'].PropTypes.object.isRequired,
  paymentDates: _react2['default'].PropTypes.array.isRequired
};
module.exports = exports['default'];