import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import COLORS from '../../../../constants/color';

const STATUSBAR_HRIGHT = getStatusBarHeight();
export const HEADER_HEIGHT = 24 + STATUSBAR_HRIGHT;

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BLACK_22,
  },

  header__wrapperText: {
    width: '70%',
    alignItems: 'center',
  },

  header__additionalIcon: {
    width: '50%',
  },

  header__text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
  },

  header__button: {
    position: 'absolute',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header__buttonRight: {
    right: 3,
  },
  header__buttonAdditional: {
    right: 52,
  },

  header__buttonLeft: {
    left: 3,
  },
});
