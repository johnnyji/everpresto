import React, {Component, PropTypes} from 'react';

const CLS = 'Admin';

export default class Admin extends Component {

  static displayName = CLS;
  
  static propTypes = {};
  
  render() {
    return (
      <div className={CLS}>
        Welcome to the admin view!
      </div>
    );
  }

}
