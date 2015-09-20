import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';
import NewProjectActions from '../.././actions/NewProjectActions';
import NewProjectStore from '../.././stores/NewProjectStore';

import InvoiceSelector from './projects/InvoiceSelector';
import CurrencyInputField from '.././shared/CurrencyInputField';
import InputFieldLabel from '.././shared/InputFieldLabel';
import InputField from '.././shared/InputField'
import MultiselectField from '.././shared/MultiselectField';
import TextField from '.././shared/TextField';
import ContentEditable from '.././shared/ContentEditable';


export default class NewProjectHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_setTitle',
      '_setDescription',
      '_setBudget',
      '_updateAssignees'
    );
  }
  componentDidMount() {
    this._unsubscribe = NewProjectStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    let state = NewProjectStore.getState();
    return {
      project: state.project,
      errors: state.errors
    };
  }
  _updateState(state) {
    this.setState({
      project: state.project,
      errors: state.errors
    });
  }
  _setTitle(title) {
    NewProjectActions.setTitle(title);
  }
  _setDescription(description) {
    NewProjectActions.setDescription(description); 
  }
  _setBudget(value) {  
    NewProjectActions.setBudget(value);
  }
  _updateAssignees(employees) {
    NewProjectActions.setAssignees(employees);
  }
  render() {
    let s = this.state;
    let p = this.props;
    let employees = [
      { id: 1, name: 'Johnny Ji' },
      { id: 2, name: 'Jason Derulo' },
      { id: 3, name: 'Mom Agnes' },
      { id: 4, name: 'My Little Bird' }
    ];

    return (
      <div className='new-project-handler-wrapper'>
        <div className='form-content'>

          <InputField
            error={null}
            label='Title'
            onInputChange={this._setTitle}
          />

          <div className='left-content'>
            <TextField 
              label='Description' 
              onInputChange={this._setDescription}
            />
            <InvoiceSelector
              invoiceMethod={s.project.invoice.method}
              paymentDates={s.project.invoice.paymentDates}
            />
          </div>

          <div className='right-content'>
            <MultiselectField 
              label='Assignees'
              error={s.errors.assignees}
              options={employees}
              onUpdateSelections={this._updateAssignees}
            />
            <div>
              <InputFieldLabel labelClass='budget-label' labelName='Budget' shrinkLabel={false} />
              <CurrencyInputField
                className='budget-input'
                onChange={this._setBudget}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
