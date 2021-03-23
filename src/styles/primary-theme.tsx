import { Theme, DefaultTheme } from 'react-native-paper';
import COLORS from '../constants/color';

const PrimaryTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    primary: COLORS.PRIMARY,
    accent: COLORS.PRIMARY,
    background: COLORS.WHITE,
    surface: COLORS.WHITE,
    error: COLORS.SECOND_COLOR_R1,
    text: COLORS.BLACK_87,
    onBackground: 'red',
    onSurface: 'red',
    disabled: COLORS.BLACK_8,
    placeholder: COLORS.BLACK_38,
    backdrop: COLORS.WHITE,
    notification: 'red',
  },
  animation: {
    scale: 0,
  },
};

export default PrimaryTheme;
