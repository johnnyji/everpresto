import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import AppHandler from './components/app/AppHandler';
import HomeHandler from './components/app/HomeHandler';
import AuthHandler from './components/auth/AuthHandler';
import ProfileHandler from './components/user/ProfileHandler';
import DashboardHandler from './components/app/DashboardHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

let routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute name='home' handler={HomeHandler} />
    <Route name='dashboard' path='/dashboard' handler={DashboardHandler} />
    <Route name='login' path='/login' handler={AuthHandler} />
    <Route name='join' path='/join' handler={AuthHandler} />
    <Route name='profile' path='/profile' handler={ProfileHandler} />
    <NotFoundRoute name='notfound' handler={NotFoundHandler} />
  </Route>
);

export default routes;