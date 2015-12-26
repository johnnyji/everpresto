import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import TemplateEditorView from './TemplateEditorView';

import AppActionCreators from '../.././actions/AppActionCreators'
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

@connect((state) => ({
  template: state.templates.get('templateBeingEdited')
}))
export default class TemplatesEdit extends Component {

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    template: CustomPropTypes.template.isRequired
  };

  componentWillUnmount() {
    this.context.dispatch(TemplateActionCreators.resetTemplateBeingEdited());
  }

  componentWillUpdate(nextProps, nextState) {
    // If template is successfully edited (meaning theres no more `templateBeingEdited`),
    // log a flash message and redirect user to the template index view
    if (!Boolean(nextProps.template)) {
      this.context.dispatch(
        AppActionCreators.createFlashMessage(
          'green',
          <span><b>{this.props.template.get('title')}</b> was successfully updated!</span>
        )
      );
      this.context.history.push('/dashboard/templates');
    }
  }

  render() {
    const {template} = this.props;
    console.log(template);
    return (
      <TemplateEditorView
        mode='edit'
        template={template}
        onSave={this._handleSave}/>
    );
  }

  _handleSave = (template) => {
    if (template.get('title').length === 0) return this._createError('Please provide a title for your template!');
    if (template.get('rawText').length === 0) return this._createError('Your template can\'t be blank, duh...');
    if (template.get('placeholders').size === 0) {
      return this.context.dispatch(
        AppActionCreators.createModal(
          <ModalConfirm
            confirmText='Yes, go ahead!'
            onConfirm={() => this._createTemplate(rawText)}>
            It looks like you have no placeholders. Are you sure you want to save the template 
            widthout placeholders? There would be nothing for you to - well... Replace.
          </ModalConfirm>
        )
      );
    }

    // If all validations pass, we create the template
    this.context.dispatch(
      TemplateActionCreators.updateTemplate(this.props.template.get('_id'), template.toJS())
    );
  }
}
