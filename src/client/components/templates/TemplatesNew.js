// TODO: Use `_.debounce` to make the placeholder finding less expensive?
import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import mammoth from 'mammoth';
import AppActionCreators from '../.././actions/AppActionCreators';

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

const displayName = 'TemplatesNew';

export default class TemplatesNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      template: Immutable.fromJS({
        placeholders: [],
        title: 'd',
        htmlText: 'd',
        rawText: 'd'
      }),
      importingTemplate: false
    };
  }

  render() {
    const {template} = this.state;
    const placeholderValues = template.get('placeholders').map((placeholder) => placeholder.get('value'));

    return (
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('htmlText')}
          isTemplateEditor={true}
          onBodyChange={this._handleBodyChange}
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

  _createTemplate = () => {
    this.context.dispatch(
      TemplateActionCreators.createTemplate(this.state.template)
    );
  }

  _handleBodyChange = (htmlText, rawText) => {
    this.setState({
      template: this.state.template.merge({htmlText, rawText})
    });
  }

  _handleTemplateUploadEnd = (htmlText, rawText) => {
    this.setState({
      importingTemplate: false,
      template: this.state.template.merge({htmlText, rawText})
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
    debugger;
    if (template.get('title').length === 0) return this._createError('Please provide a title for your template!');
    if (template.get('rawText').length === 0) return this._createError('Your template can\'t be blank, duh...');
    if (template.get('placeholders').size === 0) {
      this.context.dispatch(
        AppActionCreators.createModal(
          <ModalConfirm
            confirmText='Yes, go ahead!'
            onConfirm={this._createTemplate}>
            It looks like you have no placeholders. Are you sure you want to create a template 
            widthout placeholders? - kinda defeats the purpose of a template... Just sayin'
          </ModalConfirm>
        )
      );
    }
  }

}