import React, {PropTypes, PureComponent} from 'react';
import CustomPropTypes from '../../utils/CustomPropTypes';
import DashboardContentWrapper from '../../components/dashboard/DashboardContentWrapper';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RequireTemplates from './containers/RequireTemplates';
import styles from './styles/index.scss';
import TemplateActionCreators from './actions/ActionCreators';
import TemplateCard from './components/TemplateCard';
import TemplatePreviewCard from './components/TemplatePreviewCard';

@RequireTemplates
export default class TemplatesIndex extends PureComponent {

  static displayName = 'TemplatesIndex';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    templates: ImmutablePropTypes.listOf(CustomPropTypes.template).isRequired
  };

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
    this.context.dispatch(TemplateActionCreators.createTemplate());
  };

  _renderTemplatePreviews = () => {
    return this.props.templates.map((template, i) => {
      return <TemplatePreviewCard className={styles.template} key={i} template={template} />;
    });
  };

}
