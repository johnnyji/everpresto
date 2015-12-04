import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';

import Button from '.././ui/Button';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardMessage from '.././dashboard/DashboardMessage';

const displayName = 'DocumentCollectionsView';

export default class DocumentCollectionsView extends Component {

  static displayName = displayName;

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    templates: Immutable.List()
  };

  render() {
    return (
      <DashboardContentWrapper className={displayName}>
        {this._renderContent()}
      </DashboardContentWrapper>
    );
  }

  _renderContent = () => {
    const {children, templates} = this.props;

    if (templates.size === 0) {
      return (
        <DashboardMessage className={`${displayName}-create-template`}>
          <span className={`${displayName}-create-template-message`}>
            Looks like you don't have any templates yet. Create one first so you can start sending documents for people to sign!
          </span>
          <Button
            className={`${displayName}-create-template-button`}
            color='yellow'
            onClick={this._navigateNewTemplateView}
            text='Create a Template!' />
        </DashboardMessage>
      );
    } else {
      // If templates are present, we render the actual children of DocumentCollectionsView
      return children;
    }
  }

  _navigateNewTemplateView = () => {
    this.context.history.pushState(null, '/dashboard/templates/new');
  }

}
