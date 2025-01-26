import { usersGet } from './User/user';

interface IBasicResponse {
    msg: string;
    data?: any[];
    err?: string;
  }

export interface IUsersRes extends IBasicResponse {
    data? : usersGet[];
  }