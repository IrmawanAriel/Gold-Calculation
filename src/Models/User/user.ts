export interface usersReq {
    id: number;
    username: number;
    email: string;
    password: string;
}

export interface usersLogin {
    email: string;
    password: string;
}

export interface usersGet {
    id: number;
    username: string;
    email: string;
}

export interface usersGetId {
    id: number;
    username: string;
    email: string;
}

export interface usersRegistration {
    email: string;
    password: string;
    username: string;
  }