const formApiPath = (path, method) => {
  return {
    path: `/api${path}`,
    method: method
  };
}

const apiEndpoints = {
  currentUser: {
    show: formApiPath('/user/currentUser', 'POST'),
  },
  templates: {
    index: formApiPath('/template/index', 'GET'),
    create: formApiPath('/template/create', 'POST'),
    delete: formApiPath('/template/delete', 'POST')
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    login: formApiPath('/auth/login', 'POST'),
    logout: formApiPath('/auth/logout', 'GET'),
    authenticateFromSession: formApiPath('/auth/authenticate_from_session', 'GET'),
    authenticateFromToken: formApiPath('/auth/authenticate_from_token', 'POST')
  }
};

export default apiEndpoints;