import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '.././client/routes';
import config from '.././config';

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('*', (req, res) => {
  let scriptPath;
  let stylePath;

  if (process.env.NODE_ENV === 'production') {
    // scriptPath = 
  } else {
    scriptPath = `http://localhost:${config.webpackPort}/build/bundle.js`;
    stylePath = `http://localhost:${config.webpackPort}/build/style.css`;
  }

  Router.run(routes, req.url, Handler => {
    let content = React.renderToString(<Handler />);
    res.render({ 
      stylePath: stylePath,
      scriptPath: scriptPath,
      content: content
    });
  });
});

let server = app.listen(config.serverPort, () => {
  console.log('App is live and running at http://localhost:', config.serverPort);
});