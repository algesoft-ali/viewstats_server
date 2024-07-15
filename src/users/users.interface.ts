export interface IUser {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}

export interface IUserResponse {
  user: Omit<IUser, "password">;
  accessToken: string;
}
