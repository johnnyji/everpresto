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
import AuthStore from './stores/AuthStore';

const routes = (
  <Router history={createBrowserHistory()}>
    <Route component={AppHandler} path='/'>
      <Redirect from='/groups' to='/dashboard'/>
      <Redirect from='/notes' to='/dashboard/notes'/>
      <Redirect from='/contacts' to='/dashboard/contacts'/>

      <IndexRoute component={LandingPageHandler} />

      <Route component={AuthHandler} path='/login' />
      <Route component={AuthHandler} path='/join' />


      {/* PROTECTED ROUTES: Requires an authenticated user to access */}

      <Route path='/profile' component={ProfileHandler} onEnter={AuthHelper.authenticateUser}/>

      <Route path='/dashboard' component={DashboardHandler} onEnter={AuthHelper.authenticateUser}>
        {/* Redirects from '/dashboard/groups' to 'dashboard' */}
        <Redirect from='/groups' to='/dashboard' />

        {/* groups is named the same as dashboard so it defaults to it and 
        activeClass is added to the link component */}
        <Route path='/dashboard' component={GroupsHandler} />
        <Route path='/dashboard/notes' component={NotesHandler} />
        <Route path='/dashboard/contacts' component={ContactsHandler} />
      </Route>

      {/*Route for Not Found page.*/}
      <Route component={NotFoundHandler} path='*' />
    </Route>
  </Router>
);

export default routes;