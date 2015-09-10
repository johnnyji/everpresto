import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';

import AppHandler from './components/app/AppHandler';
import HomeHandler from './components/app/HomeHandler';
import AuthHandler from './components/auth/AuthHandler';
import ProfileHandler from './components/user/ProfileHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

import DashboardHandler from './components/app/DashboardHandler';
import ProjectsHandler from './components/employer/ProjectsHandler';
import EmployeesHandler from './components/employer/EmployeesHandler';

let routes = (
  <Route path='/' handler={AppHandler}>

    <DefaultRoute name='home' handler={HomeHandler} />
    <NotFoundRoute name='notfound' handler={NotFoundHandler} />

    <Route name='login' path='/login' handler={AuthHandler} />
    <Route name='join' path='/join' handler={AuthHandler} />
    <Route name='profile' path='/profile' handler={ProfileHandler} />

    <Route name='dashboard' path='/dashboard' handler={DashboardHandler}>
      {/* projects is named the same as dashboard so it defaults to it and activeClass is added to the link component */}
      <Route name='employer-projects' path='/dashboard' handler={ProjectsHandler} />
      <Route name='employer-employees' path='/dashboard/employees' handler={EmployeesHandler} />
      {/* redirects the user to the main dashboard tab (projects), when they access /projects */}
      <Redirect from='/projects' to='/dashboard'/>
    </Route>

  </Route>
);

export default routes;