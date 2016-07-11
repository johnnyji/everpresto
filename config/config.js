var developmentDbName = 'tickit_development';

var config = {
  apiUrlPrefix: '/api',
  s3BucketPath: 'https://s3-us-west-2.amazonaws.com/tickit-app',
  development: {
    baseUrl: 'http://localhost:3000',
    hostname: 'localhost',
    webpackPort: 8080,
    serverPort: 3000,
    dbPort: 27017,
    dbName: developmentDbName,
    dbConnectUrl: `mongodb://localhost/${developmentDbName}`
  },
  production: {
    baseUrl: 'http://everpresto.com'
  },
  mailer: {
    document: {
      fromEmail: 'johnny@everpresto.com'
    }
  },
  socket: {
    collections: 'http://localhost:3000/collections',
    documents: 'http://localhost:3000/documents'
  }
};

module.exports = config;
