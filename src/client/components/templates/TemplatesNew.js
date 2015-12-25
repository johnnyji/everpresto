// TODO: Use `_.debounce` to make the placeholder finding less expensive?
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import strip from 'strip';
import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import TextEditorHelper from '../.././utils/TextEditorHelper';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import List from '.././ui/List';
import ListItem from '.././ui/ListItem';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import ModalCreatePlaceholder from '.././modals/ModalCreatePlaceholder';
import ModalConfirm from '.././modals/ModalConfirm';
import DocumentEditor from '.././shared/DocumentEditor';
import EditorSidebar from '.././shared/EditorSidebar';
import FileConverter from '.././shared/FileConverter';

const {removeCaretPositionMarker, removeZeroWidthSpace} = TextEditorHelper;
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
        body: 'd',
        placeholders: [],
        title: 'd'
      }),
      importingTemplate: false
    };
  }

  componentDidUpdate() {
    if (this.props.templateCreated) {
      this.context.dispatch(AppActionCreators.createFlashMessage('green', 'Template created!'));
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
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('body')}
          isTemplateEditor={true}
          onBodyChange={(value) => this._updateTemplateAttribute('body', value)}
          onTitleChange={(value) => this._updateTemplateAttribute('title', value)}
          templatePlaceholders={placeholderValues}
          titlePlaceholder='Untitled Template'
          title={template.get('title')}/>
        <EditorSidebar>
          <FileConverter onEnd={this._handleTemplateUploadEnd} onStart={this._handleTemplateUploadStart} />
          <Button color='blue' icon='add' onClick={this._showAddPlaceholderModal} text='Add Placeholder' />
          <List>{this._renderPlaceholders()}</List>
          <Button
            color='green'
            icon='done'
            onClick={this._validateTemplate}
            text='Create Template!' />
        </EditorSidebar>
      </DashboardContentWrapper>
    );
  }

  _addPlaceholder = (newPlaceholder) => {
    return this.state.template.get('placeholders').push(newPlaceholder);
  }

  _createError = (message) => {
    this.context.dispatch(AppActionCreators.createFlashMessage('red', message));
  }

  _createTemplate = (rawText) => {
    // Removes any zero width spaces and the caret position marker
    let template = this.state.template.set('rawText', removeZeroWidthSpace(rawText));
    template = template.set('body', removeCaretPositionMarker(removeZeroWidthSpace(template.get('body'))));

    this.context.dispatch(TemplateActionCreators.createTemplate(template.toJS()));
  }

  _handleTemplateUploadEnd = (body) => {
    this.setState({
      importingTemplate: false,
      template: this.state.template.merge({body})
    });
  }

  _handleTemplateUploadStart = () => {
    this.setState({importingTemplate: true});
  }

  _removePlaceholder = (placeholderObj) => {
    const placeholderState = this.state.template.get('placeholders');
    return placeholderState.splice(placeholderState.indexOf(placeholderObj), 1);
  }

  _renderPlaceholders = () => {
    return this.state.template.get('placeholders').map((placeholder, i) => {
      return (
        <ListItem
          key={i}
          onRemove={() => this._updateTemplateAttribute('placeholders', this._removePlaceholder(placeholder))}
          removable={true}>
          {placeholder.get('label')}
          <Icon icon='arrow-forward' size={12} />
          <mark>{placeholder.get('value')}</mark>
        </ListItem>
      );
    });
  }

  _showAddPlaceholderModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalCreatePlaceholder
          onCreate={(placeholder) => this._updateTemplateAttribute('placeholders', this._addPlaceholder(placeholder))}
          placeholders={this.state.template.get('placeholders')}/>
      )
    );
  }

  _updateTemplateAttribute = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  }

  _validateTemplate = () => {
    const {template} = this.state;
    const rawText = strip(template.get('body'));

    if (template.get('title').length === 0) return this._createError('Please provide a title for your template!');
    if (rawText.length === 0) return this._createError('Your template can\'t be blank, duh...');
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
    this._createTemplate(rawText);
  }

}