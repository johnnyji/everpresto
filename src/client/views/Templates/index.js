import React, {PropTypes, PureComponent} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import DashboardContentWrapper from '../../components/dashboard/DashboardContentWrapper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RequireTemplates from './containers/RequireTemplates';
import styles from './styles/index.scss';
import TemplateActionCreators from './actions/ActionCreators';
import TemplateCard from './components/TemplateCard';
import TemplatePreviewCard from './components/TemplatePreviewCard';

@RequireTemplates
@connect(({templatesEdit}) => ({
  templateBeingEdited: templatesEdit.get('template')
}))
export default class TemplatesIndex extends PureComponent {

  static displayName = 'TemplatesIndex';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    templateBeingEdited: CustomPropTypes.template,
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

  componentWillReceiveProps({templateBeingEdited}) {
    if (!this.props.templateBeingEdited && templateBeingEdited) {
      this.context.router.push(`/dashboard/templates/edit/${templateBeingEdited.get('id')}`);
    }
  }

  render() {
    return (
      <DashboardContentWrapper className={styles.main}>
        <TemplateCard
          className={styles.createTemplate}
          isNewCard={true}
          onNewIconClick={this._handleCreateTemplate} />
        {this._renderTemplatePreviews()}
      </DashboardContentWrapper>
    );
  }

  _handleCreateTemplate = () => {
    this.context.dispatch(TemplateActionCreators.create());
  };

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplatePreviewCard className={styles.template} key={i} template={template} />;
    });
  };

}
