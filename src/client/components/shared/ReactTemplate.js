import React from 'react';

export default class ReactTemplate extends React.Component {
  // use in constructor to bind the react component itself (this) to component functions
  _bindFunctions(...funcs) {
    funcs.forEach((func) => { this[func] = this[func].bind(this) });
  }
  
}