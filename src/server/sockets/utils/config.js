import config from '../../../../config/config';

export default {
  paths: {
    client: {
      collections: `${config.baseUrl}/collections`,
      documents: `${config.baseUrl}/documents`
    },
    server: {
      collections: '/collections',
      documents: '/documents'
    }
  }
};