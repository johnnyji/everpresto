import React, {Component, PropTypes} from 'react';
import Button from '.././ui/Button';

const displayName = 'TemplatesIndex';

export default class TemplatesIndex extends Component {

  static displayName = displayName;

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Button color='green' icon='add' onClick={this._handleNewTemplate} text='New Template' />
      </div>
    );
  }

  _handleNewTemplate = () => {
    this.context.history.pushState(null, '/dashboard/templates/new');
  }

}
