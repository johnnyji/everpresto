import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../.././config';

import React from 'react';
import Router from 'react-router';
import clientRoutes from '.././client/routes';
import AppFooter from '.././client/components/app/AppFooter';

import User from './models/user';

import rootRoute from './routes/rootRoute';
import authRoute from './routes/authRoute';
import timesheetsRoute from './routes/timesheetsRoute';
import projectsRoute from './routes/projectsRoute';
import notesRoute from './routes/notesRoute';

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

// parses cookies
app.use(cookieParser());

// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', rootRoute);
apiRouter.use('/auth', authRoute);
apiRouter.use('/timesheets', timesheetsRoute);
apiRouter.use('/projects', projectsRoute);
apiRouter.use('/notes', notesRoute);

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
      let footerContent = React.renderToString(<AppFooter />);

      res.render('index', {
        stylePath: stylePath,
        scriptPath: scriptPath,
        content: content,
        footerContent: footerContent
      });
    });
});

let server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});
