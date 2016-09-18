import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';

import collectionsEdit from './collections/CollectionsEditReducer';
import collectionsIndex from './collections/CollectionsIndexReducer';
import collectionsShow from './collections/CollectionsShowReducer';

import documentSigning from './DocumentSigningReducer';
import documents from './DocumentsReducer';
import documentsNew from './DocumentsNewReducer';
// import templates from './TemplatesReducer';

// The keys in the `combineReducers` argument object will be their corresponding keys in the store state,
// and value will be the actual pre-combined reducer.
export default combineReducers({
  app,
  auth,

  // collections,
  collectionsIndex,
  collectionsEdit,
  collectionsShow,

  documentSigning,
  documents,
  documentsNew,

  templates: require('../views/Templates/reducers/TemplatesReducer'),
  templatesEdit: require('../views/Templates/reducers/TemplatesEditReducer')
});
