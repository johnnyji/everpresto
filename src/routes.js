import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import AppHandler from './components/app/AppHandler';
import TimesheetHandler from './components/timesheet/TimesheetHandler';

let routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute handler={TimesheetHandler} />
    <NotFoundRoute handler={TimesheetHandler} />
  </Route>
);

export default routes;
