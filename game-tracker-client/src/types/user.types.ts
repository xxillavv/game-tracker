export interface IUser {
  userId: number;
  username: string;
  email: string;
  avatar?: string;
}

export interface IEditUserBody {
  email?: string
  username?: string
}