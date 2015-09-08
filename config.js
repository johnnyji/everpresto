var developmentDbName = 'tickit_development';

var config = {
  apiUrlPrefix: '/api',
  tokenSecret: 'spiceGuitar',
  sessionSecret: 'spiceSession',
  development: {
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: 'mongodb://localhost/' + developmentDbName
  }
};

module.exports = config;