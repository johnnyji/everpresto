var developmentDbName = 'tickit_development';

var config = {
  apiUrlPrefix: '/api',
  s3BucketPath: 'https://s3-us-west-2.amazonaws.com/tickit-app',
  development: {
    hostname: 'localhost',
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: 'mongodb://localhost/' + developmentDbName
  },
  mailer: {
    document: {
      fromEmail: 'johnny@everpresto.com'
    }
  }
};

module.exports = config;
