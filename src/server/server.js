import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import config from '../.././config';

import React from 'react';
import Router from 'react-router';
import clientRoutes from '.././client/routes';
import AppFooter from '.././client/components/app/AppFooter';

import rootRoute from './routes/rootRoute';
import timesheetsRoute from './routes/timesheetsRoute';

const app = express();
const apiRouter = express.Router();
const LocalStrategy = passportLocal.Strategy();

// connect to db
mongoose.connect(config.development.dbConnectUrl, err => {
  if (err) { throw err; }
});

// sets the view engine to jade and views to be in the views directory
app.set('views', './views');
app.set('view engine', 'jade');

// parse data from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parses cookies
app.use(cookieParser());

// sets sessions and user auth with passport
app.use(session({
  secret: 'express session secret',
  resave: false,
  saveUninitalize: false
}));
app.use(passport.initialize());
app.use(passport.session());

// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', rootRoute);
apiRouter.use('/timesheets', timesheetsRoute);

// react isomorphic render
app.get('/*', (req, res) => {
  let scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  let stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;
  Router.run(clientRoutes, req.url, Handler => {
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

let server = app.listen(config.development.serverPort, () => {
  console.log('App is live and running at http://localhost:', config.development.serverPort);
});