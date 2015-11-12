import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../.././config';
import secrets from '../.././secrets.json';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import clientRoutes from '.././client/routes';

import Provider from '.././client/components/app/Provider';
import NotFoundHandler from '.././client/components/shared/NotFoundHandler';


import User from './models/user';
import './models/course';

import rootRoute from './routes/rootRoute';
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';

import requireUser from './middlewares/requireUser';

const app = express();
const MongoStore = connectMongo(session); // mongo store for session
const port = process.env.PORT || config.development.serverPort;
const apiRouter = express.Router();

// connect to db
mongoose.connection.on('open', (ref) => console.log('Connected to Mongo server...'));
mongoose.connection.on('error', (err) => console.log('Mongo Server connection error: ', err));
mongoose.connect(config.development.dbConnectUrl, (err) => {
  if (err) { throw err; }
});

// sets the view engine to jade and views to be in the views directory
app.set('views', './views');
app.set('view engine', 'jade');

// log requests to the console
app.use(morgan('dev'));

// parse data from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parses cookies and uses sessions
app.use(cookieParser());

// Uses MongoDB as a store for sessions so they can persist
app.use(session({ 
  secret: secrets.sessionSecret,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false
}));


// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', rootRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/user', requireUser, userRoute);


// Server-side rendering.
app.use((req, res) => {
  const scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  const stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;
  delete req.session.userId;
  // Renders the router routes dependant on the request
  match({routes: clientRoutes, location: req.url}, (err, redirectLocation, renderProps) => {

    console.log('Beginning server render with `userId` session: ', req.session.userId);
    
    if (err) {
      // Handle server error
      // TODO: Have the response render a custom server error component to display
      // a user friendly message.
      res.send(500, err.message);
    } else if (redirectLocation) {

      // Handle route redirection
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (renderProps) {
      // Handle route rendering

      // render the response without a current user
      if (!req.session.userId) {
        return res.render('index', {
          content: renderToString(<Provider><RoutingContext {...renderProps}/></Provider>),
          scriptPath,
          stylePath
        })
      }

      // Tries to find the current user from the existing session. If successful
      // it will render the app with the current user, otherwise it will redirect
      const currentUser = User.findFromSession(req.session.userId)
        .then(user => {
          console.log('user found')
          // If we find a user that matches the one in session, we render the route with the current user in mind
          res.render('index', {
            content: renderToString(
              <Provider currentUser={user.toObject()}>
                <RoutingContext {...renderProps}/>
              </Provider>
            ),
            scriptPath,
            stylePath
          });
        })
        .catch(err => {
          console.log('no user found: ', req.session.userId)
          // If the user could not be found, we render the route as if they are not signed in'
          res.render('index', {
            content: renderToString(<Provider><RoutingContext {...renderProps}/></Provider>),
            scriptPath,
            stylePath
          });
        });

    } else {

      // Handle route not found
      res.send('index', {
        content: renderToString(<NotFoundHandler />),
        scriptPath,
        stylePath
      });
      
    }
  });

});


// Runs our app server instance.
const server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});