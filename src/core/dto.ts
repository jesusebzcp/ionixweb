import type { AuthContext } from "./auth/dto";

export interface StoreContextUI {
  state: {
    authState: AuthContext;
  };
  authDispatch: () => void;
}
