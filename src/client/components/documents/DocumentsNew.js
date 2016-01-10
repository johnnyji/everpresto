import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';

import DashboardSpinner from '.././shared/DashboardSpinner';
import DocumentsNewEditorView from './DocumentsNewEditorView';
import DocumentsNewTemplateSelectView from './DocumentsNewTemplateSelectView';

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
        filteredTemplates: nextProps.templates.filter((template) => (
          template.get('title').toLowerCase().indexOf(nextState.templateFilterTerms.trim().toLowerCase()) > -1
        ))
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

    const {filteredTemplates, templateBeingUsed} = this.state;

    // If a template has yet to be chosen, show the template selector view
    if (!templateBeingUsed) {
      return (
        <DocumentsNewTemplateSelectView
          onTemplateChoose={this._handleTemplateChoose}
          onTemplateFilter={this._handleTemplateFilter}
          templates={filteredTemplates} />
      );
    }

    // Show the document editing view
    return <DocumentsNewEditorView template={templateBeingUsed} />;
  }

  _handleTemplateChoose = (template) => {
    this.setState({templateBeingUsed: template});
  }

  _handleTemplateFilter = (templateFilterTerms) => {
    this.setState({templateFilterTerms});
  }

}