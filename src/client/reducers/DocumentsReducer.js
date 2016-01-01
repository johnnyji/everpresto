// import Immutable from 'immutable';
// import DocumentActionTypes from '.././action_types/DocumentActionTypes';

// const {
//   FETCH_DOCUMENTS_SUCCESS,
//   RESET_SHOULD_FETCH_DOCUMENTS} = DocumentActionTypes;

// const initialState = Immutable.fromJS({
//   documents: [],
//   shouldFetchDocuments: true
// });

// export default function documentsReducer(state = initialState, action) {
//   // Always return a new state, never already the one passed in

//   switch (action.type) {

//     case FETCH_DOCUMENTS_SUCCESS:
//       return state.merge({
//         documents: action.data.documents,
//         shouldFetchDocuments: false
//       });

//     case RESET_SHOULD_FETCH_DOCUMENTS:
//       return state.set('shouldFetchDocuments', true);

//     default:
//       return state;
//   }

// }