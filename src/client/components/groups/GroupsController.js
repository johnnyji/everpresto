import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

export default class GroupsController extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='groups-controller-wrapper'>
        This is a list of all the groups
      </div>
    );
  }
}
