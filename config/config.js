var developmentDbName = 'tickit_development';
var baseUrl = process.env.NODE_ENV === 'production' ?
  'http://everpresto.com' :
  'http://localhost:3000';

module.exports = {
  apiUrlPrefix: '/api',
  baseUrl,
  s3BucketPath: 'https://s3-us-west-2.amazonaws.com/tickit-app',
  development: {
    hostname: 'localhost',
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: `mongodb://localhost/${developmentDbName}`
  },
  production: {
  },
  mailer: {
    document: {
      fromEmail: 'johnny@everpresto.com'
    }
  }
};
