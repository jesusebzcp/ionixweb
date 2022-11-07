import { useContext } from "react";

import { Button } from "@/components/atoms/button";
import { singOutDispatch } from "@/core/auth/actions";
import { StoreContextUI } from "@/core/dto";
import { context } from "@/core/StoreContext";
import styles from "./styles.module.css";
import Image from "next/image";

export const Header = () => {
  const { state, authDispatch }: StoreContextUI = useContext(context);
  const { authState } = state;
  const { user } = authState;
  return (
    <nav className={styles.header}>
      <h2>{"Ionix usuarios"}</h2>
      <div className={styles.col}>
        {user && (
          <Image
            src={user.imageUrl}
            alt={user.firstname}
            width={35}
            height={35}
            className={styles.avatar}
          />
        )}
        <span className={styles.welcome}>
          {`Hola, ${user?.firstname} ${user?.lastname} 👋`}
        </span>
        <Button
          onClick={() => singOutDispatch(authDispatch)}
          text="Cerrar sesión"
        />
      </div>
    </nav>
  );
};
