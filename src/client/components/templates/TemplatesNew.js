import React, {Component, PropTypes} from 'react';
import _ from 'lodash' // TODO: Use `_.debounce` to make the placeholder finding less expensive?
import Immutable from 'immutable';
import replaceWordWithHtml from '../.././utils/replaceWordWithHtml';
import AppActionCreators from '../.././actions/AppActionCreators';

import Button from '.././ui/Button';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
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
      template: Immutable.fromJS({
        placeholders: ['no'],
        title: '',
        body: `beer art party church-key fap trust fund, dreamcatcher tofu chillwave jean shorts chartreuse thundercats offal migas vice +1. Bitters poutine typewriter, drinking vinegar forage readymade photo booth food truck twee butcher post-ironic salvia ethical umami. Meggings waistcoat roof party helvetica vegan, mlkshk messenger bag seitan tacos hammock craft beers marfa bicycle rights health goth. Poutine post-ironic literally freegan, organic kitsch banh mi thundercats next level iPhone you probably haven't heard of them. Forage humblebrag helvetica, gluten-free mustache mumblecore tote bag venmo sustainable beerer pinterest kickstarter listicle selvage you probably haven't heard of them retro. Crucifix celiac XOXO, chartreuse shoreditch hoodie single-origin coffee. BEER Knausgaard pitchfork brunch 3 wolf moon.`
      })
    };
  }

  componentDidMount() {
    const result = replaceWordWithHtml(this.state.template.get('body'), 'beer', PLACEHOLDER_TAG, PLACEHOLDER_CLASS);
    this._updateTemplateAttribute('body', result);
  }

  render() {
    const {template} = this.state;

    return (
      <DashboardContentWrapper className={displayName}>
        <DocumentEditor
          body={template.get('body')}
          isTemplateEditor={true}
          onBodyChange={this._handleBodyChange}
          onHighlight={this._handleHighlight}
          onTitleChange={(value) => this._updateTemplateAttribute('title', value)}
          titlePlaceholder="Untitled Template"
          title={template.get('title')}/>
        <EditorSidebar>
          <Button color="green" icon="create" onClick={this._showAddPlaceholderModal} text="Add Placeholder" />
        </EditorSidebar>
      </DashboardContentWrapper>
    );
  }

  _updateTemplateAttribute = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  }

  _handleBodyChange = (value) => {
    const body = this._highlightPlaceholderText(value);

    this._updateTemplateAttribute('body', body);
  }

  _handleHighlight = (text) => {
    console.log(text);
  }

  _highlightPlaceholderText = (text) => {
    this.state.template
      .get('placeholders')
      .reduce((...args) => replaceWordWithHtml(...args, PLACEHOLDER_TAG, PLACEHOLDER_CLASS), text);
    debugger;
  }

  _showAddPlaceholderModal = () => {
    this.context.dispatch(
      AppActionCreators.createModal(
        'hello'
      )
    );
  }

}
