const formApiPath = (path, method) => ({
  path: `/api${path}`,
  method
});

export default {
  collections: {
    create: formApiPath('/collections/create', 'POST'),
    delete: formApiPath('/collections/delete', 'POST'),
    index: formApiPath('/collections/index', 'GET'),
    show: (id) => formApiPath(`/collections/${id}`, 'GET'),
    update: formApiPath('/collections/update', 'POST')
  },
  currentUser: {
    show: formApiPath('/users/current_user', 'POST')
  },
  documents: {
    index: formApiPath('/documents/index', 'GET'),
    create: formApiPath('/documents/create', 'POST'),
    signatureLink: (id, signatureToken) => formApiPath(`/documents/${id}/sign/${signatureToken}`, 'GET')
  },
  templates: {
    create: formApiPath('/templates/create', 'POST'),
    delete: formApiPath('/templates/delete', 'POST'),
    index: formApiPath('/templates/index', 'GET'),
    show: (id) => formApiPath(`/templates/${id}`, 'GET'),
    update: formApiPath('/templates/update', 'POST')
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    createWithCompany: formApiPath('/auth/register_with_company', 'POST'),
    login: formApiPath('/auth/login', 'POST'),
    logout: formApiPath('/auth/logout', 'GET')
  }
};
