import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardQuote from '.././dashboard/DashboardQuote';

import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import ClickableIcon from '.././ui/ClickableIcon';
import GridView from '.././ui/GridView';
import SearchBar from '.././ui/SearchBar';

import {formatDateString} from '../.././utils/DateHelper';
import AppActionCreators from '../.././actions/AppActionCreators';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';

const displayName = 'DocumentsNewTemplateSelectView';

export default class DocumentsNewTemplateSelectView extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    onTemplateChoose: PropTypes.func.isRequired,
    onTemplateFilter: PropTypes.func.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  static defaultProps = {
    templates: Immutable.List()
  };

  render() {
    const {onTemplateFilter, templates} = this.props;

    return (
      <DashboardContentWrapper className={displayName}>
        <DashboardContentHeader className={`${displayName}-header`}>
          <header className={`${displayName}-header-title`}>
            Step 1/2: <em className={`${displayName}-header-title-main`}>Choose A Template</em>
          </header>
          <SearchBar
            className={`${displayName}-header-search-bar`}
            focusLabel='I know.'
            label='I love you...'
            onUpdate={onTemplateFilter} />
        </DashboardContentHeader>
          {templates.size > 0 &&
            <GridView>
              {this._renderTemplatePreviewCards()}
            </GridView>
          }
          {!templates.size > 0 &&
            <DashboardQuote
              author="Ol' Ben Kenobi"
              className={`${displayName}-not-found`}
              quote="This is the not the template you're looking for..."/>
          }
      </DashboardContentWrapper>
    );
  }

  _handlePreviewTemplate = (template) => {
    this.context.dispatch(
      AppActionCreators.createModal(
        <ModalDocumentPreview
          body={template.get('body')}
          title={template.get('title')}/>
      )
    );
  }

  _renderTemplatePreviewCards = () => {
    const {onTemplateChoose, templates} = this.props;

    return templates.map((template, i) => (
      <DocumentPreviewCard
        body={template.get('body')}
        className={`${displayName}-preview-card`}
        key={i}
        onBodyClick={() => onTemplateChoose(template)}
        onTitleClick={() => onTemplateChoose(template)}
        title={template.get('title')}>
        <div className={`${displayName}-preview-card-options`}>
          <ClickableIcon icon='preview' onClick={() => this._handlePreviewTemplate(template)}/>
          <small>{formatDateString(template.get('createdAt'))}</small>
        </div>
      </DocumentPreviewCard>
    ));
  }

}