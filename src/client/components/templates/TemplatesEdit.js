import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createFlashMessage} from '../../actions/AppActionCreators';
import CustomPropTypes from '../CustomPropTypes';
import DashboardSpinner from '../shared/DashboardSpinner';
import handleFlashError from '../../decorators/handleFlashError';
import TemplateActionCreators from '../../actions/TemplateActionCreators';
import TemplateEditorView from './TemplateEditorView';

@connect((state) => ({
  template: state.templates.get('templateBeingEdited')
}))
@handleFlashError
export default class TemplatesEdit extends Component {

  static displayName = 'TemplatesEdit';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    handleFlashError: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired,
    template: CustomPropTypes.template
  };

  componentWillMount() {
    const {params, template} = this.props;
    // If there's a template `_id` in the route params and no template being edited, we'll fetch that
    // template from the server using the `_id`.
    if (!template && params.id) {
      this.context.dispatch(
        TemplateActionCreators.fetchTemplateById(params.id, TemplateActionCreators.setTemplateBeingEdited)
      );
    }
  }

  componentWillUpdate(nextProps) {
    const {template} = this.props;
    const {template: nextTemplate} = nextProps;

    // If template is successfully edited (meaning theres no more `templateBeingEdited`),
    // log a flash message and redirect user to the template index view
    if (!nextTemplate) {
      const {dispatch, router} = this.context;
      const title = template.get('title') ? <b>{template.get('title')}</b> : 'Template';

      dispatch(createFlashMessage('green', `${title} was successfully updated!`));
      router.push('/dashboard/templates');
    }
  }

  componentWillUnmount() {
    this.context.dispatch(TemplateActionCreators.resetTemplateBeingEdited());
  }

  render() {
    if (!this.props.template) return <DashboardSpinner />;

    return (
      <TemplateEditorView
        mode='edit'
        route={this.props.route}
        template={this.props.template}
        onSave={this._handleSave} />
    );
  }

  _handleSave = (template) => {
    if (template.get('title').length === 0) {
      return this.props.handleFlashError('Please provide a title for your template!');
    }
    if (template.get('rawText').length === 0) {
      return this.props.handleFlashError('Your template can\'t be blank, duh...');
    }

    // If all validations pass, we create the template
    this.context.dispatch(
      TemplateActionCreators.updateTemplate(
        this.props.template.get('id'), template.toJS()
      )
    );
  }
}
