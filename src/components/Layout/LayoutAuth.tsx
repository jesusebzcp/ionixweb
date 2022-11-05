import React, { use, useContext, useEffect } from "react";
import { context } from "@/core/StoreContext";
import { StoreContextUI } from "@/core/dto";
import { Lato } from "@next/font/google";

import { LoginOrganisms } from "../organisms/loginOrganisms";
import { getProfileDispatch } from "@/core/auth/actions";

const font = Lato({
  weight: "400",
});

export const LayoutAuth = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { state, authDispatch }: StoreContextUI = useContext(context);
  const { authState } = state;
  const { user } = authState;

  useEffect(() => {
    getProfileDispatch(authDispatch);
  }, [authDispatch]);

  if (!user) {
    return <LoginOrganisms />;
  }

  return <main className={font.className}>{children}</main>;
};
