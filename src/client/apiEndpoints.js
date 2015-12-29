const formApiPath = (path, method) => ({
  path: `/api${path}`,
  method
});

const apiEndpoints = {
  collections: {
    index: formApiPath('/collections/index', 'GET'),
    create: formApiPath('/collections/create', 'POST'),
    delete: formApiPath('/collections/delete', 'POST'),
    update: formApiPath('/collections/update', 'POST')
  },
  company: {
    create: formApiPath('/company/create', 'POST')
  },
  currentUser: {
    show: formApiPath('/users/current_user', 'POST'),
  },
  templates: {
    index: formApiPath('/templates/index', 'GET'),
    create: formApiPath('/templates/create', 'POST'),
    delete: formApiPath('/templates/delete', 'POST'),
    update: formApiPath('/templates/update', 'POST')
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    createWithCompany: formApiPath('/auth/register_with_company', 'POST'),
    login: formApiPath('/auth/login', 'POST'),
    logout: formApiPath('/auth/logout', 'GET')
  }
};

export default apiEndpoints;