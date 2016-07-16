import React, {Component, PropTypes} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import CustomPropTypes from '../CustomPropTypes';
import ClickableIcon from '../ui/ClickableIcon';
import DocumentNewActionCreators from '../../actions/DocumentNewActionCreators';
import ModalDocumentPreview from '../modals/ModalDocumentPreview';
import {formatDateString} from '../../utils/DateHelper';
import pureRender from 'pure-render-decorator';
import TemplateCard from '../templates/TemplateCard';

const displayName = 'DocumentsNewTemplatePreviewCard';

@pureRender
export default class DocumentsNewTemplatePreviewCard extends Component {
  static displayName = displayName;

  static propTypes = {
    template: CustomPropTypes.template.isRequired
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const {template} = this.props;

    return (
      <TemplateCard
        body={template.get('body')}
        className={displayName}
        onBodyClick={this._handleSelectTemplate}
        onTitleClick={this._handleSelectTemplate}
        title={template.get('title')}>
        <div className={`${displayName}-options`}>
          <ClickableIcon icon='preview' onClick={this._handlePreviewTemplate} />
          <small>{formatDateString(template.get('createdAt'))}</small>
        </div>
      </TemplateCard>
    );
  }

  _handleSelectTemplate = () => {
    this.context.dispatch(
      DocumentNewActionCreators.setTemplate(this.props.template)
    );
  };

  _handlePreviewTemplate = (template) => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalDocumentPreview
          body={template.get('body')}
          title={template.get('title')} />
      )
    );
  };

}
