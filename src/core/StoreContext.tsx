import React, { createContext, useReducer } from "react";
import authReducer, { INITIAL_STATE_AUTH } from "./auth/reducer";
import usersReducer, { INITIAL_STATE_USERS } from "./users/reducer";

export const context: any = createContext({});

export const StoreContext = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE_AUTH);
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    INITIAL_STATE_USERS
  );

  return (
    <context.Provider
      value={{
        state: {
          authState,
          usersState,
        },
        authDispatch,
        usersDispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};
