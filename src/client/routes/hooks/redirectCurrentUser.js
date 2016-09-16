// If there's a current user session, redirect them to their dashboard

export default (state) => (location, replace) => {
  if (state.auth.get('user')) {
    replace('/dashboard/collections');
  }
};
