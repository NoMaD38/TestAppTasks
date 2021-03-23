import { StyleSheet } from 'react-native';
import COLORS from '../../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  wrapper__content: {
    flex: 1,
    marginHorizontal: 13,
  },

  wrapper__block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },

  wrapper__filters: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wrapper__picker: {
    marginLeft: 7,
    width: 200,
    height: 30,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: COLORS.BLACK_8,
    borderRadius: 4,
  },

  wrapper__buttons_page: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper__task: {
    marginVertical: 7,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BLACK_8,
    borderRadius: 4,
  },

  wrapper__text: {
    marginBottom: 16,
  },

  task__common__text: {
    fontSize: 10,
    lineHeight: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  task__color__text: {
    color: COLORS.BLACK_54,
  },

  task__text: {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  button__edit__task: {
    position: 'absolute',
    top: 5,
    right: 5,
  },

  button__page: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: COLORS.BLACK_8,
    borderRadius: 4,
  },

  button__page__active: {
    backgroundColor: COLORS.PRIMARY,
  },

  button__page__inactive: {
    backgroundColor: COLORS.WHITE,
  },

  button__page__text: {
    fontSize: 10,
    lineHeight: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  button__page__text__active: {
    color: COLORS.PRIMARY,
  },

  button__page__text__inactive: {
    color: COLORS.WHITE,
  },

  auth__modal: {
    justifyContent: 'flex-end',
    height: '100%',
    margin: 0,
  },

  success_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },

  content: {
    paddingVertical: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  common__error: {
    color: 'red',
    marginBottom: 13,
  },

  success__modal: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
