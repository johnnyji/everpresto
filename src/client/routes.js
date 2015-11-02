import React from 'react';
import Router, {Route, IndexRoute, Redirect} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import AppHandler from './components/app/AppHandler';
import AuthHandler from './components/auth/AuthHandler';
import ContactsHandler from './components/contacts/ContactsHandler';
import DashboardHandler from './components/app/DashboardHandler';
import GroupsHandler from './components/groups/GroupsHandler';
import LandingPageHandler from './components/app/LandingPageHandler';
import NotesHandler from './components/notes/NotesHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';
import ProfileHandler from './components/user/ProfileHandler';

import AuthHelper from './utils/AuthHelper';
import RouteHelper from './utils/RouteHelper';

import AuthStore from './stores/AuthStore';
import AppStore from './stores/AppStore';


const routes = (
  <Router history={createBrowserHistory()}>
    <Route component={AppHandler} path='/'>
      <IndexRoute component={LandingPageHandler} onEnter={RouteHelper.checkSession}/>

      <Route component={AuthHandler} path='/login'/>
      <Route component={AuthHandler} path='/join'/>


      {/* PROTECTED ROUTES: Requires an authenticated user to access */}

      <Route path='/profile' component={ProfileHandler} onEnter={RouteHelper.requireAuth}/>

      <Route path='/dashboard' component={DashboardHandler} onEnter={RouteHelper.requireAuth}>
        {/* Redirects from '/dashboard/groups' to 'dashboard' */}
        <Redirect from='/dashboard/groups' to='/dashboard' />

        {/* groups is named the same as dashboard so it defaults to it and 
        activeClass is added to the link component */}
        <IndexRoute component={GroupsHandler} onEnter={RouteHelper.requireAuth} />
        <Route path='/dashboard/notes' component={NotesHandler} onEnter={RouteHelper.requireAuth} />
        <Route path='/dashboard/contacts' component={ContactsHandler} onEnter={RouteHelper.requireAuth}/>
      </Route>

      {/*Route for Not Found page.*/}
      <Route component={NotFoundHandler} path='*' />

      <Redirect from='/dashboard/groups' to='/dashboard' />
      <Redirect from='/groups' to='/dashboard'/>
      <Redirect from='/notes' to='/dashboard/notes'/>
      <Redirect from='/contacts' to='/dashboard/contacts'/>
    </Route>
  </Router>
);

export default routes;