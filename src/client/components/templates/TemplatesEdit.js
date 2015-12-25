import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';

@connect((state) => ({
  template: state.templates.get('templateBeingEdited')
}))
export default class TemplatesEdit extends Component {

  static propTypes = {
    template: CustomPropTypes.template.isRequired
  };

  componentWillUnmount() {
    this.context.dispatch(TemplateActionCreators.resetTemplateBeingEdited());
  }

  render() {
    const {template} = this.props;
    
    return (
      <DashboardContentWrapper>
        {template.get('title')}
      </DashboardContentWrapper>
    );
  }
}
