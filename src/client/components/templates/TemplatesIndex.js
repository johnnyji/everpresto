import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardSpinner from '.././shared/DashboardSpinner';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateCard from './TemplateCard';
import TemplateCardPreviewEdit from './TemplateCardPreviewEdit';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  shouldFetchTemplates: state.templates.get('shouldFetchTemplates'),
  templateBeingEdited: state.templates.get('templateBeingEdited'),
  templates: state.templates.get('templates')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    if (this.props.shouldFetchTemplates) {
      this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shouldFetchTemplates, templateBeingEdited} = nextProps;

    if (templateBeingEdited) {
      return this.context.router.push(`/dashboard/templates/edit/${templateBeingEdited.get('id')}`);
    }

    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  render() {
    if (this.props.shouldFetchTemplates) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper className={displayName}>
        <TemplateCard
          className={`${displayName}-templates-new`}
          isNewCard={true}
          onNewIconClick={this._handleCreateTemplate} />
        {this._renderTemplatePreviews()}
      </DashboardContentWrapper>
    );
  }

  _handleCreateTemplate = () => {
    this.context.dispatch(TemplateActionCreators.createTemplate());
  };

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplateCardPreviewEdit key={i} template={template} />;
    });
  };

}