/* eslint-disable spaced-comment */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

// Route Hooks
import RequireAdmin from './hooks/RequireAdmin';
import RequireAuth from './hooks/RequireAuth';

import App from '.././components/app/App';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
import DashboardView from '.././components/dashboard/DashboardView';
// Collections
// import CollectionsIndex from '.././components/collections/CollectionsIndex';
import CollectionsShow from '.././components/collections/CollectionsShow';
// Documents
import DocumentsIndex from '.././components/documents/DocumentsIndex';
import DocumentsNew from '.././components/documents/DocumentsNew';
import DocumentsNewChooseTemplateView from '.././components/documents/DocumentsNewChooseTemplateView';
import DocumentsNewEditorView from '.././components/documents/DocumentsNewEditorView';
// Templates
// import TemplatesIndex from '.././components/templates/TemplatesIndex';
import TemplatesEdit from '.././components/templates/TemplatesEdit';
// Profile Settings
import ProfileSettings from '.././components/user/ProfileSettings';

// This view is for testing out new components, REMOVE IN PROD
import TestView from '../components/test/TestView';

import Admin from '../views/Admin';
import CollectionsIndex from '../views/Collections';
import DocumentSigning from '../views/DocumentSigning';
import LandingPage from '../views/LandingPage';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Registration from '../views/Registration';
import TemplatesIndex from '../views/Templates';

export default (
  <Route component={App} path='/'>
    <Redirect from='dashboard' to='dashboard/collections' />
    <Redirect from='settings' to='dashboard/profile_settings' />
    <Redirect from='profile' to='dashboard/profile_settings' />

    <IndexRoute component={LandingPage} />

    {/*********** Email Signature Route ************/}
    <Route component={DocumentSigning} path='sign_document/:id/token/:signature_token' />

    {/*********** Auth Routes ************/}
    <Route component={Login} path='login' />
    <Route component={Registration} path='join' />

    {/*********** Protected Routes ************/}
    <Route path='dashboard' component={RequireAuth(DashboardHandler)}>
      <IndexRoute component={DashboardView} />

      <Route path='collections' component={DashboardView}>
        <IndexRoute component={CollectionsIndex} />
        <Route path=':id' component={CollectionsShow} />
        <Route path=':collection_id/documents/new' component={DocumentsNew}>
          <Route path='choose_template' component={DocumentsNewChooseTemplateView} />
          <Route path=':template_id/add_signers' component={DocumentsNewEditorView} />
        </Route>
      </Route>

      <Route path='documents' component={DashboardView}>
        <IndexRoute component={DocumentsIndex} />
      </Route>

      <Route path='templates' component={DashboardView}>
        <IndexRoute component={TemplatesIndex} />
        <Route path='edit/:id' component={TemplatesEdit} />
      </Route>

      <Route path='profile_settings' component={DashboardView}>
        <IndexRoute component={ProfileSettings} />
      </Route>

      <Route path='admin' component={RequireAdmin(DashboardView)}>
        <IndexRoute component={Admin} />
      </Route>

      <Route path='test' component={DashboardView}>
        <IndexRoute component={TestView} />
      </Route>
    </Route>

    {/*********** 404 Route ************/}
    <Route component={NotFound} path='*' />
  </Route>
);
/* eslint-enable spaced-comment */
