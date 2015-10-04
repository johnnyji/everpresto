import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../.././config';
import secrets from '../.././secrets.json';

import React from 'react';
import Router from 'react-router';
import clientRoutes from '.././client/routes';

import rootRoute from './routes/rootRoute';
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import notesRoute from './routes/notesRoute';
import groupsRoute from './routes/groupsRoute';

import requireUser from './middlewares/requireUser';

const app = express();
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
app.use(session({ secret: secrets.sessionSecret }));

// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', rootRoute);
apiRouter.use('/groups', requireUser, groupsRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/user', requireUser, userRoute);
apiRouter.use('/notes', requireUser, notesRoute);

// react isomorphic render
app.use((req, res) => {
  let scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  let stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;

  let router = Router.create({
    routes: clientRoutes,
    location: req.url,
    // onAbort allows for react-router to do server side transitions in willTransitionTo
    onAbort: (options) => {
      let destination = options.to || '/';
      res.redirect(302, destination);
      console.log('Redirecting to: ', destination);
    }
  });

    router.run((Handler, state) => {
      let content = React.renderToString(<Handler />);

      res.render('index', {
        stylePath: stylePath,
        scriptPath: scriptPath,
        content: content
      });
    });
});

let server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});
