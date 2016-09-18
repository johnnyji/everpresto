import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';

import collectionsEdit from './collections/CollectionsEditReducer';
// import collectionsIndex from './collections/CollectionsIndexReducer';
import collectionsIndex from '../views/Collections/reducers/CollectionsIndexReducer';
import collectionsShow from './collections/CollectionsShowReducer';

import documentSigning from './DocumentSigningReducer';
import documents from './DocumentsReducer';
import documentsNew from './DocumentsNewReducer';
// import templates from './TemplatesReducer';

import templatesIndex from '../views/Templates/reducers/TemplatesIndexReducer';
import templatesEdit from '../views/Templates/reducers/TemplatesEditReducer';

// The keys in the `combineReducers` argument object will be their corresponding keys in the store state,
// and value will be the actual pre-combined reducer.
export default combineReducers({
  app,
  auth,

  collectionsIndex,
  collectionsEdit,
  collectionsShow,

  documentSigning,
  documents,
  documentsNew,

  templatesIndex,
  templatesEdit
});
