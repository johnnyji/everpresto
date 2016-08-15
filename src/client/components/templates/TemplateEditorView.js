import React, {Component, PropTypes} from 'react';
import flow from 'lodash/flow';
import Immutable from 'immutable';
import striptags from 'striptags';
import CustomPropTypes from '.././CustomPropTypes';
import {removeZeroWidthSpace} from '../.././utils/TextEditorHelper';
import {unshift} from '../.././utils/immutable/ListFunctions';
import {matchesAttr} from '../.././utils/immutable/IterableFunctions';
import {getAttr} from '../.././utils/immutable/MapFunctions';

import Button from '.././ui/Button';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DocumentEditor from '.././shared/DocumentEditor';
import FileToHtmlConverter from '.././shared/FileToHtmlConverter';
import FormSidebar from '.././shared/FormSidebar';
import FormSidebarBody from '.././shared/FormSidebarBody';
import FormSidebarFooter from '.././shared/FormSidebarFooter';
import FormSidebarPlaceholderInput from '.././shared/FormSidebarPlaceholderInput';
import FormSidebarSection from '.././shared/FormSidebarSection';
import pureRender from 'pure-render-decorator';

// This allows us to add any other HTML cleaners directly to the flow of data
const cleanTemplateHTML = flow(removeZeroWidthSpace);
const isSpecific = matchesAttr('type', 'specific');
const isGeneral = matchesAttr('type', 'general');
const isNotRequired = matchesAttr('isRequired', false);
const displayName = 'TemplateEditorView';

@pureRender
export default class TemplateEditorView extends Component {

  static displayName = displayName;

  static propTypes = {
    mode: PropTypes.oneOf(['create', 'edit']).isRequired,
    onSave: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    template: CustomPropTypes.template
  };

  static defaultProps = {
    mode: 'create'
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      setRouteLeaveHook: PropTypes.func.isRequired
    })
  };

  state = {
    importingTemplate: false,
    template: Immutable.fromJS({
      body: '',
      placeholders: [],
      title: ''
    })
  };

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

  componentDidMount () {
    const {route} = this.props;
    const {router} = this.context;
    router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  routerWillLeave = () => confirm('Leave before saving changes?');

  render() {
    const {importingTemplate, template} = this.state;
    const {mode} = this.props;

    return (
      <DashboardContentWrapper className={displayName}>

        <DocumentEditor
          body={template.get('body')}
          className={`${displayName}-editor`}
          isTemplateEditor={true}
          onBodyChange={this._updateTemplateBody}
          onTitleChange={this._updateTemplateTitle}
          templatePlaceholders={template.get('placeholders').map(getAttr('value'))}
          titlePlaceholder='Untitled Template'
          title={template.get('title')} />

        <FormSidebar className={`${displayName}-sidebar`}>
          <FormSidebarBody>
            {/* Placeholder Section */}
            <FormSidebarSection>
              <FileToHtmlConverter
                label={importingTemplate ? 'Importing...' : 'Import Existing Template'}
                onEnd={this._handleTemplateUploadEnd}
                onStart={this._handleTemplateUploadStart} />
            </FormSidebarSection>
            <FormSidebarSection className={`${displayName}-sidebar-placeholders`}>
              <FormSidebarPlaceholderInput
                allPlaceholders={template.get('placeholders')}
                onAddPlaceholder={this._addPlaceholder}
                onRemovePlaceholder={this._handleRemovePlaceholder}
                placeholderInputLabel='ADD_SPECIFIC_PLACEHOLDER'
                placeholders={template.get('placeholders').filter(isSpecific)}
                placeholderType='specific'
                title='Will Be Different For Each Signer' />
              <FormSidebarPlaceholderInput
                allPlaceholders={template.get('placeholders')}
                onAddPlaceholder={this._addPlaceholder}
                onRemovePlaceholder={this._handleRemovePlaceholder}
                placeholderInputLabel='ADD_GENERAL_PLACEHOLDER'
                placeholders={template.get('placeholders').filter(isGeneral)}
                placeholderType='general'
                title='Will Be Same For All Signers' />
            </FormSidebarSection>
          </FormSidebarBody>
          {/* Confirmation Buttons */}
          <FormSidebarFooter>
            <Button
              color='green'
              className={`${displayName}-sidebar-confirm`}
              icon='done'
              onClick={this._handleSave}
              text={mode === 'create' ? 'Create Template!' : 'Save Template'} />
          </FormSidebarFooter>
        </FormSidebar>

      </DashboardContentWrapper>
    );
  }

  /**
   * Adds a new placeholder on the client side
   * @param  {String} value - The placeholder's value
   * @param  {String} type  - What type of a placeholder is is (specific | general)
   */
  _addPlaceholder = (value, type) => {
    this.setState({
      template: this.state.template.update('placeholders', unshift({
        isRequired: false,
        type,
        value
      }))
    });
  }

  _handleSave = () => {
    // Strips away the zero-width spaces
    let template = this.state.template.set('body', cleanTemplateHTML(this.state.template.get('body')));
    // Strips the HTML from the text to give just the raw body
    template = template.set('rawText', striptags(template.get('body')));
    // Removes the required placeholders from the template to avoid duplication, because we'll
    // add them on the in `pre` save hook on the server side
    template = template.update('placeholders', (placeholders) => placeholders.filter(isNotRequired));

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

  _handleRemovePlaceholder = (placeholder) => {
    const {template} = this.state;
    const placeholders = template.get('placeholders');
    const newPlaceholders = placeholders.splice(placeholders.indexOf(placeholder), 1);
    this.setState({
      template: template.set('placeholders', newPlaceholders)
    });
  };

  _updateTemplateBody = (value) => {
    this.setState({
      template: this.state.template.set('body', value)
    });
  };

  _updateTemplateTitle = (value) => {
    this.setState({
      template: this.state.template.set('title', value)
    });
  };

}
