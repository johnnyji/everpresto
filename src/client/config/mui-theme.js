import {cyan500, darkBlack, grey100, grey300, grey500, white} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#FFB55F',
    primary2Color: '#F58A0F',
    primary3Color: '#4E9CC2',
    accent1Color: '#F58A0F',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
  }
};
