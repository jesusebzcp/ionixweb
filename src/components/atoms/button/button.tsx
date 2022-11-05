import classNames from "classnames";
import styles from "./styles.module.css";
export interface ButtonProps {
  text: string;
  color?: "primary" | "secondary";
  type?: "submit" | "button";
  disabled?: boolean;
}
export const Button = ({
  text,
  color = "primary",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(styles.button, styles[color], {
        [styles.disabled]: disabled,
      })}
    >
      {text}
    </button>
  );
};
