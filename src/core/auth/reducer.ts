import { createReducer } from "@/config/reducer";
import type { AuthContext } from "./dto";
import { ERROR, LOADING, SET_USER } from "./types";

export interface UIAction {
  payload: any;
}

export const INITIAL_STATE_AUTH: AuthContext = {
  errorMsn: "",
  error: false,
  loading: false,
  user: null,
};
const handleError = (state: AuthContext, action: UIAction) => {
  const { error, errorMsn } = action.payload;
  return {
    ...state,
    error,
    errorMsn,
  };
};

const setLoading = (state: AuthContext, action: UIAction) => {
  return {
    ...state,
    loading: action.payload,
  };
};

const setUser = (state: AuthContext, action: UIAction) => {
  return {
    ...state,
    user: action.payload,
  };
};

export default createReducer(INITIAL_STATE_AUTH, {
  [ERROR]: handleError,
  [LOADING]: setLoading,
  [SET_USER]: setUser,
});
