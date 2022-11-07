import { Header } from "../molecules/header";
import styles from "./styles.module.css";

export const LayoutShared = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <main className={styles.container}>
      <Header />
      {children}
    </main>
  );
};
