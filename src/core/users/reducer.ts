import { createReducer } from "@/config/reducer";
import type { UsersContext } from "./dto";
import {
  DELETE_USER,
  ERROR,
  GET_LIST_USER,
  LOADING,
  SELECT_USER,
  UPDATE_USER,
} from "./types";

export interface UIAction {
  payload: any;
}

export const INITIAL_STATE_USERS: UsersContext = {
  errorMsn: "",
  error: false,
  loading: false,
  users: [],
  selectUser: null,
};
const handleError = (state: UsersContext, action: UIAction) => {
  const { error, errorMsn } = action.payload;
  return {
    ...state,
    error,
    errorMsn,
  };
};

const setLoading = (state: UsersContext, action: UIAction) => {
  return {
    ...state,
    loading: action.payload,
  };
};
const getListUser = (state: UsersContext, action: UIAction) => {
  return {
    ...state,
    users: action.payload,
  };
};
const selectUser = (state: UsersContext, action: UIAction) => {
  return {
    ...state,
    selectUser: action.payload,
  };
};

const deleteUser = (state: UsersContext, action: UIAction) => {
  return {
    ...state,
    users: state.users.filter((user) => user.id !== action.payload),
  };
};

const updateUser = (state: UsersContext, action: UIAction) => {
  return {
    ...state,
    users: state.users.map((user) => {
      if (user.id === action.payload.id) {
        return {
          ...action.payload,
        };
      } else {
        return user;
      }
    }),
  };
};

export default createReducer(INITIAL_STATE_USERS, {
  [ERROR]: handleError,
  [LOADING]: setLoading,
  [GET_LIST_USER]: getListUser,
  [SELECT_USER]: selectUser,
  [DELETE_USER]: deleteUser,
  [UPDATE_USER]: updateUser,
});
