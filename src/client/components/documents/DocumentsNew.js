import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import ModalDocumentPreview from '.././modals/ModalDocumentPreview';
import DashboardContentHeader from '.././dashboard/DashboardContentHeader';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import DocumentViewer from '.././shared/DocumentViewer';
import FormSidebar from '.././shared/FormSidebar';
import Card from '.././ui/Card';
import ClickableIcon from '.././ui/ClickableIcon';
import GridView from '.././ui/GridView';
import SearchBar from '.././ui/SearchBar';

import {formatDateString} from '../.././utils/DateHelper';
import AppActionCreators from '../.././actions/AppActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'DocumentsNew';

@connect((state) => ({
  modalIsDisplayed: state.app.getIn(['modal', 'display']),
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templates: state.templates.get('templates')
}))
export default class DocumentsNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    modalIsDisplayed: PropTypes.bool.isRequired,
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    const {shouldFetchTemplates, template} = this.props;

    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    this.setState({filteredTemplates: this.props.templates});
  }

  componentWillUpdate(nextProps, nextState) {
    // If the filter terms are different, we want to reset the filtered templates
    // by the filter terms
    if (
      nextState.templateFilterTerms !== this.state.templateFilterTerms ||
      !nextProps.templates.equals(this.props.templates)
    ) {
      this.setState({
        filteredTemplates: nextProps.templates.filter((template) => {
          return template.get('title').toLowerCase().indexOf(
            nextState.templateFilterTerms.trim().toLowerCase()
          ) > -1;
        })
      });
    }
  }

  componentWillUnmount() {
    if (this.props.modalIsDisplayed) this.context.dispatch(AppActionCreators.dismissModal());
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredTemplates: Immutable.List(),
      templateBeingUsed: null,
      templateFilterTerms: ''
    };
  }

  render() {
    if (this.props.shouldFetchTemplates) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper className={displayName}>
        {this._renderDocumentPreview()}
      </DashboardContentWrapper>
    );
  }

  _handleChooseTemplate = (template) => {
    this.setState({templateBeingUsed: template});
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

  _handleTemplateSearch = (searchTerms) => {
    this.setState({templateFilterTerms: searchTerms});
  }

  _renderDocumentPreview = () => {
    const {templateBeingUsed} = this.state;

    if (Boolean(templateBeingUsed)) {
      return (
        <div>
          <DocumentViewer body={templateBeingUsed.get('body')}/>
          <FormSidebar className={`${displayName}-config`}>
            something
          </FormSidebar>
        </div>
      );
    }

    return (
      <div className={`${displayName}-template-selector`}>
        <DashboardContentHeader className={`${displayName}-template-selector-header`}>
          <span className={`${displayName}-template-selector-header-title`}>Choose A Template</span>
          <SearchBar
            className={`${displayName}-template-selector-header-search-bar`}
            onUpdate={this._handleTemplateSearch} />
        </DashboardContentHeader>
        <GridView>{this._renderTemplatePreviewCards()}</GridView>
      </div>
    );
  }

  _renderTemplatePreviewCards = () => {
    return this.state.filteredTemplates.map((template, i) => (
      <DocumentPreviewCard
        body={template.get('body')}
        className={`${displayName}-template-selector-preview-card`}
        key={i}
        onBodyClick={() => this._handleChooseTemplate(template)}
        onTitleClick={() => this._handleChooseTemplate(template)}
        title={template.get('title')}>
        <div className={`${displayName}-template-selector-preview-card-options`}>
          <ClickableIcon icon='preview' onClick={() => this._handlePreviewTemplate(template)}/>
          <small>{formatDateString(template.get('createdAt'))}</small>
        </div>
      </DocumentPreviewCard>
    ));
  }

}