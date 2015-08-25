import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '.././client/routes';
import config from '.././config';

import AppFooter from '.././client/components/app/AppFooter';

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('*', (req, res) => {
  let scriptPath = `http://localhost:${config.webpackPort}/build/bundle.js`;
  let stylePath = `http://localhost:${config.webpackPort}/build/style.css`;

  Router.run(routes, req.url, Handler => {
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

let server = app.listen(config.serverPort, () => {
  console.log('App is live and running at http://localhost:', config.serverPort);
});