import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MUITextField from 'material-ui/lib/text-field';
import MUIList from 'material-ui/lib/lists/list';

import ListItem from '.././ui/ListItem';
import ModalWrapper from '.././ui/ModalWrapper';

const displayName = 'ModalFillPlaceholders';

export default class ModalFillPlaceholders extends Component {

  static displayName = displayName;

  static propTypes = {
    placeholders: ImmutablePropTypes.contains({
      value: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    return (
      <ModalWrapper className={displayName} height={600} width={500}>
        <MUIList>
          {this._renderTemplateInputs()}
        </MUIList>
      </ModalWrapper>
    );
  }

  _renderTemplateInputs = () => {
    return this.props.placeholders.map((placeholder, i) => {
      return (
        <MUITextField
          hintText={placeholder.get('value')}
          ref={i}/>
      );
    });
  };

}