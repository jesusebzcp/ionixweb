import classNames from "classnames";
import type { FormikErrors } from "formik";
import styles from "./styles.module.css";
export interface InputProps {
  name: string;
  label: string;
  type?: "text" | "password";
  customStyles?: any;
  error?: FormikErrors<string>;
  onBlur?: () => void;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  label,
  type = "text",
  customStyles,
  error,
  onBlur,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={classNames(customStyles ?? {}, styles.containerInput)}>
      <input
        className={classNames(styles.input, {
          [styles.inputError]: error ? true : false,
        })}
        name={name}
        type={type}
        placeholder={label}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
      {error ? <span className={styles.helperError}>{error}</span> : null}
    </div>
  );
};
