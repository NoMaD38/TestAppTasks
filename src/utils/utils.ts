import Api, { SortDirectionEnum, SortFieldEnum } from './Api';
import store from '../store/store';
import { appSetTasks } from '../store/app/app-actions';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusMessageEnum } from './auth-service';
import { StatusTaskEnum } from '../app/components/list-tasks/Task';

export default class Utils {
  public static async saveList(
    page: number,
    sortField?: SortFieldEnum,
    sortDirection?: SortDirectionEnum
  ): Promise<boolean> {
    return new Promise((resolve) => {
      Api.getTasks(page, sortField, sortDirection)
        .then((res) => {
          if (res.status === 'ok') {
            store.dispatch(appSetTasks(res.message));
          }
          resolve(false);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}

export const isAndroid = (): boolean => Platform.OS === 'android';

export const handleCreateTask = async (data: {
  username: string;
  email: string;
  text: string;
}): Promise<{ status: string; error?: string }> => {
  try {
    const res = await Api.createTask(data);
    if (res.status === StatusMessageEnum.OK) {
      return { status: res.status };
    } else {
      return { status: res.status, error: 'ошибка сервера' };
    }
  } catch (error) {
    throw error;
  }
};

export const handleChangeTask = async (data: {
  text: string;
  status: StatusTaskEnum;
  id: number;
}): Promise<{ status: string; error?: string }> => {
  try {
    const res = await Api.changeTask(data);
    if (res.status === StatusMessageEnum.OK) {
      return { status: res.status };
    } else {
      return { status: res.status, error: 'ошибка сервера' };
    }
  } catch (error) {
    throw error;
  }
};

export const saveUserData = async (access_token: string): Promise<void> => {
  // не работает, не получается получить токен exp, и соответственно дальше не делал логику для JWT
  // const decodedJWT: any = JWTDecoder(access_token);
  const getNowDate = new Date();
  const tokenExpireDate = getNowDate.setDate(getNowDate.getDate() + 1);
  saveAccessTokenToStorage(access_token);
  saveTokenExpireToStorage(`${tokenExpireDate}`);
};

export const checkAccessToken = (): void => {
  multiGetFromStorage(['accessToken', 'tokenExpire']).then(
    (resp) => resp[0][1] && resp[1][1] && Api.setAccessToken(resp[0][1], resp[1][1])
  );
};

const saveAccessTokenToStorage = async (accesToken: string) =>
  await AsyncStorage.setItem('accessToken', accesToken);

const saveTokenExpireToStorage = async (tokenExpire: string) =>
  await AsyncStorage.setItem('tokenExpire', tokenExpire);

const multiGetFromStorage = async (keys: string[]) => await AsyncStorage.multiGet(keys);
