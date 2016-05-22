import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentsNewEditorView from './DocumentsNewEditorView';
import DocumentsNewChooseTemplateView from './DocumentsNewChooseTemplateView';

import AppActionCreators from '../.././actions/AppActionCreators';
import DocumentNewActionCreators from '../.././actions/DocumentNewActionCreators';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'DocumentsNew';

@connect((state) => ({
  docBeingCreated: state.documentsNew.get('doc'),
  emailsSentCount: state.documentsNew.get('emailsSentCount'),
  generalPlaceholderForm: state.documentsNew.get('generalPlaceholderForm'),
  modalIsDisplayed: state.app.getIn(['modal', 'display']),
  saved: state.documentsNew.get('saved'),
  savedSigner: state.documentsNew.get('savedSigner'),
  saving: state.documentsNew.get('saving'),
  savingSigner: state.documentsNew.get('savingSigner'),
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  specificPlaceholderForm: state.documentsNew.get('specificPlaceholderForm'),
  templates: state.templates.get('templates')
}))
export default class DocumentsNew extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    // TODO: Create actual proptype for `docBeingCreated`
    docBeingCreated: ImmutablePropTypes.map.isRequired,
    emailsSentCount: PropTypes.number.isRequired,
    modalIsDisplayed: PropTypes.bool.isRequired,
    generalPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    params: PropTypes.shape({
      collection_id: PropTypes.string
    }).isRequired,
    saved: PropTypes.bool.isRequired,
    savedSigner: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    savingSigner: PropTypes.bool.isRequired,
    shouldFetchTemplates: PropTypes.bool.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    const {shouldFetchTemplates, templates} = this.props;

    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
    this.setState({filteredTemplates: templates});
  }

  componentDidMount() {
    // Sets the new document's collection id
    this.context.dispatch(
      DocumentNewActionCreators.setCollection(this.props.params.collection_id)
    );
  }

  componentWillUpdate(nextProps, nextState) {
    // If the filter terms are different, we want to reset the filtered templates
    // by the filter terms
    if (
      nextState.templateFilterTerms !== this.state.templateFilterTerms ||
      !nextProps.templates.equals(this.props.templates)
    ) {
      this.setState({
        filteredTemplates: nextProps.templates.filter((template) => (
          template.get('title').toLowerCase().indexOf(nextState.templateFilterTerms.trim().toLowerCase()) > -1
        ))
      });
    }

    // If new docs were just created, we want to navigate to the correct collection view with those docs
    if (this.props.saving && nextProps.saved) {
      this.context.router.push(`/dashboard/collections/${this.props.params.collection_id}`);
    }

  }

  componentWillUnmount() {
    const {dispatch} = this.context;

    // Clears the new document state when the user decides to leave
    dispatch(DocumentNewActionCreators.resetState());
    // Removes any existing modals
    if (this.props.modalIsDisplayed) dispatch(AppActionCreators.dismissModal());
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

    // If a template has yet to be chosen, show the template selector view
    if (!this.props.docBeingCreated.get('template')) {
      return (
        <DocumentsNewChooseTemplateView
          onTemplateChoose={this._handleTemplateChoose}
          onTemplateFilter={this._handleTemplateFilter}
          templates={this.state.filteredTemplates} />
      );
    }

    // Show the document editing view
    return (
      <DocumentsNewEditorView
        doc={this.props.docBeingCreated}
        emailsSentCount={this.props.emailsSentCount}
        generalPlaceholderForm={this.props.generalPlaceholderForm}
        saved={this.props.saved}
        savedSigner={this.props.savedSigner}
        saving={this.props.saving}
        savingSigner={this.props.savingSigner}
        specificPlaceholderForm={this.props.specificPlaceholderForm} />
    );
  }

  _handleTemplateChoose = (template) => {
    this.context.dispatch(DocumentNewActionCreators.setTemplate(template));
  };

  _handleTemplateFilter = (templateFilterTerms) => {
    this.setState({templateFilterTerms});
  };

}
