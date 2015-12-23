import React, {Component, PropTypes} from 'react';

const displayName = 'TemplatesView';

export default class TemplatesView extends Component {

  static displayName = displayName;

  render() {
    return this.props.children;
  }

}