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

import NotFoundHandler from '.././client/components/shared/NotFoundHandler';

import './models/user';
import './models/group';
import './models/note';

import rootRoute from './routes/rootRoute';
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import notesRoute from './routes/notesRoute';
import groupsRoute from './routes/groupsRoute';

import requireUser from './middlewares/requireUser';

const app = express();
const MongoStore = connectMongo(session); // mongo store for session
const port = process.env.PORT || config.development.serverPort;
const apiRouter = express.Router();

// connect to db
mongoose.connect(config.development.dbConnectUrl, err => {
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
apiRouter.use('/groups', requireUser, groupsRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/user', requireUser, userRoute);
apiRouter.use('/notes', requireUser, notesRoute);


// Server-side rendering.
app.use((req, res) => {
  const scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  const stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;

  // Renders the router routes dependant on the request
  match({routes: clientRoutes, location: req.url}, (err, redirectLocation, renderProps) => {
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
      res.render('index', {
        content: renderToString(<RoutingContext {...renderProps}/>),
        scriptPath,
        stylePath
      });
    } else {
      // Hande route not found
      res.send('index', {
        content: renderToString(<NotFoundHandler />),
        scriptPath,
        stylePath
      });
    }
    
  });

  // // Renders the initial component to an HTML string.
  // const content = renderToString(clientRoutes);
  // // This sends our stringified HTML to our HTML file to render
  // res.render('index', {
  //   stylePath: stylePath,
  //   scriptPath: scriptPath,
  //   content: content
  // });

});

// Runs our app server instance.
const server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});
