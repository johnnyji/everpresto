export default (state) => (location, replace) => {
  debugger;
  if (!state.auth.get('user')) {
    replace('/login');
  }
}
