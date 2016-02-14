import {combineReducers} from 'redux';
import app from './AppReducer';
import auth from './AuthReducer';
import collections from './CollectionsReducer';
import documents from './DocumentsReducer';
import documentNew from './DocumentsNewReducer';
import templates from './TemplatesReducer';

// The keys in the `combineReducers` argument object will be their corresponding keys in the store state,
// and value will be the actual pre-combined reducer.
export default combineReducers({
  app,
  auth,
  collections,
  documents,
  documentNew,
  templates
});