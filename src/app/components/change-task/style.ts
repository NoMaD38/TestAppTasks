import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  wrapper__picker: {
    marginLeft: 7,
    height: 30,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: COLORS.BLACK_8,
    borderRadius: 4,
  },

  wrapper__form: {
    marginVertical: 7,
    marginHorizontal: 13,
  },

  common__error: {
    color: 'red',
    marginBottom: 13,
  },
});
