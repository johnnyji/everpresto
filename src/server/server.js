// SERVER
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// REACT/ROUTER
import React from 'react';
import Immutable from 'immutable';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import clientRoutes from './../client/routes/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import NotFoundHandler from './../client/components/shared/NotFoundHandler';

// REDUX
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './../client/store/configureStore';

// MODELS, TODO: Right now they MUST be declared in dependant order... This is fucking awful.
import './models/Template';
import './models/Document';
import User from './models/User';
import './models/Collection';
import './models/Company';

// API ROUTES
import AuthRoutes from './routes/AuthRoutes';
import CollectionRoutes from './routes/CollectionRoutes';
import TemplateRoutes from './routes/TemplateRoutes';
import UserRoutes from './routes/UserRoutes';

// MIDDLEWARE
import requireUser from './middlewares/requireUser';

// CONFIG
import config from '../.././config';
import secrets from '../.././secrets.json';


const app = express();
const MongoStore = connectMongo(session); // mongo store for session
const port = process.env.PORT || config.development.serverPort;
const apiRouter = express.Router();

// Connecting to the DB
mongoose.connection.on('open', (ref) => console.log('Connected to Mongo server...'));
mongoose.connection.on('error', (err) => console.log('Mongo server connection error: ', err));
mongoose.connect(config.development.dbConnectUrl, (err) => {
  if (err) { throw err; }
});

// TODO: Remove, no longer using
// sets the view engine to jade and views to be in the views directory
// app.set('views', './views');
// app.set('view engine', 'jade');

// log requests to the console
app.use(morgan('dev'));

// parse data from POST request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// parses cookies and uses sessions
app.use(cookieParser());

// Uses MongoDB as a store for sessions so they can persist
app.use(session({ 
  secret: secrets.sessionSecret,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}));


// Prefixes API routes with `/api`
app.use('/api', apiRouter);

// Declare API routes with middleware
apiRouter.use('/auth', AuthRoutes);
apiRouter.use('/collections', requireUser, CollectionRoutes);
apiRouter.use('/templates', requireUser, TemplateRoutes);
apiRouter.use('/users', requireUser, UserRoutes);


// Server-side rendering
app.use((req, res) => {
  const scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  const stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;

  // Renders the router routes dependant on the request
  match({routes: clientRoutes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      // Handle server error
      // TODO: Have the response render a custom server error component to display a user friendly message.
      res.status(500).end('Internal Server Error :(');
    } else if (redirectLocation) {
      // Handle route redirection
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Handle route rendering
      let initialState;
      // Goes through the flow of loading the initial app state
      User.findWithCompany(req.session.userId)
        .then((response) => {
          const {company, user} = response;
          initialState = {
            auth: Immutable.fromJS({company, user})
          };
        })
        .catch(() => {
          initialState = {
            auth: Immutable.Map({company: null, user: null})
          };
        })
        .finally(() => {
          const store = configureStore(initialState);

          // Grabs the latest updated state from the store and sets it on the window so
          // the client side and hydrate it's store with the same state
          const hydrateInitialClientState = `
            <script type='application/javascript'>
              window.__INITIAL_STORE_STATE__ = ${JSON.stringify(store.getState())}
            </script>
          `;
          const componentToRender = renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          );

          // Ends the response by sending the HTML string to the browser to render
          res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta author="Johnny Ji">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Tickit</title>
                <link rel="stylesheet" type="text/css" href="${stylePath}" />
                ${hydrateInitialClientState}
              </head>
              <body>
                <div id="app">${componentToRender}</div>
                <script type="application/javascript" src="${scriptPath}"></script>
              </body>
            </html>
          `);
        });
    } else {
      // Handle route not found
      res.status(404).end(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta author="Johnny Ji">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Tickit</title>
            <link rel="stylesheet" type="text/css" href="${stylePath}" />
          </head>
          <body>
            <div id="app">${renderToString(<NotFoundHandler />)}</div>
            <script type="application/javascript" src="${scriptPath}"></script>
          </body>
        </html>
      `);
    }
  });

});


// Runs our app server instance.
const server = app.listen(port, () => {
  console.log('App is live and running at http://localhost:', port);
});