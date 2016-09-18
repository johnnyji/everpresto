// TODO: Delete this file in favour of `client/src/utils/CustomPropTypes.js`

import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const document = ImmutablePropTypes.mapContains({
  collection: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  signer: ImmutablePropTypes.mapContains({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,
  status: PropTypes.oneOf(['created', 'sent', 'signed']).isRequired,
  updatedAt: PropTypes.string.isRequired
});

const CustomPropTypes = {

  // This is the propType for collections that
  // do not contain `documents`, the light version
  // of a collection
  collectionPreview: ImmutablePropTypes.mapContains({
    company: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  collection: ImmutablePropTypes.mapContains({
    company: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    documents: ImmutablePropTypes.listOf(document).isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  company: ImmutablePropTypes.mapContains({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  document,

  // This is the form used by users to replace placeholders with actual values
  // when they create a document and are adding signers in `DocumentsNew`
  placeholderForm: ImmutablePropTypes.mapContains({
    values: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        placeholder: PropTypes.string,
        value: PropTypes.string
      })
    ).isRequired,
    errors: ImmutablePropTypes.listOf(
      PropTypes.string
    ).isRequired
  }),

  template: ImmutablePropTypes.mapContains({
    body: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        isRequired: PropTypes.bool.isRequired,
        tip: PropTypes.string,
        type: PropTypes.oneOf(['general', 'specific']).isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    rawText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  user: ImmutablePropTypes.mapContains({
    company: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    account: ImmutablePropTypes.mapContains({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired
    }).isRequired,
    clearanceLevel: PropTypes.oneOf(['admin', 'user']).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })

};

export default CustomPropTypes;
