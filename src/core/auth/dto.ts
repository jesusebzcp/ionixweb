export interface UserAuth {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  imageUrl: string;
}

export interface HandleError {
  error: boolean;
  errorMsn: string;
}
export interface AuthContext {
  errorMsn: string;
  error: boolean;
  loading: boolean;
  user: UserAuth | null;
}

export interface Credentials {
  email: string;
  password: string;
}
