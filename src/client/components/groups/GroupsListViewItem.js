import React from 'react';
import Icon from '.././ui/Icon';

export default class GroupsListViewItem extends React.Component {
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