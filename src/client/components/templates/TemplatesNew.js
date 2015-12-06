import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';

import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DocumentEditor from '.././shared/DocumentEditor';

const displayName = 'TemplatesNew';

export default class TemplatesNew extends Component {

  static displayName = displayName;

  constructor(props) {
    super(props);
    this.state = {
      template: Immutable.fromJS({
        title: '',
        body: ''
      })
    };
  }

  render() {
    const {template} = this.state;

    return (
      <DashboardContentWrapper>
        <DocumentEditor
          body={template.get('body')}
          isTemplateEditor={true}
          onBodyChange={(value) => this._updateTemplateAttribute('body', value)}
          onHighlight={this._handleHighlight}
          onTitleChange={(value) => this._updateTemplateAttribute('title', value)}
          titlePlaceholder="Untitled Template"
          title={template.get('title')}/>
      </DashboardContentWrapper>
    );
  }

  _updateTemplateAttribute = (attr, value) => {
    this.setState({
      template: this.state.template.set(attr, value)
    });
  }

  _handleHighlight = (text) => {
    console.log(text);
  }

}
