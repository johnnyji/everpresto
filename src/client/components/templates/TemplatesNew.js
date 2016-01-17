// TODO: Use `_.debounce` to make the placeholder finding less expensive?
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ModalConfirm from '.././modals/ModalConfirm';
import TemplateEditorView from './TemplateEditorView';

import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'TemplatesNew';

@connect((state) => ({
  templateCreated: state.templates.get('templateCreated')
}))
export default class TemplatesNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    templateCreated: PropTypes.bool.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.templateCreated) {
      this.context.dispatch(AppActionCreators.createFlashMessage('green', 'Template successfully created!'));
      this.context.history.push('/dashboard/templates');
    }
  }

  componentWillUnmount() {
    // Resets the `templateCreated` state to false, because we've already used it to navigate
    // to the template index.
    this.context.dispatch(TemplateActionCreators.resetTemplateCreated());
  }

  render() {
    return <TemplateEditorView onSave={this._validateTemplate}/>;
  }

  _createError = (message) => {
    this.context.dispatch(AppActionCreators.createFlashMessage('red', message));
  };

  _createTemplate = (template) => {
    this.context.dispatch(TemplateActionCreators.createTemplate(template.toJS()));
  };

  _validateTemplate = (template) => {
    if (template.get('title').length === 0) return this._createError('Please provide a title for your template!');
    if (template.get('rawText').length === 0) return this._createError('Your template can\'t be blank!');
    if (template.get('placeholders').size === 0) {
      return this.context.dispatch(
        AppActionCreators.createModal(
          <ModalConfirm
            confirmText='Yes, go ahead!'
            onConfirm={() => this._createTemplate(template)}>
            It looks like you have no placeholders. Are you sure you want to create a template 
            widthout placeholders? - kinda defeats the purpose of a template... Just sayin'
          </ModalConfirm>
        )
      );
    }

    // If all validations pass, we create the template
    this._createTemplate(template);
  };

}