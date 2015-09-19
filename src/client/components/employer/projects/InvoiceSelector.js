import React from 'react';
import ReactTemplate from '../.././shared/ReactTemplate';

import { DropdownList } from 'react-widgets';
import InputFieldLabel from '../.././shared/InputFieldLabel';
import WeekdaySelector from '../.././shared/WeekdaySelector';
import SelectBox from '../.././shared/SelectBox';

import NumberHelper from '../../.././utils/NumberHelper';

import NewProjectActions from '../../.././actions/NewProjectActions';

export default class InvoiceSelector extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_setInvoiceMethod',
      '_setSinglePaymentDate',
      '_setFirstBiweeklyPaymentDate',
      '_setSecondBiweeklyPaymentDate'
    );
  }
  _setInvoiceMethod(selection) {
    NewProjectActions.setInvoiceMethod(selection.id);
  }
  _setSinglePaymentDate(date) {
    NewProjectActions.setSinglePaymentDate(date.id);
  }
  _setFirstBiweeklyPaymentDate(date) {
    NewProjectActions.setFirstBiweeklyPaymentDate(date.id); 
  }
  _setSecondBiweeklyPaymentDate(date) {
    NewProjectActions.setSecondBiweeklyPaymentDate(date.id);
  }
  render() {
    let selectorContent;
    let p = this.props;
    console.log('Payment Dates: ', p.paymentDates)
    let monthDates = _.map(Array.apply(null, { length: 30 }), (arrayItem, i) => {
      let day = i + 1;
      let dayOfMonth = NumberHelper.addSuffix(day);
      return { id: i, name: `Every ${dayOfMonth}` };
    });

    let invoiceOptions = [
      { id: 'weekly', name: 'Weekly' },
      { id: 'biweekly', name: 'Bi-Weekly' },
      { id: 'monthly', name: 'Monthly' },
      { id: 'notSpecified', name: 'Not Specified' }
    ];

    if (p.invoiceMethod.weekly) {
      selectorContent = (
        <WeekdaySelector
          className='invoice-datepicker'
          onChange={this._setSinglePaymentDate}
        />
      );
    }

    if (p.invoiceMethod.biweekly) {
      selectorContent = (
        <div>
          <DropdownList
            className='invoice-datepicker'
            valueField='id'
            textField='name'
            defaultValue='1st Payment'
            onChange={this._setFirstBiweeklyPaymentDate}
            data={monthDates}
          />
          <span className='divider'>/</span>
          <DropdownList
            className='invoice-datepicker'
            valueField='id'
            textField='name'
            defaultValue='2nd Payment'
            onChange={this._setSecondBiweeklyPaymentDate}
            data={monthDates}
          />
        </div>
      );
    }

    if (p.invoiceMethod.monthly) {
      <DropdownList
        className='invoice-datepicker'
        valueField='id'
        textField='name'
        defaultValue='Payment Date'
        onChange={this._setFirstPaymentDate}
        data={monthDates}
      />
    }

    return (
      <div className='invoice-selector-wrapper'>

        <div className='invoice-selector'>
          <SelectBox
            labelName='Invoice Method'
            valueField='id'
            textField='name'
            defaultValue={invoiceOptions[1]}
            options={invoiceOptions}
            onSelectChange={this._setInvoiceMethod}
          />
        </div>

        <div className='duration-selector'>
          <InputFieldLabel labelName='Payment Dates:' shrinkLabel={false} />
          {selectorContent}
        </div>
        
      </div>
    );
  }
}

InvoiceSelector.propTypes = {
  invoiceMethod: React.PropTypes.object.isRequired,
  paymentDates: React.PropTypes.array.isRequired
};