import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';

import collectionsEdit from './collections/CollectionsEditReducer';
import collectionsIndex from './collections/CollectionsIndexReducer';
import collectionsShow from './collections/CollectionsShowReducer';

import documents from './DocumentsReducer';
import documentsNew from './DocumentsNewReducer';
import templates from './TemplatesReducer';

// The keys in the `combineReducers` argument object will be their corresponding keys in the store state,
// and value will be the actual pre-combined reducer.
export default combineReducers({
  app,
  auth,

  collectionsEdit,
  collectionsIndex,
  collectionsShow,

  documents,
  documentsNew,
  templates
});