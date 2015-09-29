import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././shared/Icon';

export default class GroupsListViewItem extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        <Icon icon='notifications' />
      </li>
    );
  }
}

GroupsListViewItem.propTypes = {
  group: React.PropTypes.object.isRequired
};