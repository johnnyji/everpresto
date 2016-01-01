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
  currentUser: {
    show: formApiPath('/users/current_user', 'POST'),
  },
  templates: {
    create: formApiPath('/templates/create', 'POST'),
    delete: formApiPath('/templates/delete', 'POST'),
    index: formApiPath('/templates/index', 'GET'),
    show: (id) => formApiPath(`/templates/show/${id}`, 'GET'),
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