import { useContext } from "react";

import { Button } from "@/components/atoms/button";
import { singOutDispatch } from "@/core/auth/actions";
import { StoreContextUI } from "@/core/dto";
import { context } from "@/core/StoreContext";
import styles from "./styles.module.css";
import Image from "next/image";
import { SvgBack } from "@/svg/svgBack";
import { useRouter } from "next/router";

interface HeaderProps {
  back?: boolean;
}

export const Header = ({ back }: HeaderProps) => {
  const { state, authDispatch }: StoreContextUI = useContext(context);
  const { authState } = state;
  const { user } = authState;

  const router = useRouter();

  return (
    <nav className={styles.header}>
      <div className={styles.col}>
        {back && (
          <button className={styles.back} onClick={() => router.back()}>
            <SvgBack /> volver
          </button>
        )}

        <h2>{"Ionix usuarios"}</h2>
      </div>

      <div className={styles.col}>
        {user && (
          <Image
            src={!!user.imageUrl.trim() ? user.imageUrl : "/images/avatar.png"}
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
