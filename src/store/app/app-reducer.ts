import { AppActionTypes } from './app-actions';
import { APP_SET_TASKS, APP_SET_ISAUTH } from './app-types';

import { ITask } from '../../utils/Api';

export interface IAppState {
  tasks: ITask[];
  totalTaskCount: number | null;
  isAuth: boolean;
}

const INITIAL_STATE: IAppState = {
  tasks: [],
  totalTaskCount: null,
  isAuth: false,
};

export default (state = INITIAL_STATE, action: AppActionTypes): IAppState => {
  switch (action.type) {
    case APP_SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalTaskCount: action.payload.total_task_count,
      };
    case APP_SET_ISAUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};
