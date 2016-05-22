import Immutable from 'immutable';
import DocumentNewActionTypes from '.././action_types/DocumentNewActionTypes';
import {matchesAttr} from '.././utils/immutable/IterableFunctions';

const {
  ADD_SIGNERS,
  CLEAR_SPECIFIC_PLACEHOLDER_FORM,
  CREATE_DOCUMENTS,
  CREATE_DOCUMENTS_SUCCESS,
  GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS,
  GENERATE_SPECIFIC_PLACEHOLDER_FORM_FIELDS,
  REMOVE_SIGNER,
  RESET_STATE,
  SAVING_SIGNER,
  SET_COLLECTION,
  SET_EMAILS_SENT_COUNT,
  SET_TEMPLATE,
  UPDATE_GENERAL_PLACEHOLDER_FORM_FIELD,
  UPDATE_SPECIFIC_PLACEHOLDER_FORM_FIELD
} = DocumentNewActionTypes;

const INITIAL_STATE = Immutable.fromJS({
  doc: {
    collectionId: null,
    signers: [],
    template: null
  },
  // The amount of emails sent to signers
  // out of the total that needs to be sent
  emailsSentCount: 0,
  // The form to fill placeholder values that are the same for every signer on the document (ie. TODAYS_DATE)
  //
  // The form is structured where values are maps containing the placeholder, and the actual value it contains,
  // and the errors are simply strings or null. To properly associate a value with an error, you just have to reference
  // the same index, as they will always be in order. ie:
  //
  //  {
  //    values: [
  //      {placeholder: 'EMAIL', value: 'johnny.ji.com'},
  //      {placeholder: 'PHONE_NUMBER', value: '604111ij3x'},
  //    ],
  //    errors: [
  //      'Emails must include an @ symbol',
  //      'Phone numbers can only be digits'
  //    ]
  //  }
  generalPlaceholderForm: {
    values: [],
    errors: []
  },
  saved: false,
  savedSigner: false,
  saving: false,
  savingSigner: false,
  // The form to fill placeholder values that are specific to each signer, filling this form out and submitting it
  // will add a new signer to the document, required fields include FIRST_NAME, LAST_NAME, EMAIL
  //
  // The form strucutre for this will be the same as the `generalPlaceholderForm`
  specificPlaceholderForm: {
    values: [],
    errors: []
  }
});

const isGeneral = matchesAttr('type', 'general');
const isSpecific = matchesAttr('type', 'specific');

export default function documentsReducer(state = INITIAL_STATE, action) {
  // Always return a new state, never already the one passed in

  switch (action.type) {

    // When a signer is added to the document we're creating. We want to set saving signer to false, saved signer to true,
    // and make sure that signer we just added is at the top of the list of signers that will be receiving
    // this document
    case ADD_SIGNERS: {
      return state.merge({
        doc: state.get('doc').update('signers', (signers) => Immutable.fromJS(action.data.signers).concat(signers)),
        savedSigner: true,
        savingSigner: false
      });
    }
    
    // Sets every user input value of specific placeholder form to nothing, thus clearing the form
    case CLEAR_SPECIFIC_PLACEHOLDER_FORM: {
      // TODO: Why is this not working?
      debugger;
      return state.updateIn(['specificPlaceholderForm', 'values'], (vals) => {
        debugger;
        return vals.map((val) => val.set('value', ''));
      });
    }

    case CREATE_DOCUMENTS: {
      return state.merge({
        saved: false,
        saving: true
      });
    }

    case CREATE_DOCUMENTS_SUCCESS: {
      return state.merge({
        saved: true,
        saving: false
      });
    }

    // Dynamically sets the generalPlaceholderForm state dependant on
    // the placeholders in the current template we're using
    case GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS: {
      return state.update('generalPlaceholderForm', (form) => {
        return state.getIn(['doc', 'template', 'placeholders'])
          .filter(isGeneral)
          .reduce((placeholderForm, placeholder) => {
            // Pushes on a placeholder input object -> {placeholder: 'HELLO', value: null}
            const updatedForm = placeholderForm.update('values', (vals) => (
              vals.push(Immutable.fromJS({
                placeholder: placeholder.get('value'),
                value: null
              }))
            ));
            // Also creates an error for that input
            return updatedForm.update('errors', (errs) => errs.push(null));
          }, form);
      });
    }

    // Iterates through the placeholders, and generates form input field states for those placeholders,
    // storing input values as well as errors
    case GENERATE_SPECIFIC_PLACEHOLDER_FORM_FIELDS: {
      return state.update('specificPlaceholderForm', (form) => {
        return state.getIn(['doc', 'template', 'placeholders'])
          .filter(isSpecific)
          .reduce((placeholderForm, placeholder) => {
            // Pushes on a placeholder input object -> {placeholder: 'HELLO', value: null}
            const updatedForm = placeholderForm.update('values', (vals) => (
              vals.push(Immutable.fromJS({
                placeholder: placeholder.get('value'),
                value: null
              }))
            ));
            // Also creates an error for that input
            return updatedForm.update('errors', (errs) => errs.push(null));
          }, form);
      });
    }

    case REMOVE_SIGNER: {
      // `signer` will already be Immutable
      return state.updateIn(['doc', 'signers'], (signers) => (
        signers.delete(
          signers.findIndex((signer) => signer.equals(action.data.signer))
        )
      ));
    }

    case RESET_STATE: {
      return INITIAL_STATE;
    }

    case SAVING_SIGNER: {
      return state.merge({
        savingSigner: true,
        savedSigner: false
      });
    }

    case SET_COLLECTION: {
      return state.setIn(['doc', 'collectionId'], action.data.collectionId);
    }

    case SET_EMAILS_SENT_COUNT: {
      return state.set('emailsSentCount', action.data.count);
    }

    case SET_TEMPLATE: {
      // `template` will already be an Immutable.Map
      return state.setIn(['doc', 'template'], action.data.template);
    }

    // Finds a field in the general placeholders form by index and updates its values and errors
    // to what the new user input is
    case UPDATE_GENERAL_PLACEHOLDER_FORM_FIELD: {
      const {formFieldIndex, value, error} = action.data.input;
      let generalPlaceholderForm = state.get('generalPlaceholderForm');
      generalPlaceholderForm = generalPlaceholderForm.setIn(['values', formFieldIndex, 'value'], value);
      generalPlaceholderForm = generalPlaceholderForm.setIn(['errors', formFieldIndex], error);

      return state.set('generalPlaceholderForm', generalPlaceholderForm);
    }

    // Finds a field in the specific placeholders form by index and updates its values and errors
    // to what the new user input is
    case UPDATE_SPECIFIC_PLACEHOLDER_FORM_FIELD: {
      const {formFieldIndex, value, error} = action.data.input;
      let specificPlaceholderForm = state.get('specificPlaceholderForm');
      specificPlaceholderForm = specificPlaceholderForm.setIn(['values', formFieldIndex, 'value'], value);
      specificPlaceholderForm = specificPlaceholderForm.setIn(['errors', formFieldIndex], error);

      return state.set('specificPlaceholderForm', specificPlaceholderForm);
    }

    default: {
      return state;
    }

  }

}
