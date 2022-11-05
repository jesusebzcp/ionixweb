import React, { createContext, useReducer } from "react";
import authReducer, { INITIAL_STATE_AUTH } from "./auth/reducer";

export const context: any = createContext({});

export const StoreContext = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE_AUTH);

  return (
    <context.Provider
      value={{
        state: {
          authState,
        },
        authDispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};
