import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateActionCreators from '../.././actions/TemplateActionCreators';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

import Button from '.././ui/Button';
import Icon from '.././ui/Icon';
import GridView from '.././ui/GridView';
import GridViewItem from '.././ui/GridViewItem';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  templates: state.templates.get('templates'),
  wasEverFetched: state.templates.get('wasEverFetched')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    templates: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
  };

  componentWillMount() {
    const {templates, wasEverFetched} = this.props;

    // If there are no templates and we haven't previously fetched for them,
    // fetch the API for possible templates
    if (!wasEverFetched && templates.size === 0) {
      this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }


  render() {
    const {templates} = this.props;

    return (
      <DashboardContentWrapper>
        <h1>Amount of templates: {templates.size}</h1>
        <GridView>
          <GridViewItem>
            <Icon icon="add" />
            <Button color='green' icon='add' onClick={this._handleNewTemplate} text='New Template' />
          </GridViewItem>
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
      return (
        <GridViewItem key={i}>
          <h3>{template.get('title')}</h3>
        </GridViewItem>
      );
    });
  }

}
