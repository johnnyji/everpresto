import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DocumentPreviewCard from '.././shared/DocumentPreviewCard';
import TemplatePreviewCard from './TemplatePreviewCard';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import {truncateString} from '../.././utils/TextHelper';

import DashboardSpinner from '.././shared/DashboardSpinner';
import Button from '.././ui/Button';
import ClickableIcon from '.././ui/ClickableIcon';
import GridView from '.././ui/GridView';
import GridViewItem from '.././ui/GridViewItem';
import Icon from '.././ui/Icon';

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
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    shouldFetchTemplates: PropTypes.bool.isRequired,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillMount() {
    const {templates, shouldFetchTemplates} = this.props;

    if (shouldFetchTemplates) this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  componentWillReceiveProps(nextProps) {
    const {shouldFetchTemplates, templateBeingEdited, templates} = nextProps;

    if (templateBeingEdited) {
      return this.context.history.push(`/dashboard/templates/edit/${templateBeingEdited.get('_id')}`);
    }
    if (shouldFetchTemplates) return this.context.dispatch(TemplateActionCreators.fetchTemplates());
  }

  render() {
    if (this.props.shouldFetchTemplates) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper className={displayName}>
        <GridView className={`${displayName}-templates`}>
          <DocumentPreviewCard className={`${displayName}-templates-new`}>
            <ClickableIcon
              className={`${displayName}-templates-new-button`}
              icon='add'
              onClick={this._handleNewTemplate}
              size={70}/>
          </DocumentPreviewCard>
          {this._renderTemplatePreviews()}
        </GridView>
      </DashboardContentWrapper>
    );
  }

  _handleNewTemplate = () => {
    this.context.history.push('/dashboard/templates/new');
  }

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplatePreviewCard key={i} template={template}/>;
    });
  }

}