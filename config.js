var developmentDbName = 'tickit_development';

var config = {
  apiUrlPrefix: '/api',
  development: {
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: 'mongodb://localhost/' + developmentDbName,
    
  }
};

module.exports = config;