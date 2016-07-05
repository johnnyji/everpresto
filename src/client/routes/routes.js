/* eslint-disable spaced-comment */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import requireAuth from './utils/requireAuth';

import AppHandler from '.././components/app/AppHandler';
import AuthHandler from '.././components/auth/AuthHandler';
import LandingPageHandler from '.././components/app/LandingPageHandler';
import NotFoundHandler from '.././components/shared/NotFoundHandler';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
import DashboardView from '.././components/dashboard/DashboardView';
  // Collections
  import CollectionsIndex from '.././components/collections/CollectionsIndex';
  import CollectionsShow from '.././components/collections/CollectionsShow';
  // Documents
  import DocumentsIndex from '.././components/documents/DocumentsIndex';
  import DocumentsNew from '.././components/documents/DocumentsNew';
  // Templates
  import TemplatesIndex from '.././components/templates/TemplatesIndex';
  import TemplatesEdit from '.././components/templates/TemplatesEdit';
  // Profile Settings
  import ProfileSettings from '.././components/user/ProfileSettings';

// This view is for testing out new components, REMOVE IN PROD
import TestView from '../components/test/TestView';

import SignatureView from '../components/signature';

const routes = (
  <Route component={AppHandler} path='/'>
    <Redirect from='dashboard' to='dashboard/collections' />
    <Redirect from='settings' to='dashboard/profile_settings' />
    <Redirect from='profile' to='dashboard/profile_settings' />
    <IndexRoute component={LandingPageHandler} />

    {/*********** Email Signature Route ************/}
    <Route component={SignatureView} path='documents/:id/sign/:signature_token' />

    {/*********** Auth Routes ************/}
    <Route component={AuthHandler} path='login' />
    <Route component={AuthHandler} path='join' />

    {/*********** Protected Routes ************/}
    <Route path='dashboard' component={requireAuth(DashboardHandler)}>
      <IndexRoute component={DashboardView} />

      <Route path='collections' component={DashboardView}>
        <IndexRoute component={CollectionsIndex} />
        <Route path=':id' component={CollectionsShow} />
      </Route>

      <Route path='documents' component={DashboardView}>
        <IndexRoute component={DocumentsIndex} />
        <Route path=':collection_id/new' component={DocumentsNew} />
      </Route>

      <Route path='templates' component={DashboardView}>
        <IndexRoute component={TemplatesIndex} />
        <Route path='edit/:id' component={TemplatesEdit} />
      </Route>

      <Route path='profile_settings' component={DashboardView}>
        <IndexRoute component={ProfileSettings} />
      </Route>

      <Route path='test' component={DashboardView}>
        <IndexRoute component={TestView} />
      </Route>
    </Route>

    {/*********** 404 Route ************/}
    <Route component={NotFoundHandler} path='*' />
  </Route>
);

export default routes;
/* eslint-enable spaced-comment */
