import express from 'express';
import bodyParser from 'body-parser';
import config from '../.././config';

import React from 'react';
import Router from 'react-router';
import clientRoutes from '.././client/routes';
import AppFooter from '.././client/components/app/AppFooter';

import rootRoutes from './routes/rootRoutes';

const app = express();
const router = express.Router();

// sets the view engine to jade and views to be in the views directory
app.set('views', './views');
app.set('view engine', 'jade');

// parse data from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// prefixes all routes call to the server with /api
app.use('/api', router);

// routes
router.use('/', rootRoutes);

let server = app.listen(config.development.serverPort, () => {
  console.log('App is live and running at http://localhost:', config.development.serverPort);
});