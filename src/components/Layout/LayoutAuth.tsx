import React, { useContext, useEffect } from "react";
import { context } from "@/core/StoreContext";
import { StoreContextUI } from "@/core/dto";
import { Lato } from "@next/font/google";

import { LoginOrganisms } from "../organisms/loginOrganisms";
import { getProfileDispatch } from "@/core/auth/actions";
import { LoadingOrganisms } from "../organisms/loadingOrganisms";

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
  const { user, loading } = authState;

  useEffect(() => {
    getProfileDispatch(authDispatch);
  }, [authDispatch]);

  if (loading) {
    return <LoadingOrganisms label="Buscando tu usuario..." />;
  }

  if (!user) {
    return <LoginOrganisms />;
  }

  return <main className={font.className}>{children}</main>;
};
