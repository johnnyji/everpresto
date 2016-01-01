import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import requireAuth from './utils/requireAuth';

import AppHandler from '.././components/app/AppHandler';
import AuthHandler from '.././components/auth/AuthHandler';
import LandingPageHandler from '.././components/app/LandingPageHandler';
import NotFoundHandler from '.././components/shared/NotFoundHandler';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
  import CollectionsView from '.././components/collections/CollectionsView';
    import CollectionsIndex from '.././components/collections/CollectionsIndex';
    import CollectionsShow from '.././components/collections/CollectionsShow';
  import TemplatesView from '.././components/templates/TemplatesView';
    import TemplatesIndex from '.././components/templates/TemplatesIndex';
    import TemplatesNew from '.././components/templates/TemplatesNew';
    import TemplatesEdit from '.././components/templates/TemplatesEdit';

import ProfileHandler from '.././components/user/ProfileHandler';

const routes = (
  <Route component={AppHandler} path='/'>
    <Redirect from='dashboard' to='dashboard/collections' />
    <IndexRoute component={LandingPageHandler} />

    {/*********** Auth Routes ************/}
    <Route component={AuthHandler} path='login'/>
    <Route component={AuthHandler} path='join'/>
    {/*********** Auth Routes ************/}

    {/*********** Protected Routes ************/}
    <Route path='profile' component={requireAuth(ProfileHandler)}/>

    <Route path='dashboard' component={requireAuth(DashboardHandler)}>
      <IndexRoute component={CollectionsView} />

      <Route path='collections' component={CollectionsView}>
        <IndexRoute component={CollectionsIndex} />
        <Route path=':id' component={CollectionsShow} />
      </Route>

      <Route path='templates' component={TemplatesView}>
        <IndexRoute component={TemplatesIndex} />
        <Route path='new' component={TemplatesNew} />
        <Route path='edit/:id' component={TemplatesEdit} />
      </Route>
    </Route>
    {/*********** Protected Routes ************/}

    {/*********** 404 Route ************/}
    <Route component={NotFoundHandler} path='*' />
    {/*********** 404 Route ************/}
  </Route>
);

export default routes;