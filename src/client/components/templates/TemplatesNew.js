// TODO: Use `_.debounce` to make the placeholder finding less expensive?
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

import TemplateEditorView from './TemplateEditorView';

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

  constructor(props) {
    super(props);
    this.state = {
      template: Immutable.fromJS({
        body: '',
        placeholders: [],
        title: ''
      }),
      importingTemplate: false
    };
  }

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
    const {template} = this.state;
    const placeholderValues = template.get('placeholders').map((placeholder) => placeholder.get('value'));

    return (
      <TemplateEditorView
        onSave={this._validateTemplate}
        template={template}/>
    );
  }

  _createError = (message) => {
    this.context.dispatch(AppActionCreators.createFlashMessage('red', message));
  }

  _validateTemplate = (template) => {

    if (template.get('title').length === 0) return this._createError('Please provide a title for your template!');
    if (template.get('rawText').length === 0) return this._createError('Your template can\'t be blank, duh...');
    if (template.get('placeholders').size === 0) {
      return this.context.dispatch(
        AppActionCreators.createModal(
          <ModalConfirm
            confirmText='Yes, go ahead!'
            onConfirm={() => this._createTemplate(rawText)}>
            It looks like you have no placeholders. Are you sure you want to create a template 
            widthout placeholders? - kinda defeats the purpose of a template... Just sayin'
          </ModalConfirm>
        )
      );
    }

    // If all validations pass, we create the template
    this.context.dispatch(TemplateActionCreators.createTemplate(template.toJS()));
  }

}