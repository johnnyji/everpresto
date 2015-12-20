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
  template: {
    create: formApiPath('/templates/create', 'POST')
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