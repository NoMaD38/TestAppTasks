import axios, { AxiosInstance } from 'axios';
import { StatusTaskEnum } from '../app/components/list-tasks/Task';
import { changeIsAuth, logout } from './auth-service';

// по хорошему убрать в .env
const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';

export enum SortFieldEnum {
  USERNAME = 'username',
  EMAIL = 'email',
  STATUS = 'status',
}

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

interface IGetTasksResponse {
  status: string;
  message: IMessage;
}

interface IGetLoginResponse {
  status: string;
  message: {
    token?: string;
    password?: string;
  };
}

interface ICreateTaskResponse {
  status: string;
  message: ITask;
}

export interface IMessage {
  total_task_count: number;
  tasks: ITask[];
}

export interface ITask {
  email: string;
  id: number;
  image_path: string;
  status: number;
  text: string;
  username: string;
}

class Api {
  private instance: AxiosInstance;
  private expiresIn: number | null = null;
  private accessToken: string = '';
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        common: {
          Accept: 'application/json',
        },
      },
    });
    setTimeout(this.checkTokenExpires.bind(this), 30000);
  }

  public async getTasks(
    page = 1,
    sortField?: SortFieldEnum,
    sortDirection?: SortDirectionEnum
  ): Promise<IGetTasksResponse> {
    try {
      const res = await this.instance.get<IGetTasksResponse>('/?developer=Ivan', {
        params: {
          page,
          ...(sortField ? { sort_field: sortField } : {}),
          ...(sortDirection ? { sort_direction: sortDirection } : {}),
        },
      });
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async changeTask(data: {
    text: string;
    status: StatusTaskEnum;
    id: number;
  }): Promise<ICreateTaskResponse> {
    try {
      const newData = new FormData();
      newData.append('text', data.text);
      newData.append('status', data.status);
      newData.append('token', this.accessToken);
      const res = await this.instance.post<ICreateTaskResponse>(
        `/edit/${data.id}/?developer=Ivan`,
        newData
      );
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async createTask(data: {
    username: string;
    email: string;
    text: string;
  }): Promise<ICreateTaskResponse> {
    try {
      const newData = new FormData();
      newData.append('username', data.username);
      newData.append('email', data.email);
      newData.append('text', data.text);
      const res = await this.instance.post<ICreateTaskResponse>('/create/?developer=Ivan', newData);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async login(data: { username: string; password: string }): Promise<IGetLoginResponse> {
    try {
      const newData = new FormData();
      newData.append('username', data.username);
      newData.append('password', data.password);
      const res = await this.instance.post<IGetLoginResponse>('/login/?developer=Ivan', newData);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public setAccessToken(token: string, expiresIn: string) {
    this.accessToken = token;
    this.expiresIn = Number(expiresIn);
    this.checkTokenExpires();
  }

  public async checkTokenExpires() {
    if (!this.expiresIn) {
      setTimeout(() => this.checkTokenExpires(), 60000);
      return;
    }
    try {
      const timeNow = new Date().getTime();
      if (timeNow > this.expiresIn) {
        logout();
      } else {
        changeIsAuth(true);
      }
    } catch (e) {
      throw e;
    }
    setTimeout(() => this.checkTokenExpires(), 60000);
    return;
  }
}

export default new Api();
