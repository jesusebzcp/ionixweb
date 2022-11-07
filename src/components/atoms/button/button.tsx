import classNames from "classnames";
import styles from "./styles.module.css";
export interface ButtonProps {
  text: string;
  color?: "primary" | "secondary" | "delete";
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}
export const Button = ({
  text,
  color = "primary",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
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
