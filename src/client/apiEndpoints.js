let formApiPath = (path, method) => {
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
  },
  timesheets: {
    create: formApiPath('/timesheets', 'POST'),
    collection: formApiPath('/timesheets', 'GET'),
    delete: formApiPath('/timesheets', 'DELETE')
  },
};

export default apiEndpoints;