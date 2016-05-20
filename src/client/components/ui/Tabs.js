import React, {Component} from 'react';
import pureRender from 'pure-render-decorator';
import {Tabs} from 'material-ui/Tabs';

const displayName = 'ui-Tabs';

@pureRender
export default class EverprestoTabs extends Component {

  static displayName = displayName;

  render() {
    return (
      <Tabs tabItemContainerStyle={{backgroundColor: 'transparent'}}>
        {this.props.children}
      </Tabs>
    );
  }
}
