import React from 'react';
import ReactTemplate from '../.././shared/ReactTemplate';

import AppActions from '../../.././actions/AppActions';
import NewProjectActions from '../../.././actions/NewProjectActions';
import NewProjectStore from '../../.././stores/NewProjectStore';

import ContentEditable from '../.././shared/ContentEditable';
import ExitFormIcon from '../.././shared/ExitFormIcon';

export default class NewProjectForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_updateState',
      '_exitForm',
      '_setTitle'
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
  _exitForm() {
    AppActions.toggleModal();
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

      </div>
    );
  }
}
