const isClient = typeof window !== 'undefined' && Boolean(window.document);
const isDebugger = document.body.getElementsByTagName('footer').length === 1;

const RouteHelper = {

  // Checks if there's an availiable user session, if so, authenticate
  // and direct the user to their dashboard
  checkSession: (nextState, replaceState) => {
    replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
    // if (isClient && !isDebugger) {
    //   if (localStorage.jwt) {
    //     console.log('Client: Check Session')
    //     replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
    //   }
    // } else {

    //   debugger
    //   console.log('Server: Check Session')
    // }
  },

  requireAuth: () => {
    console.log('requireAuth hit')
  }

};

export default RouteHelper;