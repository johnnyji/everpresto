import React from 'react';

export default class ReactTemplate extends React.Component {
  // use in constructor to bind the react component itself (this) to component functions
  _bindFunctions(...funcs) {
    funcs.forEach((func) => { this[func] = this[func].bind(this) });
  }
  _protectComponent() {
    // redirects the user to default route if unauthorized
    let isDefaultRoute = this.context.router.getCurrentPathname() === '/';
    if (!this.props.currentUser && !isDefaultRoute) {
      return this.context.router.transitionTo('home');
    }
  }
}

ReactTemplate.contextTypes ={
  router: React.PropTypes.func
};