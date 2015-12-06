import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AppHandler from '.././components/app/AppHandler';
import AuthHandler from '.././components/auth/AuthHandler';
import LandingPageHandler from '.././components/app/LandingPageHandler';
import NotFoundHandler from '.././components/shared/NotFoundHandler';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
  import DocumentCollectionsView from '.././components/documents/DocumentCollectionsView';
    import DocumentCollectionsIndex from '.././components/documents/DocumentCollectionsIndex';
  import TemplatesView from '.././components/templates/TemplatesView';
    import TemplatesIndex from '.././components/templates/TemplatesIndex';
    import TemplatesNew from '.././components/templates/TemplatesNew';
  // import CoursesView from '.././components/teacher/CoursesView';
  // import StudentDashboard from '.././components/dashboard/StudentDashboard';
  // import TeacherDashboard from '.././components/dashboard/TeacherDashboard';

import ProfileHandler from '.././components/user/ProfileHandler';

import requireAuth from './utils/requireAuth';


const routes = (
  <Route component={AppHandler} path='/'>
    <Redirect from='dashboard' to='dashboard/documents' />
    <IndexRoute component={LandingPageHandler} />

    {/*********** Auth Routes ************/}
    <Route component={AuthHandler} path='login'/>
    <Route component={AuthHandler} path='join'/>
    {/*********** Auth Routes ************/}

    {/*********** Protected Routes ************/}
    <Route path='profile' component={requireAuth(ProfileHandler)}/>

    <Route path='dashboard' component={requireAuth(DashboardHandler)}>
      <IndexRoute component={DocumentCollectionsView} />
      <Route path='documents' component={DocumentCollectionsView}>
        <IndexRoute component={DocumentCollectionsIndex} />
      </Route>
      <Route path='templates' component={TemplatesView}>
        <IndexRoute component={TemplatesIndex} />
        <Route path='new' component={TemplatesNew} />
      </Route>
    </Route>
    {/*********** Protected Routes ************/}

    {/*********** 404 Route ************/}
    <Route component={NotFoundHandler} path='*' />
    {/*********** 404 Route ************/}
  </Route>
);

export default routes;