var developmentDbName = 'tickit_development';

var config = {
  apiUrlPrefix: '/api',
  s3BucketPath: 'https://s3-us-west-2.amazonaws.com/tickit-app',
  development: {
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: 'mongodb://localhost/' + developmentDbName
  }
};

module.exports = config;