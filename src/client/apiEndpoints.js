const formApiPath = (path, method) => {
  return {
    path: `/api${path}`,
    method: method
  };
}

let apiEndpoints = {
  currentUser: {
    show: formApiPath('/auth/currentUser', 'POST'),
  },
  users: {
    create: formApiPath('/auth/register', 'POST'),
    login: formApiPath('/auth/login', 'POST'),
    authenticateWithToken: formApiPath('/auth/authenticate_with_token', 'POST'),
  },
  notes: {
    create: formApiPath('/notes', 'POST'),
  },
  projects: {
    collection: formApiPath('/projects', 'GET'),
  },
  timesheets: {
    create: formApiPath('/timesheets', 'POST'),
    collection: formApiPath('/timesheets', 'GET'),
    delete: formApiPath('/timesheets', 'DELETE'),
  },
};

export default apiEndpoints;