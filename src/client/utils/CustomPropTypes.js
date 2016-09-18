import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const {string: STR} = PropTypes;

const document = ImmutablePropTypes.mapContains({
  collection: STR.isRequired,
  company: STR.isRequired,
  creator: STR.isRequired,
  id: STR.isRequired,
  body: STR.isRequired,
  createdAt: STR.isRequired,
  signer: ImmutablePropTypes.mapContains({
    email: STR.isRequired,
    firstName: STR,
    lastName: STR
  }).isRequired,
  status: PropTypes.oneOf(['created', 'sent', 'signed']).isRequired,
  updatedAt: STR.isRequired
});

export default {

  // This is the propType for collections that
  // do not contain `documents`, the light version
  // of a collection
  collectionPreview: ImmutablePropTypes.mapContains({
    company: STR.isRequired,
    creator: STR.isRequired,
    id: STR.isRequired,
    createdAt: STR.isRequired,
    title: STR.isRequired,
    updatedAt: STR.isRequired
  }),

  collection: ImmutablePropTypes.mapContains({
    company: STR.isRequired,
    creator: STR.isRequired,
    id: STR.isRequired,
    createdAt: STR.isRequired,
    documents: ImmutablePropTypes.listOf(document).isRequired,
    title: STR.isRequired,
    updatedAt: STR.isRequired
  }),

  company: ImmutablePropTypes.mapContains({
    id: STR.isRequired,
    createdAt: STR.isRequired,
    name: STR.isRequired,
    updatedAt: STR.isRequired
  }),

  document,

  // This is the form used by users to replace placeholders with actual values
  // when they create a document and are adding signers in `DocumentsNew`
  placeholderForm: ImmutablePropTypes.mapContains({
    values: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        placeholder: STR,
        value: STR
      })
    ).isRequired,
    errors: ImmutablePropTypes.listOf(
      STR
    ).isRequired
  }),

  template: ImmutablePropTypes.mapContains({
    body: STR.isRequired,
    company: STR.isRequired,
    createdAt: STR.isRequired,
    creator: STR.isRequired,
    id: STR.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        isRequired: PropTypes.bool.isRequired,
        tip: STR,
        type: PropTypes.oneOf(['general', 'specific']).isRequired,
        value: STR.isRequired
      }).isRequired
    ).isRequired,
    rawText: STR.isRequired,
    title: STR.isRequired,
    updatedAt: STR.isRequired
  }),

  user: ImmutablePropTypes.mapContains({
    company: STR.isRequired,
    id: STR.isRequired,
    account: ImmutablePropTypes.mapContains({
      email: STR.isRequired,
      firstName: STR.isRequired,
      lastName: STR.isRequired,
      profilePictureUrl: STR.isRequired
    }).isRequired,
    clearanceLevel: PropTypes.oneOf(['admin', 'user']).isRequired,
    createdAt: STR.isRequired,
    updatedAt: STR.isRequired
  })

};
