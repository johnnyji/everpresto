import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././CustomPropTypes';
import DashboardContentWrapper from '.././dashboard/DashboardContentWrapper';
import DashboardSpinner from '.././dashboard/DashboardSpinner';

import DocumentActionCreators from '../.././actions/DocumentActionCreators';

const displayName = 'DocumentsIndex';

@connect((state) => ({
 docs: state.documents.get('docs'),
 shouldFetchDocs: state.documents.get('shouldFetchDocs')
}))
export default class DocumentsIndex extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    docs: ImmutablePropTypes.listOf(CustomPropTypes.document).isRequired,
    shouldFetchDocs: PropTypes.bool.isRequired
  };

  componentWillMount() {
    if (this.props.shouldFetchDocs) {
      this.context.dispatch(DocumentActionCreators.fetchDocs());
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.shouldFetchDocs) {
      this.context.dispatch(DocumentActionCreators.fetchDocs());
    }
  }

  componentWillUnmount() {
    this.context.dispatch(DocumentActionCreators.resetShouldFetchDocs());
  }

  render() {
    if (this.props.shouldFetchDocs) return <DashboardSpinner />;

    return (
      <DashboardContentWrapper>
        {this.props.docs.size}
      </DashboardContentWrapper>
    );
  }
}