import {PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CustomPropTypes = {

  collection: ImmutablePropTypes.contains({
    _company: PropTypes.string.isRequired,
    _creator: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  company: ImmutablePropTypes.contains({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }),

  document: ImmutablePropTypes.contains({
    _collection: PropTypes.string.isRequired,
    _company: PropTypes.string.isRequired,
    _creator: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    signer: {
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    },
    status: PropTypes.oneOf(['created', 'sent', 'signed']).isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),

  template: ImmutablePropTypes.contains({
    _company: PropTypes.string.isRequired,
    _creator: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    placeholders: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
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

  user: ImmutablePropTypes.contains({
    _company: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    account: ImmutablePropTypes.contains({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired
    }).isRequired,
    clearanceLevel: PropTypes.oneOf(['admin', 'user']).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })

};

export default CustomPropTypes;