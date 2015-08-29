import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import config from '../.././config';

import React from 'react';
import Router from 'react-router';
import clientRoutes from '.././client/routes';
import AppFooter from '.././client/components/app/AppFooter';

import User from './models/user';

import rootRoute from './routes/rootRoute';
import authRoute from './routes/authRoute';
import timesheetsRoute from './routes/timesheetsRoute';

const app = express();
const port = process.env.PORT || config.development.serverPort;
const apiRouter = express.Router();
const LocalStrategy = passportLocal.Strategy();

// connect to db
mongoose.connect(config.development.dbConnectUrl, err => {
  if (err) { throw err; }
});

// sets the view engine to jade and views to be in the views directory
app.set('views', './views');
app.set('view engine', 'jade');

// sets token secret variable
app.set('tokenSecret', config.webTokenSecret);

// log requests to the console
app.use(morgan('dev'));

// parse data from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parses cookies
app.use(cookieParser());

// sets sessions
app.use(session({
  secret: 'express session secret',
  resave: true,
  saveUninitalize: false // doesn't both with unauthenticated users
}));

// initializes passport, and configures it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// passport config 
passport.use(new LocalStrategy(User.createStrategy()); // static methods provided by passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', rootRoute);
apiRouter.use('/auth', authRoute);
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

let server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});