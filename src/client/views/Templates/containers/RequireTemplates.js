import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import DashboardError from '../../../components/dashboard/DashboardError';
import DashboardSpinner from '../../../components/dashboard/DashboardSpinner';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateActionCreators from '../actions/ActionCreators';

export default (ComposedComponent) => {

  class RequireTemplates extends Component {

    static displayName = 'RequireTemplates';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      templates: ImmutablePropTypes.listOf(CustomPropTypes.template)
    };

    componentWillMount() {
      if (!this.props.fetched && !this.props.fetching) {
        this.props.dispatch(TemplateActionCreators.fetch());
      }
    }

    render() {
      const {fetched, fetching, fetchError, ...restProps} = this.props;

      if (fetchError) return <DashboardError>{fetchError}</DashboardError>;
      if (fetching && !fetched) return <DashboardSpinner />;

      return (
        <ComposedComponent {...restProps} />
      );
    }

  }

  return connect((state) => ({
    fetching: state.templatesIndex.get('fetching'),
    fetched: state.templatesIndex.get('fetched'),
    fetchError: state.templatesIndex.get('fetchError'),
    templates: state.templatesIndex.get('templates')
  }))(RequireTemplates);

};
