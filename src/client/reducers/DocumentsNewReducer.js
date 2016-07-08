import {
  ADD_SIGNER,
  ADD_SIGNERS,
  CLEAR_SPECIFIC_PLACEHOLDER_FORM,
  CREATE_DOCUMENTS_PENDING,
  CREATE_DOCUMENTS_SUCCESS,
  GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS,
  GENERATE_SPECIFIC_PLACEHOLDER_FORM_FIELDS,
  REMOVE_SIGNER,
  RESET_STATE,
  SET_COLLECTION,
  SET_EMAILS_SENT_COUNT,
  SET_TEMPLATE,
  UPDATE_GENERAL_PLACEHOLDER_FORM_FIELD,
  UPDATE_SPECIFIC_PLACEHOLDER_FORM_FIELD
} from '.././action_types/DocumentNewActionTypes';
import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';
import {matchesAttr} from '.././utils/immutable/IterableFunctions';

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
  saving: false,
  shouldClearSpecificPlaceholderForm: false,
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

export default createReducer(INITIAL_STATE, {

  name: 'DocumentNewReducer',

  handlers: {
    onAddSigner: [ADD_SIGNER],
    onAddSigners: [ADD_SIGNERS],
    onClearSpecificPlaceholderForm: [CLEAR_SPECIFIC_PLACEHOLDER_FORM],
    onSaved: [CREATE_DOCUMENTS_SUCCESS],
    onSaving: [CREATE_DOCUMENTS_PENDING],
    generateGeneralPlaceholderFields: [GENERATE_GENERAL_PLACEHOLDER_FORM_FIELDS],
    generateSpecificPlaceholderFields: [GENERATE_SPECIFIC_PLACEHOLDER_FORM_FIELDS],
    onRemoveSigner: [REMOVE_SIGNER],
    onReset: [RESET_STATE],
    onSetCollection: [SET_COLLECTION],
    onSetEmailsSentCount: [SET_EMAILS_SENT_COUNT],
    onSetTemplate: [SET_TEMPLATE],
    updateGeneralPlaceholderFormField: [UPDATE_GENERAL_PLACEHOLDER_FORM_FIELD],
    updateSpecificPlaceholderFormField: [UPDATE_SPECIFIC_PLACEHOLDER_FORM_FIELD]
  },

  // We want to make sure we add our new signer onto the list of signers, and clear the input form
  onAddSigner(state, {signer}) {
    return state.merge({
      doc: state.get('doc').update('signers', (signers) => signers.unshift(signer)),
      shouldClearSpecificPlaceholderForm: true
    });
  },

  // Adds the newly created signers ontop of the already existing signers
  onAddSigners(state, {signers}) {
    return state.updateIn(['doc', 'signers'], (existingSigners) => {
      // We always want to add the new signers to the top of the array
      return Immutable.fromJS(signers).concat(existingSigners);
    });
  },

  // Sets every user input value of specific placeholder form to nothing, thus clearing the form
  onClearSpecificPlaceholderForm(state) {
    const updatedState = state.updateIn(['specificPlaceholderForm', 'values'], (vals) => {
      return vals.map((val) => val.set('value', ''));
    });
    return updatedState.set('shouldClearSpecificPlaceholderForm', false);
  },

  onSaving(state) {
    return state.merge({
      saved: false,
      saving: true
    });
  },

  onSaved(state) {
    return state.merge({
      saved: true,
      saving: false
    });
  },

  // Dynamically sets the generalPlaceholderForm state dependant on
  // the placeholders in the current template we're using
  generateGeneralPlaceholderFields(state) {
    return state.update('generalPlaceholderForm', (form) => {
      return state.getIn(['doc', 'template', 'placeholders'])
        .filter(isGeneral)
        .reduce((placeholderForm, placeholder) => {
          // Pushes on a placeholder input object -> {placeholder: 'HELLO', value: ''}
          const updatedForm = placeholderForm.update('values', (vals) => (
            vals.push(Immutable.fromJS({
              placeholder: placeholder.get('value'),
              value: ''
            }))
          ));
          // Also creates an error for that input
          return updatedForm.update('errors', (errs) => errs.push(null));
        }, form);
    });
  },

  // Iterates through the placeholders, and generates form input field states for those placeholders,
  // storing input values as well as errors
  generateSpecificPlaceholderFields(state) {
    return state.update('specificPlaceholderForm', (form) => {
      return state.getIn(['doc', 'template', 'placeholders'])
        .filter(isSpecific)
        .reduce((placeholderForm, placeholder) => {
          // Pushes on a placeholder input object -> {placeholder: 'HELLO', value: ''}
          const updatedForm = placeholderForm.update('values', (vals) => (
            vals.push(Immutable.fromJS({
              placeholder: placeholder.get('value'),
              value: ''
            }))
          ));
          // Also creates an error for that input
          return updatedForm.update('errors', (errs) => errs.push(null));
        }, form);
    });
  },

  onRemoveSigner(state, {signer}) {
    // `signer` will already be Immutable
    return state.updateIn(['doc', 'signers'], (signers) => (
      signers.delete(signers.findIndex((signer) => signer.equals(signer)))
    ));
  },

  onResetState() {
    return INITIAL_STATE;
  },

  // Sets the collection ID of the collection
  // that this document we're creating belongs to
  onSetCollection(state, {collectionId}) {
    return state.setIn(['doc', 'collectionId'], collectionId);
  },

  // Increments the emails sent count whenever we succesfully
  // send an email after a document is created. This is
  // the number we're using to track the progress bar that loads
  // when we've begun to create/email docs
  onSetEmailsSentCount(state, {count}) {
    return state.set('emailsSentCount', count);
  },

  // Sets the template we're going to be using to create this document
  onSetTemplate(state, {template}) {
    // `template` will already be an Immutable.Map
    return state.setIn(['doc', 'template'], template);
  },

  // Finds a field in the general placeholders form by index and updates its values and errors
  // to what the new user input is
  updateGeneralPlaceholderFormField(state, {input}) {
    const {formFieldIndex, value, error} = input;
    let generalPlaceholderForm = state.get('generalPlaceholderForm');
    generalPlaceholderForm = generalPlaceholderForm.setIn(['values', formFieldIndex, 'value'], value);
    generalPlaceholderForm = generalPlaceholderForm.setIn(['errors', formFieldIndex], error);

    return state.set('generalPlaceholderForm', generalPlaceholderForm);
  },

  // Finds a field in the specific placeholders form by index and updates its values and errors
  // to what the new user input is
  updateSpecificPlaceholderFormField(state, {input}) {
    const {formFieldIndex, value, error} = input;
    let specificPlaceholderForm = state.get('specificPlaceholderForm');
    specificPlaceholderForm = specificPlaceholderForm.setIn(['values', formFieldIndex, 'value'], value);
    specificPlaceholderForm = specificPlaceholderForm.setIn(['errors', formFieldIndex], error);

    return state.set('specificPlaceholderForm', specificPlaceholderForm);
  }

});
