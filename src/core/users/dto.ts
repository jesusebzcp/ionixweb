import type { UserAuth } from "../auth/dto";

export interface HandleError {
  error: boolean;
  errorMsn: string;
}
export interface UsersContext {
  errorMsn: string;
  error: boolean;
  loading: boolean;
  users: UserAuth[] | [];
  selectUser: UserAuth | null;
}
