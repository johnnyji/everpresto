import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import AppHandler from './components/app/AppHandler';
import HomeHandler from './components/app/HomeHandler';
import LoginHandler from './components/auth/LoginHandler';
import RegistrationHandler from './components/auth/RegistrationHandler';
import TimesheetHandler from './components/timesheet/TimesheetHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

let routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute handler={HomeHandler} />
    <Route name='login' path='/login' handler={LoginHandler} />
    <Route name='join' path='/join' handler={RegistrationHandler} />
    <Route name='timesheets' path='/timesheets' handler={TimesheetHandler} />
    <NotFoundRoute handler={NotFoundHandler} />
  </Route>
);

export default routes;
