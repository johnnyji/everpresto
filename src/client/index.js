import './scss/style.scss'; //imports the styles
import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router';

import RouterContainer from './utils/RouterContainer';
import routes from './routes';
import AuthHelper from './utils/AuthHelper';
import AppStore from './stores/AppStore';

import Provider from './components/app/Provider';

// sets the router instance in the RouterContainer, so the routes can be accessed by util classes and Reflux
RouterContainer.set(routes);

const currentUser = AppStore.getCurrentUser();
const mountElement = document.getElementById('app');

if (currentUser) {

  render(<Provider currentUser={currentUser}>{routes}</Provider>, mountElement);

} else {
  // If the currentUser is not yet in our Flux store, we'll need to query the app for one.
  const jwt = localStorage.getItem('jwt');

  if (!Boolean(jwt)) {
    // There isn't a JWT, therefore there's no saved user session and we just render the app without a user
    render(<Provider>{routes}</Provider>, mountElement);
  } else {
    AuthHelper.authenticateFromToken(jwt)
      .then(response => {
        console.log('Client: User from AJAX');
        // We found and authenticated a user based on the JWT, the app will now be rendered with
        // this user as the current user.
        render(<Provider currentUser={response.data.user}>{routes}</Provider>, mountElement);
      })
      .catch(response => {
        // TODO: This is failing right after .then is called, and the error is:
        // `history.listen is not a function`
        console.log('TODO: Catch error in Index.js')
        // The user could not be found, therefore we render without a user
        render(<Provider>{routes}</Provider>, mountElement);      
      });   
  }
  
}