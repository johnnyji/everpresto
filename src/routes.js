import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import AppHandler from './components/app/AppHandler';
import TimesheetHandler from './components/timesheet/TimesheetHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

let routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute handler={TimesheetHandler} />
    <NotFoundRoute handler={NotFoundHandler} />
  </Route>
);

export default routes;
