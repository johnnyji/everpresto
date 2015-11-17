// import StoreContainer from './../../server/store_container/StoreContainer';

// const isClient = typeof window !== 'undefined' && Boolean(window.document);
// // We know it's the debugger if there's a footer present, because there are no `footer`
// // elements in the actual app
// const isDebugger = document.body.getElementsByTagName('footer').length === 1;

// class RouteHelper {

//   /**
//    * Checks if the user has an existing session, if so redirects them to their dashboard
//    * otherwise, it'll just stay on the landing page
//    * 
//    * @param  {object} nextState - the next router state object (provided by React Router)
//    * @param  {function} replaceState - the function that executes to replace router state (provided by React Router)
//    * @param  {function} callback - a callback function to make the onEnter asynchronous
//    */
//   initialAuthCheck(nextState, replaceState, callback) {

//     if (isClient && !isDebugger) {
//       debugger
//       // IS CLIENT
//       const store = window.__INITIAL_STORE_STATE__;

//       if (store.auth.has('currentUser')) {
//         replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
//         callback();
//       } else {
//         callback();
//       }
//     } else {
//       debugger
//       // IS SERVER
//       const store = StoreContainer.getStore();

//       if (store.auth.has('currentUser')) {
//         replaceState({nextPathname: nextState.location.pathname}, '/dashboard');
//         callback();
//       } else {
//         callback(); 
//       }
//     }
//   }

//   /**
//    * Authorizes the current user, if unable to, will redirect the user to the login screen
//    * 
//    * @param  {object} nextState - the next router state object (provided by React Router)
//    * @param  {function} replaceState - the function that executes to replace router state (provided by React Router)
//    */
//   requireAuth(nextState, replaceState, callback) {

//     if (isClient && !isDebugger) {
//       debugger
//       // IS CLIENT
//       const state = window.__INITIAL_STORE_STATE__;
//       if (store.auth.has('currentUser')) {
//         callback();
//       } else {
//         // Because we're running an asynchronous call, we must invoke the callback in order
//         // to declare our call has completed, only then can router perform it's `replaceState`
//         replaceState({nextPathname: nextState.location.pathname}, '/login');
//         callback();
//       }
//     } else {
//       debugger
//       // IS SERVER
//       const store = StoreContainer.getStore();
//       if (store.auth.has('currentUser')) {
//         callback();
//       } else {
//         replaceState({nextPathname: nextState.location.pathname}, '/login');
//         callback();
//       }
//     }
//   }

// }

// export default new RouteHelper;