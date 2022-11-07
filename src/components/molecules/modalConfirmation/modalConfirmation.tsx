import styles from "./styles.module.css";
interface ModalConfirmationProps {
  open: boolean;
  close: () => void;
  okAction: () => void;
  cancelAction: () => void;
  title: string;
  description: string;
  textOk: string;
  textCancel: string;
}
export const ModalConfirmation = ({
  open,
  close,
  title,
  description,
  textCancel,
  textOk,
  cancelAction,
  okAction,
}: ModalConfirmationProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.background} onClick={close}>
      <div className={styles.modal}>
        <h6>{title}</h6>
        <p>{description}</p>
        <div>
          <button onClick={okAction}>{textOk}</button>
          <button onClick={cancelAction}>{textCancel}</button>
        </div>
      </div>
    </div>
  );
};
