import { APP_SET_TASKS, APP_SET_ISAUTH } from './app-types';

import { IMessage } from '../../utils/Api';

export const appSetTasks = (message: IMessage) =>
  ({ type: APP_SET_TASKS, payload: message } as const);

export const appSetIsAuth = (status: boolean) =>
  ({ type: APP_SET_ISAUTH, payload: status } as const);

export type AppActionTypes = ReturnType<typeof appSetTasks> | ReturnType<typeof appSetIsAuth>;
