import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import StateUpdater from '.././utils/StateUpdater';

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
    return (
      <DashboardContentWrapper>
        <DocumentEditor
          onTitleChange={(title) => this._updateTemplateState(this._setTemplateOption('title', title))}
          onBodyChange={(body) => this._updateTemplateState(this._setTemplateOption('body', body))}
          titlePlaceholder="Untitled Template"/>
      </DashboardContentWrapper>
    );
  }

  _setTemplateOption = () => {
    return StateUpdater.setStateOptionImmutable(this.state.template);
  }

  _updateTemplateState = () => {
    return StateUpdater.updateStateImmutable(this.state.template);
  }

}
