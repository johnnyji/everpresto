import React from 'react';
import { Calendar } from 'react-widgets';
import ReactTemplate from '../.././shared/ReactTemplate';

import AppActions from '../../.././actions/AppActions';
import NewProjectActions from '../../.././actions/NewProjectActions';
import NewProjectStore from '../../.././stores/NewProjectStore';

import InvoiceSelector from './InvoiceSelector';
import CurrencyInputField from '../.././shared/CurrencyInputField';
import InputFieldLabel from '../.././shared/InputFieldLabel';
import TextField from '../.././shared/TextField';
import ContentEditable from '../.././shared/ContentEditable';
import ExitFormIcon from '../.././shared/ExitFormIcon';

export default class NewProjectForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_exitForm',
      '_setTitle',
      '_setDescription',
      '_setBudget'
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
  _exitForm() {
    AppActions.toggleModal();
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
  render() {
    let s = this.state;

    return (
      <div className='new-project-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
        <ContentEditable 
          className='title-input'
          html={s.project.title || 'New Project'} 
          onChange={this._setTitle}
        />

        <div className='left-content'>
          <InvoiceSelector
            invoiceMethod={s.project.invoice.method}
            paymentDates={s.project.invoice.paymentDates}
          />
        </div>

        <div className='right-content'>
          <InputFieldLabel 
            labelName='Assignees'
            shrinkLabel={false}
          />
          <div>
            <InputFieldLabel labelClass='budget-label' labelName='Budget' shrinkLabel={false} />
            <CurrencyInputField
              className='budget-input'
              onChange={this._setBudget}
            />
          </div>
          <TextField 
            label='Description' 
            onInputChange={this._setDescription}
          />
        </div>

      </div>
    );
  }
}