import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';
import Button from '.././ui/Button';

const displayName = 'TemplatesIndex';

@connect((state) => ({
  templates: state.templates.get('templates'),
  wasEverFetched: state.templates.get('wasEverFetched')
}))
export default class TemplatesIndex extends Component {

  static displayName = displayName;
  
  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  static propTypes = {
    templates: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {templates, wasEverFetched} = this.props;

    // If there are no templates and we haven't previously fetched for them,
    // fetch the API for possible templates
    if (!wasEverFetched && templates.size === 0) {
      this.context.dispatch(TemplateActionCreators.fetchTemplates());
    }
  }


  render() {
    return (
      <div>
        <Button color='green' icon='add' onClick={this._handleNewTemplate} text='New Template' />
      </div>
    );
  }

  _handleNewTemplate = () => {
    this.context.history.push('/dashboard/templates/new');
  }

}
