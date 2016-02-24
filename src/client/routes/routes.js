import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import requireAuth from './utils/requireAuth';

import AppHandler from 'client/components/app/AppHandler';
import AuthHandler from 'client/components/auth/AuthHandler';
import LandingPageHandler from 'client/components/app/LandingPageHandler';
import NotFoundHandler from 'client/components/shared/NotFoundHandler';

import DashboardHandler from 'client/components/dashboard/DashboardHandler';
import DashboardView from 'client/components/dashboard/DashboardView';
  // Collections
  import CollectionsIndex from 'client/components/collections/CollectionsIndex';
  import CollectionsShow from 'client/components/collections/CollectionsShow';
  // Documents
  import DocumentsIndex from 'client/components/documents/DocumentsIndex';
  import DocumentsNew from 'client/components/documents/DocumentsNew';
  // Templates
  import TemplatesIndex from 'client/components/templates/TemplatesIndex';
  import TemplatesEdit from 'client/components/templates/TemplatesEdit';
  // Profile Settings
  // import ProfileSettings from '.././components/user/ProfileSettings';

const routes = (
  <Route component={AppHandler} path='/'>
    <Redirect from='dashboard' to='dashboard/collections' />
    <Redirect from='profile' to='dashboard/profile_settings' />
    <IndexRoute component={LandingPageHandler} />

    {/*********** Auth Routes ************/}
    <Route component={AuthHandler} path='login'/>
    <Route component={AuthHandler} path='join'/>
    {/*********** Auth Routes ************/}

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

      {/*<Route path='profile_settings' component={DashboardView}>
        <IndexRoute component={ProfileSettings} />
      </Route>*/}
    </Route>
    {/*********** Protected Routes ************/}

    {/*********** 404 Route ************/}
    <Route component={NotFoundHandler} path='*' />
    {/*********** 404 Route ************/}
  </Route>
);

export default routes;