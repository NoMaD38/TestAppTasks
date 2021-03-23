import AsyncStorage from '@react-native-community/async-storage';
import { isAndroid, saveUserData } from './utils';
import Api from './Api';
import store from '../store/store';
import { appSetIsAuth } from '../store/app/app-actions';

export enum StatusMessageEnum {
  OK = 'ok',
  ERROR = 'error',
}

export const handleLogin = async (data: {
  username: string;
  password: string;
}): Promise<{ status: string; error?: string }> => {
  try {
    const res = await Api.login(data);
    if (res.status === StatusMessageEnum.OK && res.message.token) {
      saveUserData(res.message.token);
      store.dispatch(appSetIsAuth(true));
      return { status: res.status };
    } else {
      return {
        status: res.status,
        error: res.message?.password || 'ошибка сервера',
      };
    }
  } catch (error) {
    throw error;
  }
};

export const logout = (): void => {
  store.dispatch(appSetIsAuth(false));
  isAndroid() ? AsyncStorage.clear() : AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
};

export const changeIsAuth = (status: boolean): void => {
  const isAuth = store.getState().isAuth;
  isAuth !== status && store.dispatch(appSetIsAuth(status));
};
