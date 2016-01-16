import React, {Component, PropTypes} from 'react';
import uuid from 'node-uuid';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import striptags from 'striptags';
import CustomPropTypes from '.././CustomPropTypes';
import {minLength, noLowerCase} from '../.././utils/RegexHelper';
import {removeCaretPositionMarker, removeZeroWidthSpace} from '../.././utils/TextEditorHelper';

import Button from '.././ui/Button';
import Clickable from '.././ui/Clickable';
import Icon from '.././ui/Icon';
import Input from '.././ui/Input';
import List from '.././ui/List';
import ListItem from '.././ui/ListItem';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import ModalConfirm from '.././modals/ModalConfirm';
import DocumentEditor from '.././shared/DocumentEditor';
import FileConverter from '.././shared/FileConverter';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarSection from '.././shared/FormSidebarSection';

import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
  
const ENTER_KEY = 13;
const displayName = 'TemplateEditorView';

export default class TemplateEditorView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    mode: PropTypes.oneOf(['create', 'edit']).isRequired,
    onSave: PropTypes.func.isRequired,
    template: CustomPropTypes.template
  };

  static defaultProps = {
    mode: 'create'
  };

  // unsavedPlaceholders: {
  //   id: '412o4u104u13401240912302013'
  //   values: {
  //     label: '',
  //     value: ''
  //   },
  //   errors: {
  //     label: null,
  //     value: null
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      importingTemplate: false,
      template: Immutable.fromJS({
        body: '',
        placeholders: [],
        title: ''
      }),
      unsavedPlaceholders: Immutable.List()
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
    const {template, unsavedPlaceholders} = this.state;
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
          <FormSidebarBody>
            <FormSidebarSection>
              <FileConverter
                label='Import Existing Template'
                onEnd={this._handleTemplateUploadEnd}
                onStart={this._handleTemplateUploadStart} />
            </FormSidebarSection>
            <FormSidebarSection>
              <List className={`${displayName}-sidebar-placeholders`}>
                <div className={`${displayName}-sidebar-placeholders-new`}>
                  <Clickable
                    className={`${displayName}-sidebar-placeholders-new-button`}
                    onClick={this._handleNewPlaceholder}>
                    <Icon icon='add' /> Add Placeholder
                  </Clickable>
                </div>
                {this._renderUnsavedPlaceholders()}
                {this._renderPlaceholders()}
              </List>
            </FormSidebarSection>
          </FormSidebarBody>
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
    return this.state.template.get('placeholders').unshift(newPlaceholder);
  };

  _handleNewPlaceholder = () => {
    // Adds a blank placeholder to the list
    this.setState({
      unsavedPlaceholders: this.state.unsavedPlaceholders.push(Immutable.fromJS({
        // The unique ID is so that when we're updating the placeholder as the user is typing, we know which one
        // we're referencing if there are multiple blank unsaved placeholders
        id: uuid.v4(),
        values: {
          value: ''
        },
        errors: {
          value: null
        }
      }))
    });
  };

  _handleSave = () => {
    let {template} = this.state;

    // Strips away the zero-width spaces and the caret markers in the text
    template = this.state.template.set('body', removeCaretPositionMarker(removeZeroWidthSpace(template.get('body'))));
    // Strips the HTML from the text to give just the raw body
    template = template.set('rawText', striptags(template.get('body')));

    this.props.onSave(template);
  };

  _handleTemplateUploadEnd = (body) => {
    this.setState({
      importingTemplate: false,
      template: this.state.template.merge({body})
    });
  };

  _handleTemplateUploadStart = () => {
    this.setState({importingTemplate: true});
  };

  _removePlaceholder = (placeholder) => {
    const placeholderState = this.state.template.get('placeholders');
    return placeholderState.splice(placeholderState.indexOf(placeholder), 1);
  };

  _removeUnsavedPlaceholder = (placeholder) => {
    const {unsavedPlaceholders} = this.state;
    const indexInUnsavedPlaceholders = unsavedPlaceholders.findIndex((p) => p.get('id') === placeholder.get('id'));
    this.setState({
      unsavedPlaceholders: unsavedPlaceholders.delete(indexInUnsavedPlaceholders)
    });
  };

  _renderUnsavedPlaceholders = () => {
    return this.state.unsavedPlaceholders.map((placeholder, i) => (
      <ListItem
        className={`${displayName}-sidebar-placeholders-placeholder`}
        key={i}
        onRemove={() => this._removeUnsavedPlaceholder(placeholder)}
        removable={true}>
        <Input
          autoFocus={true}
          className={`${displayName}-sidebar-placeholders-placeholder-input`}
          defaultValue={placeholder.getIn(['values', 'value'])}
          error={placeholder.getIn(['errors', 'value'])}
          errorKeys='errors:value'
          label='ex. YOUR_PLACEHOLDER_HERE'
          liveError={true}
          onEnterKeyPress={(value) => this._saveUnsavedPlaceholder(placeholder)}
          onUpdate={(value, err, valObj, errObj, e) => this._updateUnsavedPlaceholder(placeholder, value, err, e)}
          patternMatches={[
            minLength(1, 'Your placeholder can\'t be empty!'),
            noLowerCase('Sorry, no lower case chars allowed!')
          ]}
          ref='value'
          successKeys='values:value'/>
      </ListItem>
    ));
  };

  _renderPlaceholders = () => {
    return this.state.template.get('placeholders').map((placeholder, i) => (
      <ListItem
        className={`${displayName}-sidebar-placeholders-placeholder`}
        key={i}
        onRemove={() => this._updateTemplateAttr('placeholders', this._removePlaceholder(placeholder))}
        removable={true}>
        <mark>{placeholder.get('value')}</mark>
      </ListItem>
    ));
  };

  _saveUnsavedPlaceholder = (placeholder) => {
    // If this unsaved placeholder has an error, we don't save it
    const firstFoundError = placeholder.get('errors').find((v, k) => !this.refs[k].valid());
    if (firstFoundError !== undefined) return;

    const {template, unsavedPlaceholders} = this.state;
    const value = placeholder.getIn(['values', 'value']);
    const indexInUnsavedPlaceholders = unsavedPlaceholders.findIndex((p) => p.get('id') === placeholder.get('id'));
    const alreadyExistingPlaceholderValues = template.get('placeholders').find((p) => p.get('value') === value);
    // If the placeholder is already taken, set the error on this placeholder
    if (alreadyExistingPlaceholderValues) {
      return this.setState({
        unsavedPlaceholders: unsavedPlaceholders.splice(indexInUnsavedPlaceholders, 1,
          placeholder.setIn(['errors', 'value'], 'This placeholder is already being used!')
        )
      });
    }
    // If the placeholder is correct, we remove it from the list of unsaved placeholders and add it
    // as a placeholder on the template
    this.setState({
      template: template.set('placeholders', this._addPlaceholder(Immutable.fromJS({
        label: '',
        value
      }))),
      unsavedPlaceholders: unsavedPlaceholders.delete(indexInUnsavedPlaceholders)
    });
  };

  _updateTemplateAttr = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  };

  _updateUnsavedPlaceholder = (placeholder, value, error, e) => {
    // If the enter key is hit, we don't want to update, instead we want to ignore
    // because the placeholder will be sumitted instead in `this._saveUnsavedPlaceholder`
    if (e.which === ENTER_KEY) return;

    const {unsavedPlaceholders} = this.state;
    const indexInUnsavedPlaceholders = unsavedPlaceholders.findIndex((p) => p.get('id') === placeholder.get('id'));
    let newPlaceholder = placeholder.setIn(['values', 'value'], value);
    newPlaceholder = newPlaceholder.setIn(['errors', 'value'], error);

    this.setState({
      unsavedPlaceholders: unsavedPlaceholders.splice(indexInUnsavedPlaceholders, 1, newPlaceholder)
    })
  };

}