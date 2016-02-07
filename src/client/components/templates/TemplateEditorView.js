import React, {Component, PropTypes} from 'react';
import flow from 'lodash/flow';
import Immutable from 'immutable';
import striptags from 'striptags';
import CustomPropTypes from '.././CustomPropTypes';
import {removeZeroWidthSpace} from '../.././utils/TextEditorHelper';
import {unshift} from '../.././utils/immutable/ListFunctions';
import {getAttr} from '../.././utils/immutable/MapFunctions';

import Button from '.././ui/Button';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DocumentEditor from '.././shared/DocumentEditor';
import FileToHtmlConverter from '.././shared/FileToHtmlConverter';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarPlaceholderInput from '.././shared/FormSidebarPlaceholderInput';
import FormSidebarSection from '.././shared/FormSidebarSection';

// This allows us to add any other HTML cleaners directly to the flow of data
// ie. flow(removeZeroWidthSpace, removeSpans, removeHiddenMarkers) etc...
const cleanTemplateHTML = flow(removeZeroWidthSpace);
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

  constructor(props) {
    super(props);
    this.state = {
      importingTemplate: false,
      template: Immutable.fromJS({
        body: '',
        placeholders: [],
        title: ''
      })
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
    const {importingTemplate, template} = this.state;
    const {mode} = this.props;

    return (
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('body')}
          className={`${displayName}-editor`}
          isTemplateEditor={true}
          onBodyChange={(value) => this._updateTemplateAttr('body', value)}
          onTitleChange={(value) => this._updateTemplateAttr('title', value)}
          templatePlaceholders={template.get('placeholders').map(getAttr('value'))}
          titlePlaceholder='Untitled Template'
          title={template.get('title')}/>
        <FormSidebar className={`${displayName}-sidebar`}>
          <FormSidebarBody>
            <FormSidebarSection>
              <FileToHtmlConverter
                label={importingTemplate ? 'Importing...' : 'Import Existing Template'}
                onEnd={this._handleTemplateUploadEnd}
                onStart={this._handleTemplateUploadStart} />
            </FormSidebarSection>
            <FormSidebarSection className={`${displayName}-sidebar-placeholders`}>
              <FormSidebarPlaceholderInput
                onAddPlaceholder={this._addPlaceholder}
                onRemovePlaceholder={(p) => this._updateTemplateAttr('placeholders', this._removePlaceholder(p))}
                placeholders={template.get('placeholders')}/>
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

  _addPlaceholder = (value) => {
    this.setState({
      template: this.state.template.update('placeholders', unshift({value}))
    });
  }

  _handleSave = () => {
    // Strips away the zero-width spaces
    let template = this.state.template.set('body', cleanTemplateHTML(this.state.template.get('body')));
    // Strips the HTML from the text to give just the raw body
    template = template.set('rawText', striptags(template.get('body')));

    this.props.onSave(template);
  };

  _handleTemplateUploadEnd = (body) => {
    this.setState({
      importingTemplate: false,
      template: this.state.template.set('body', body)
    });
  };

  _handleTemplateUploadStart = () => {
    this.setState({importingTemplate: true});
  };

  _removePlaceholder = (placeholder) => {
    const placeholderState = this.state.template.get('placeholders');
    return placeholderState.splice(placeholderState.indexOf(placeholder), 1);
  };

  _updateTemplateAttr = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  };

}