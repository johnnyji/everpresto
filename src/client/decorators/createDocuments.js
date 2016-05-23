import React, {PropTypes, Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '.././components/CustomPropTypes';
import DocumentNewActionCreators from '.././actions/DocumentNewActionCreators';
import {matchesAttr} from '.././utils/immutable/IterableFunctions';

const signerAttrs = {
  email: matchesAttr('placeholder', 'EMAIL'),
  firstName: matchesAttr('placeholder', 'FIRST_NAME'),
  lastName: matchesAttr('placeholder', 'LAST_NAME')
};

export default (ComposedComponent) => (class createDocuments extends Component {
  
  static displayName = 'createDocuments';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    doc: ImmutablePropTypes.contains({
      collectionId: PropTypes.string,
      signers: ImmutablePropTypes.listOf(
        ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            placeholder: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
          }).isRequired
        )
      ).isRequired,
      template: CustomPropTypes.template.isRequired
    }).isRequired,
    generalPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    specificPlaceholderForm: CustomPropTypes.placeholderForm.isRequired,
    handleFlashError: PropTypes.func.isRequired
  };

  render() {
    return <ComposedComponent {...this.props} createDocuments={this._createDocuments} />;
  }

  /**
   * Creates `document` objects for every signer in the list and passes
   * those to be created and sent
   */
  _createDocuments = () => {
    const {doc, generalPlaceholderForm} = this.props;

    const documents = doc.get('signers').map((signer) => {
      return {
        _collection: doc.get('collectionId'),
        body: this._constructDocumentBody(
          doc.getIn(['template', 'body']),
          signer,
          generalPlaceholderForm.get('values')
        ),
        signer: {
          email: signer.find(signerAttrs.email).get('value'),
          firstName: signer.find(signerAttrs.firstName).get('value'),
          lastName: signer.find(signerAttrs.lastName).get('value')
        }
      };
    });

    this.context.dispatch(DocumentNewActionCreators.createDocuments(documents));
  };


  _constructDocumentBody = (body, specificFields, generalFields) => {
    return specificFields
      .concat(generalFields)
      .reduce((alteredBody, field) => {
        if (!field.get('value')) return alteredBody;

        return alteredBody.replace(
          new RegExp(`<mark>${field.get('placeholder')}</mark>`, 'g'),
          field.get('value')
        );
      }, body);
  };

});
