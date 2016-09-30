import React, {Component, PropTypes} from 'react';
import {createFlashMessage} from '../../actions/AppActionCreators';
import CustomPropTypes from '../../utils/CustomPropTypes';
import TemplateActionCreators from './actions/ActionCreators';
import TemplateEditorView from './components/TemplateEditorView';
import RequireTemplateBeingEdited from './containers/RequireTemplateBeingEdited';

@RequireTemplateBeingEdited
export default class TemplatesEdit extends Component {

  static displayName = 'TemplatesEdit';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired,
    template: CustomPropTypes.template
  };

  componentWillUpdate({template: nextTemplate}) {
    const {template} = this.props;

    // If template is successfully edited (meaning theres no more `templateBeingEdited`),
    // log a flash message and redirect user to the template index view
    if (!nextTemplate) {
      const title = template.get('title') ? <b>{template.get('title')}</b> : 'Template';

      this.context.dispatch(createFlashMessage('success', `${title} was successfully updated!`));
      this.context.router.push('/dashboard/templates');
    }
  }

  componentWillUnmount() {
    this.context.dispatch(TemplateActionCreators.edit.reset());
  }

  render() {
    return (
      <TemplateEditorView
        mode='edit'
        route={this.props.route}
        template={this.props.template}
        onSave={this._handleSave} />
    );
  }

  _handleSave = () => {
    const template = this.props.template.toJS();

    if (template.title.length === 0) {
      this.context.dispatch(createFlashMessage('Please provide a title for your template!'));
      return;
    }
    if (template.rawText.length === 0) {
      this.context.dispatch(createFlashMessage('Please provide a title for your template!'));
      return;
    }

    // If all validations pass, we edit the template
    this.context.dispatch(TemplateActionCreators.edit.update(template.id, template));
  }
}
