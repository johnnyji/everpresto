import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../components/CustomPropTypes';
import DashboardMessage from '../components/dashboard/DashboardMessage';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Spinner from '../components/ui/Spinner';
import TemplateActionCreators from '../actions/TemplateActionCreators';

export default (ComposedComponent) => {
  class RequiresTemplates extends Component {

    static displayName = 'RequiresTemplates';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      templates: ImmutablePropTypes.listOf(CustomPropTypes.templates)
    };

    componentWillMount() {
      const {dispatch} = this.props;
      // Because this is the document signing view, we need to ensure the user is signing the correct document.
      // Therefore we must fetch a new document every single time this container mounts, regardless if one has already been
      // fetched
      if (!fetching && !fetched) {
        dispatch(TemplateActionCreators.fetchTemplates());
      }
    }

    render() {
      const {fetching, fetched, fetchError, ...restProps} = this.props;

      if (fetched && fetchError) return <DashboardMessage>{fetchError}</DashboardMessage>;
      if (fetching || !fetched) return <Spinner fullScreen={true} />;

      return <ComposedComponent {...restProps} />;
    }
  }

  return connect((state) => ({
    fetched: state.templatesFetching.get('fetched'),
    fetchError: state.templatesFetching.getIn('fetchError'),
    fetching: state.templatesFetching.getIn('fetching'),
    templates: state.templates.get('templates')
  }))(RequiresTemplates);

};
