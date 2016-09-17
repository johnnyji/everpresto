/* eslint-disable no-console */
// Import polyfill at the start of application
import 'babel-polyfill';

// SERVER
import express from 'express';
import http from 'http';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import renderPage from './renderPage';

// REACT/ROUTER
import React from 'react';
import {fromJS, Map} from 'immutable';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import clientRoutes from './../client/routes';
import NotFound from './../client/views/NotFound';

// REDUX
import {Provider} from 'react-redux';
import configureStore from './../client/store/configureStore';

// MODELS
import './models/Collection';
import './models/Company';
import './models/Document';
import './models/Template';
import User from './models/User';

// API ROUTES
import AuthRoutes from './routes/AuthRoutes';
import CollectionRoutes from './routes/CollectionRoutes';
import DocumentRoutes from './routes/DocumentRoutes';
import DocumentSigningRoutes from './routes/DocumentSigningRoutes';
import TemplateRoutes from './routes/TemplateRoutes';
import UserRoutes from './routes/UserRoutes';

// MIDDLEWARE
import allowCredentials from './middlewares/allowCredentials';
import requireUser from './middlewares/requireUser';

// CONFIG
import config from '../.././config/config';
import secrets from '../.././secrets.json';

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const MongoStore = connectMongo(session); // mongo store for session
const port = process.env.PORT || config.development.serverPort;
const apiRouter = express.Router();

// Connecting to the DB
mongoose.Promise = require('bluebird');
mongoose.connection.on('open', () => {
  console.info('Connected to Mongo server...');
});
mongoose.connection.on('error', (err) => {
  console.info('Mongo server connection error: ', err);
});
mongoose.connect(config.development.dbConnectUrl, (err) => {
  if (err) throw err;
});

// Logs requests to the console.
app.use(morgan('dev'));

// Parses data from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Parses cookies
app.use(cookieParser());

// Uses MongoDB as a store for sessions so they can persist
app.use(session({
  cookie: {
    httpOnly: false,
    maxAge: null
  },
  secret: secrets.sessionSecret,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}));


// Moves `io` action declarations into seperate files.
let configuredSocket = io;
configuredSocket = require('./sockets/collections')(configuredSocket);
configuredSocket = require('./sockets/documents')(configuredSocket);

// Set `io` in the app instance
app.set('io', configuredSocket);


// Prefixes API routes with `/api`
app.use('/api', apiRouter);

// Declare API routes with middleware
apiRouter.use('/auth', allowCredentials, AuthRoutes);
apiRouter.use('/collections', allowCredentials, requireUser, CollectionRoutes);
apiRouter.use('/sign_document', allowCredentials, DocumentSigningRoutes);
apiRouter.use('/documents', allowCredentials, requireUser, DocumentRoutes);
apiRouter.use('/templates', allowCredentials, requireUser, TemplateRoutes);
apiRouter.use('/users', allowCredentials, requireUser, UserRoutes);


// Server-side rendering
app.use((req, res) => {
  // TODO: Add conditional for development/production
  const scriptPath = `http://localhost:${config.development.webpackPort}/build/bundle.js`;
  const stylePath = `http://localhost:${config.development.webpackPort}/build/style.css`;
  let initialState = {auth: Map({company: null, user: null})};

  // Renders the router routes dependant on the request
  match({routes: clientRoutes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      // TODO: Have the response render a custom server error component to display a user friendly message.
      res.status(500).end('Internal Server Error :(');
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Goes through the flow of loading the initial app state
      User.findWithCompany(req.session.userId)
        .then(({company, user}) => {
          // When the client side `fetch`es for the current user, the internal
          // `_id` and `_company` fields are automatically convrted to `id` and
          // `company` ID strings respectively. However when we first hydrate the
          // client side store, we don't have the automatic conversion, which is why
          // we must do it ourselves here.
          const {_id: userObjId, _company: companyObjId} = user;
          delete user._id;
          delete user._company;
          
          initialState = {
            auth: fromJS({
              company,
              user: Object.assign({}, user, {
                id: userObjId.toString(),
                company: companyObjId.toString()
              })
            })
          };
        })
        .catch((err) => {
          if (err) console.error(err);
        })
        .finally(() => {
          const store = configureStore(initialState);
          const state = `
            <script type='application/javascript'>
              window.__INITIAL_STORE_STATE__ = ${JSON.stringify(store.getState())}
            </script>
          `;
          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          // Ends the response by sending the HTML string to the browser to render
          res.end(renderPage({
            content,
            initialState: state,
            scriptPath,
            stylePath
          }));
        });
    } else {
      res.status(404).end(renderPage({
        content: renderToString(<NotFound />),
        scriptPath,
        stylePath
      }));
    }
  });

});


// Runs our app server instance.
server.listen(port, () => {
  console.info('Live and running at http://localhost:', port);
});
/* eslint-enable no-console */
