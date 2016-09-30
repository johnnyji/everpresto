import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import DashboardError from '../../../components/dashboard/DashboardError';
import DashboardSpinner from '../../../components/dashboard/DashboardSpinner';
import TemplateActionCreators from '../actions/ActionCreators';

export default (ComposedComponent) => {

  class RequireTemplateBeingEdited extends Component {

    static displayName = 'RequireTemplateBeingEdited';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      template: CustomPropTypes.template,
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    };

    componentWillMount() {
      if (!this.props.fetched && !this.props.fetching) {
        this.props.dispatch(TemplateActionCreators.edit.fetch(this.props.params.id));
      }
    }

    render() {
      debugger;
      const {fetched, fetching, fetchError, ...restProps} = this.props;

      if (fetchError) return <DashboardError text={fetchError} />;
      if (fetching || !fetched) return <DashboardSpinner />;

      return (
        <ComposedComponent {...restProps} />
      );
    }

  }

  return connect((state) => ({
    fetching: state.templatesEdit.get('fetching'),
    fetched: state.templatesEdit.get('fetched'),
    fetchError: state.templatesEdit.get('fetchError'),
    template: state.templatesEdit.get('template')
  }))(RequireTemplateBeingEdited);

};
