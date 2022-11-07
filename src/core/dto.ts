import type { AuthContext } from "./auth/dto";
import { UsersContext } from "./users/dto";

export interface StoreContextUI {
  state: {
    authState: AuthContext;
    usersState: UsersContext;
  };
  authDispatch: () => void;
  usersDispatch: () => void;
}
