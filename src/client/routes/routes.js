import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AppHandler from '.././components/app/AppHandler';
import AuthHandler from '.././components/auth/AuthHandler';
import LandingPageHandler from '.././components/app/LandingPageHandler';
import NotFoundHandler from '.././components/shared/NotFoundHandler';

import DashboardHandler from '.././components/dashboard/DashboardHandler';
  import StudentDashboard from '.././components/dashboard/StudentDashboard';
  import TeacherDashboard from '.././components/dashboard/TeacherDashboard';
    import CoursesView from '.././components/teacher/CoursesView';

import ProfileHandler from '.././components/user/ProfileHandler';

import requireAuth from './utils/requireAuth';


const routes = (
  <Route component={AppHandler} path='/'>
    <IndexRoute component={LandingPageHandler} />

    <Route component={AuthHandler} path='/login'/>
    <Route component={AuthHandler} path='/join'/>


    {/*********** PROTECTED ROUTES: Requires Auth ************/}
    <Route path='/profile' component={requireAuth(ProfileHandler)}/>

    <Route path='/dashboard' component={requireAuth(DashboardHandler)}>
      <IndexRoute component={TeacherDashboard} />
      <Route path='/dashboard/student' component={StudentDashboard}/>
      <Route path='/dashboard/teacher' component={TeacherDashboard}>
        <IndexRoute component={CoursesView} />
        <Route path='/dashboard/teacher/courses' component={CoursesView}/>
        <Route path='/dashboard/teacher/email_list' component={CoursesView}/>
        <Route path='/dashboard/teacher/email_history' component={CoursesView}/>
        <Route path='/dashboard/teacher/analytics' component={CoursesView}/>
        <Route path='/dashboard/teacher/profile' component={CoursesView}/>
      </Route>
    </Route>
    {/*********** PROTECTED ROUTES: Requires Auth ************/}


    {/*Route for Not Found page.*/}
    <Route component={NotFoundHandler} path='*' />

    {/* Redirect paths will go under here if necessary */}
    {/* ... */}
  </Route>
);

export default routes;