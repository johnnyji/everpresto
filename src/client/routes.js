import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import AppHandler from './components/app/AppHandler';
import HomeHandler from './components/app/HomeHandler';
import AuthHandler from './components/auth/AuthHandler';
import TimesheetHandler from './components/timesheet/TimesheetHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

let routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute name='home' handler={HomeHandler} />
    <Route name='login' path='/login' handler={AuthHandler} />
    <Route name='join' path='/join' handler={AuthHandler} />
    <Route name='timesheets' path='/timesheets' handler={TimesheetHandler} />
    <NotFoundRoute name='notfound' handler={NotFoundHandler} />
  </Route>
);

export default routes;
