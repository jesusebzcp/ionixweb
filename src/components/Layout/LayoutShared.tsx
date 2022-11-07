import { Header } from "../molecules/header";
import styles from "./styles.module.css";

export const LayoutShared = ({
  children,
  back,
}: {
  children: JSX.Element[] | JSX.Element;
  back?: boolean;
}) => {
  return (
    <main className={styles.container}>
      <Header back={back} />
      {children}
    </main>
  );
};
