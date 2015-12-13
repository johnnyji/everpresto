// TODO: Use `_.debounce` to make the placeholder finding less expensive?
import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import AppActionCreators from '../.././actions/AppActionCreators';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import List from '.././ui/List';
import ListItem from '.././ui/ListItem';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import ModalCreatePlaceholder from '.././modals/ModalCreatePlaceholder';
import DocumentEditor from '.././shared/DocumentEditor';
import EditorSidebar from '.././shared/EditorSidebar';

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
        title: '',
        body: ''
      })
    };
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
          <Button color='blue' icon='add' onClick={this._showAddPlaceholderModal} text='Add Placeholder' />
          <List>{this._renderPlaceholders()}</List>
          <Button
            color='green'
            icon='done'
            onClick={() => {}}
            text='Create Template!' />
        </EditorSidebar>
      </DashboardContentWrapper>
    );
  }

  _addPlaceholder = (newPlaceholder) => {
    return this.state.template.get('placeholders').push(newPlaceholder);
  }

  _updateTemplateAttribute = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
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
          <Icon icon='arrow-forward' />
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

}