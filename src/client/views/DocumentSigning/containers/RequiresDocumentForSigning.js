import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../components/CustomPropTypes';
import DashboardMessage from '../components/dashboard/DashboardMessage';
import DocumentSigningActionCreators from '../actions/DocumentSigningActionCreators';
import Spinner from '../components/ui/Spinner';

export default (ComposedComponent) => {
  class RequiresDocumentForSigning extends Component {

    static displayName = 'RequiresDocumentForSigning';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      document: CustomPropTypes.document,
      fetched: PropTypes.bool.isRequired,
      fetchError: PropTypes.string,
      fetching: PropTypes.bool.isRequired,
      // TODO: Convert to `shape`
      params: PropTypes.shape({
        // The document to be signed ID
        id: PropTypes.string.isRequired,
        // The signature token ID that exists on the doc
        signature_token: PropTypes.string.isRequired
      }).isRequired
    };

    componentWillMount() {
      const {dispatch, params} = this.props;
      // Because this is the document signing view, we need to ensure the user is signing the correct document.
      // Therefore we must fetch a new document every single time this container mounts, regardless if one has already been
      // fetched
      dispatch(DocumentSigningActionCreators.fetchDocument(params.id, params.signature_token));
    }

    render() {
      const {fetching, fetched, fetchError, ...restProps} = this.props;

      if (fetched && fetchError) return <DashboardMessage>{fetchError}</DashboardMessage>;
      if (fetching || !fetched) return <Spinner fullScreen={true} />;

      return <ComposedComponent {...restProps} />;
    }
  }

  return connect((state) => ({
    document: state.documentSigning.get('document'),
    fetched: state.documentSigning.getIn(['fetch', 'fetched']),
    fetchError: state.documentSigning.getIn(['fetch', 'fetchError']),
    fetching: state.documentSigning.getIn(['fetch', 'fetching'])
  }))(RequiresDocumentForSigning);

};
