import React, {PropTypes, PureComponent} from 'react';
import Button from 'ui-components/src/Button';
import {convertToContentState} from 'ui-components/src/RichTextEditor';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import DashboardContentWrapper from '../../../components/dashboard/DashboardContentWrapper';
import FileToHtmlConverter from '../../../components/shared/FileToHtmlConverter';
import FormSidebar from '../../../components/shared/FormSidebar';
import FormSidebarBody from '../../../components/shared/FormSidebarBody';
import FormSidebarFooter from '../../../components/shared/FormSidebarFooter';
import FormSidebarPlaceholderInput from '../../../components/shared/FormSidebarPlaceholderInput';
import FormSidebarSection from '../../../components/shared/FormSidebarSection';
import {fromJS} from 'immutable';
import HighlightEditor from '../../../components/shared/HighlightEditor';

// This allows us to add any other HTML cleaners directly to the flow of data
const displayName = 'TemplateEditorView';

export default class TemplateEditorView extends PureComponent {

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
    template: fromJS({
      body: '',
      placeholders: [],
      title: ''
    })
  };

  componentWillMount() {
    const {template} = this.props;

    if (template) {
      this.setState({
        template: fromJS({
          body: template.get('body'),
          placeholders: template.get('placeholders'),
          title: template.get('title')
        })
      });
    }
  }

  componentDidMount () {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  render() {
    const {importingTemplate, template} = this.state;
    const {mode} = this.props;
    const placeholderVals = template.get('placeholders').map((placeholder) => placeholder.get('value'));
    const specificPlaceholders = template.get('placeholders').filter((p) => p.get('type') === 'specific');
    const generalPlaceholders = template.get('placeholders').filter((p) => p.get('type') === 'general');

    return (
      <DashboardContentWrapper className={displayName}>

        <HighlightEditor
          className={`${displayName}-editor`}
          onUpdate={this._handleTemplateUpdate}
          placeholders={placeholderVals} />

        {/* <DocumentEditor
          body={template.get('body')}
          className={`${displayName}-editor`}
          isTemplateEditor={true}
          onBodyChange={this._updateTemplateBody}
          onTitleChange={this._updateTemplateTitle}
          templatePlaceholders={template.get('placeholders').map(getAttr('value'))}
          titlePlaceholder='Untitled Template'
          title={template.get('title')} /> */}

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
                placeholders={specificPlaceholders}
                placeholderType='specific'
                title='Will Be Different For Each Signer' />
              <FormSidebarPlaceholderInput
                allPlaceholders={template.get('placeholders')}
                onAddPlaceholder={this._addPlaceholder}
                onRemovePlaceholder={this._handleRemovePlaceholder}
                placeholderInputLabel='ADD_GENERAL_PLACEHOLDER'
                placeholders={generalPlaceholders}
                placeholderType='general'
                title='Will Be Same For All Signers' />
            </FormSidebarSection>
          </FormSidebarBody>
          {/* Confirmation Buttons */}
          <FormSidebarFooter>
            <Button
              className={`${displayName}-sidebar-confirm`}
              isPill={true}
              onClick={this._handleSave}
              text={mode === 'create' ? 'Create Template!' : 'Save Template'} />
          </FormSidebarFooter>
        </FormSidebar>

      </DashboardContentWrapper>
    );
  }

  routerWillLeave = () => {
    return 'Leave before saving changes?';
  }

  _addPlaceholder = (value, type) => {
    this.setState({
      template: this.state.template.update('placeholders', (placeholders) => placeholders.unshift({
        isRequired: false,
        type,
        value
      }))
    });
  }

  _handleSave = () => {
    // Removes the required placeholders from the template to avoid duplication, because we'll
    // add them on the in `pre` save hook on the server side
    const template = this.state.template.update('placeholders', (placeholders) => {
      return placeholders.filter((placeholder) => !placeholder.get('isRequired'));
    });
    this.props.onSave(template);
  };

  _handleTemplateUpdate = (content) => {
    this.setState({template: this.state.template.set('body', content)});
  };

  _handleTemplateUploadEnd = (html) => {
    this.setState({
      importingTemplate: false,
      template: this.state.template.set('body', convertToContentState(html))
    });
  };

  _handleTemplateUploadStart = () => {
    this.setState({importingTemplate: true});
  };

  _handleRemovePlaceholder = (placeholder) => {
    const {template} = this.state;
    const placeholders = template.get('placeholders');
    // `splice` is okay here because of Immutable.js
    const newPlaceholders = placeholders.splice(placeholders.indexOf(placeholder), 1);
    this.setState({template: template.set('placeholders', newPlaceholders)});
  };

  // _updateTemplateBody = (value) => {
  //   this.setState({
  //     template: this.state.template.set('body', value)
  //   });
  // };

  // _updateTemplateTitle = (value) => {
  //   this.setState({
  //     template: this.state.template.set('title', value)
  //   });
  // };

}
