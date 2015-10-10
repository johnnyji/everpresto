import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';

import AppHandler from './components/app/AppHandler';
import HomeHandler from './components/app/HomeHandler';
import AuthHandler from './components/auth/AuthHandler';
import ProfileHandler from './components/user/ProfileHandler';
import ContactsHandler from './components/contacts/ContactsHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';

import DashboardHandler from './components/app/DashboardHandler';
import GroupsHandler from './components/groups/GroupsHandler';
import NotesHandler from './components/notes/NotesHandler';

const routes = (
  <Route path='/' handler={AppHandler}>
    <Redirect from='/groups' to='/dashboard'/>
    <Redirect from='/notes' to='/dashboard/notes'/>
    <Redirect from='/contacts' to='/dashboard/contacts'/>

    <DefaultRoute name='home' handler={HomeHandler} />
    <NotFoundRoute name='notfound' handler={NotFoundHandler} />

    <Route name='login' path='/login' handler={AuthHandler} />
    <Route name='join' path='/join' handler={AuthHandler} />
    <Route name='profile' path='/profile' handler={ProfileHandler} />


    <Route name='dashboard' path='/dashboard' handler={DashboardHandler}>
      {/* Redirects from '/dashboard/groups' to 'dashboard' */}
      <Redirect from='/groups' to='/dashboard' />

      {/* groups is named the same as dashboard so it defaults to it and 
      activeClass is added to the link component */}
      <Route name='groups' path='/dashboard' handler={GroupsHandler} />
      <Route name='notes' path='/dashboard/notes' handler={NotesHandler} />
      <Route name='contacts' path='/dashboard/contacts' handler={ContactsHandler} />
    </Route>

  </Route>
);

export default routes;