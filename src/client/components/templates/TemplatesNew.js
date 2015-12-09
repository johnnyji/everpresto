import React, {Component, PropTypes} from 'react';
import _ from 'lodash' // TODO: Use `_.debounce` to make the placeholder finding less expensive?
import Immutable from 'immutable';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';
import AppActionCreators from '../.././actions/AppActionCreators';

import Button from '.././ui/Button';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import ModalCreatePlaceholder from '.././modals/ModalCreatePlaceholder';
import RichTextEditor from '.././shared/RichTextEditor';
import DocumentEditor from '.././shared/DocumentEditor';
import EditorSidebar from '.././shared/EditorSidebar';

const PLACEHOLDER_TAG = 'mark';
const PLACEHOLDER_CLASS = 'template-placeholder';

const displayName = 'TemplatesNew';

export default class TemplatesNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      saved: true,
      template: Immutable.fromJS({
        placeholders: ['beer'],
        title: '',
        body: `<mark class="template-placeholder">beer</mark> art party church-key fap trust fund, dreamcatcher tofu chillwave jean shorts chartreuse thundercats offal migas&nbsp;<div><br></div><div>beer vice +1. Bitters poutine typewriter, drinking vinegar forage readymade photo booth food truck twee butcher post-ironic salvia ethical umami.</div>`
      })
    };
  }

  componentWillUpdate(nextProps, nextState) {

    const {template} = nextState;
    const nextPlaceholders = template.get('placeholders');

    // If the placeholders have changed, we want to rehighlight the text to reflect that change.
    if (!nextPlaceholders.equals(this.state.template.get('placeholders'))) {
      this._updateTemplateAttribute(
        'body',
        this._highlightPlaceholderText(template.get('body'), nextPlaceholders)
      );
    }
  }

  render() {
    const {saved, template} = this.state;

    return (
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('body')}
          isTemplateEditor={true}
          onBodyChange={(value) => this._updateTemplateAttribute('body', value)}
          onTitleChange={(value) => this._updateTemplateAttribute('title', value)}
          templatePlaceholders={template.get('placeholders')}
          titlePlaceholder="Untitled Template"
          title={template.get('title')}/>
        <EditorSidebar>
          <Button color='blue' icon='add' onClick={this._showAddPlaceholderModal} text='Add Placeholder' />
          <Button
            color='green'
            disabled={saved}
            icon={saved ? 'done' : 'create'}
            onClick={this._handleSave}
            text={saved ? 'Saved' : 'Save'} />
        </EditorSidebar>
      </DashboardContentWrapper>
    );
  }

  _updateTemplateAttribute = (attr, value) => {
    this.setState({
      saved: false,
      template: this.state.template.set(attr, value)
    });
  }

  _handleBodyChange = (text) => {
    const body = this._highlightPlaceholderText(text);

    this._updateTemplateAttribute('body', body);
  }

  _handleSave = () => {
    // TODO: Api call to save template
    // TODO: Get the saved state as a prop from the store instead...
    this.setState({
      saved: true
    });
  }

  _highlightPlaceholderText = (text, placeholders = this.state.template.get('placeholders')) => {
    return placeholders.reduce((alteredText, placeholder) => {
      return replaceWordWithHtml(alteredText, placeholder, PLACEHOLDER_TAG, PLACEHOLDER_CLASS);
    }, text);
  }

  _showAddPlaceholderModal = () => {
    this.context.dispatch(AppActionCreators.createModal(<ModalCreatePlaceholder />));
  }

}
