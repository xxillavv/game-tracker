export interface ILoginUser {
  email: string
  password: string
}

export interface IRegisterUser extends ILoginUser {
  username: string
}

export interface IAuthUserResponse {
  email: string
  username: string
  userId: number
}

export interface IFormInputs {
  email: string
  username: string
  password: string
}