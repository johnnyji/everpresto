import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import striptags from 'striptags';
import CustomPropTypes from '.././CustomPropTypes';
import TextEditorHelper from '../.././utils/TextEditorHelper';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import List from '.././ui/List';
import ListItem from '.././ui/ListItem';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import ModalCreatePlaceholder from '.././modals/ModalCreatePlaceholder';
import ModalConfirm from '.././modals/ModalConfirm';
import DocumentEditor from '.././shared/DocumentEditor';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarTitle from '.././shared/FormSidebarTitle';
import FileConverter from '.././shared/FileConverter';

import AppActionCreators from '../.././actions/AppActionCreators';

const {removeCaretPositionMarker, removeZeroWidthSpace} = TextEditorHelper;
const displayName = 'TemplateEditorView';

export default class TemplateEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    mode: PropTypes.oneOf(['create', 'edit']).isRequired,
    onSave: PropTypes.func.isRequired,
    template: PropTypes.oneOfType([
      CustomPropTypes.template,
      ImmutablePropTypes.contains({
        body: PropTypes.string.isRequired,
        placeholders: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired
      })
    ]).isRequired
  };

  static defaultProps = {
    mode: 'create'
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

  componentWillMount() {
    const {template} = this.props;

    if (template) {
      this.setState({
        template: Immutable.fromJS({
          body: template.get('body'),
          placeholders: template.get('placeholders'),
          title: template.get('title')
        })
      });
    }
  }

  render() {
    const {template} = this.state;
    const {mode} = this.props;
    const placeholderValues = template.get('placeholders').map((placeholder) => placeholder.get('value'));

    return (
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('body')}
          className={`${displayName}-editor`}
          isTemplateEditor={true}
          onBodyChange={(value) => this._updateTemplateAttr('body', value)}
          onTitleChange={(value) => this._updateTemplateAttr('title', value)}
          templatePlaceholders={placeholderValues}
          titlePlaceholder='Untitled Template'
          title={template.get('title')}/>
        <FormSidebar className={`${displayName}-sidebar`}> 
          <FormSidebarTitle title='Create Template'/>
          <FileConverter onEnd={this._handleTemplateUploadEnd} onStart={this._handleTemplateUploadStart} />
          <Button color='blue' icon='add' onClick={this._showAddPlaceholderModal} text='Add Placeholder' />
          <List>{this._renderPlaceholders()}</List>
          <Button
            color='green'
            icon='done'
            onClick={this._handleSave}
            text={mode === 'create' ? 'Create Template!' : 'Save Template'}/>
        </FormSidebar>
      </DashboardContentWrapper>
    );
  }

  _addPlaceholder = (newPlaceholder) => {
    return this.state.template.get('placeholders').push(newPlaceholder);
  }

  _handleSave = () => {
    let {template} = this.state;

    // Strips away the zero-width spaces and the caret markers in the text
    template = this.state.template.set('body', removeCaretPositionMarker(removeZeroWidthSpace(template.get('body'))));
    // Strips the HTML from the text to give just the raw body
    template = template.set('rawText', striptags(template.get('body')));

    this.props.onSave(template);
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
          onRemove={() => this._updateTemplateAttr('placeholders', this._removePlaceholder(placeholder))}
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
          onCreate={(placeholder) => this._updateTemplateAttr('placeholders', this._addPlaceholder(placeholder))}
          placeholders={this.state.template.get('placeholders')}/>
      )
    );
  }

  _updateTemplateAttr = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  }

}