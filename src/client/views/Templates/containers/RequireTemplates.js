import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../../utils/CustomPropTypes';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TemplateActionCreators from '../actions/ActionCreators';

export default (ComposedComponent) => {

  class RequireTemplates extends Component {

    static displayName = 'RequireTemplates';

    static propTypes = {
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      templates: ImmutablePropTypes.listOf(CustomPropTypes.template)
    };

    componentWillMount() {
      if (!this.props.fetched && !this.props.fetching) {
        this.context.dispatch(TemplateActionCreators.fetch());
      }
    }

    render() {
      const {fetched, fetching, fetchError, ...restProps} = this.props;

      if (fetchError) {
        // TODO: Return a proper dashboard error instead
        return <div>{fetchError}</div>;
      }

      return (
        <ComposedComponent {...restProps} templatesFetched={fetched && !fetching} />
      );
    }

  }

  return connect((state) => ({
    fetching: state.templates.get('fetching'),
    fetched: state.templates.get('fetched'),
    fetchError: state.templates.get('fetchError'),
    templates: state.templates.get('templates')
  }))(RequireTemplates);

};
