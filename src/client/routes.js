import React from 'react';
import Router, {Route, IndexRoute, Redirect} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import AppHandler from './components/app/AppHandler';
import AuthHandler from './components/auth/AuthHandler';
// import ContactsHandler from './components/contacts/ContactsHandler';
import DashboardHandler from './components/dashboard/DashboardHandler';
  import StudentDashboard from './components/student/StudentDashboard';
  import TeacherDashboard from './components/teacher/TeacherDashboard';
// import GroupsHandler from './components/groups/GroupsHandler';
import LandingPageHandler from './components/app/LandingPageHandler';
// import NotesHandler from './components/notes/NotesHandler';
import NotFoundHandler from './components/shared/NotFoundHandler';
import ProfileHandler from './components/user/ProfileHandler';

import AuthHelper from './utils/AuthHelper';
import RouteHelper from './utils/RouteHelper';


const routes = (
  <Router history={createBrowserHistory()}>
    <Route component={AppHandler} path='/'>
      <IndexRoute component={LandingPageHandler} onEnter={RouteHelper.initialAuthCheck}/>

      <Route component={AuthHandler} path='/login'/>
      <Route component={AuthHandler} path='/join'/>


      {/* PROTECTED ROUTES: Requires an authenticated user to access */}

      <Route path='/profile' component={ProfileHandler} onEnter={RouteHelper.requireAuth}/>

      <Route path='/dashboard' component={DashboardHandler} onEnter={RouteHelper.requireAuth}>
        {/* The student dashboard is the default one we arrive on */}
        <IndexRoute component={StudentDashboard} />

        <Route path='/dashboard/student' component={StudentDashboard}/>
        <Route path='/dashboard/teacher' component={TeacherDashboard}/>
      </Route>

      {/*Route for Not Found page.*/}
      <Route component={NotFoundHandler} path='*' />

      {/* Redirect paths will go under here if necessary */}
      {/* ... */}
    </Route>
  </Router>
);

export default routes;