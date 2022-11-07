import styles from "./styles.module.css";

interface PaginationProps {
  next: () => void;
  back: () => void;
}
export const Pagination = ({ next, back }: PaginationProps) => {
  return (
    <div className={styles.container}>
      <button onClick={back}>{"Atrás"}</button>
      <button onClick={next}>{"Siguiente"}</button>
    </div>
  );
};
