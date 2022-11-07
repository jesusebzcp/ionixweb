import { SvgAddIcon } from "@/svg/svgAddIcon";
import styles from "./styles.module.css";

interface FloatButtonProps {
  onClick: () => void;
}
export const FloatButton = ({ onClick }: FloatButtonProps) => {
  return (
    <div className={styles.containerFloat}>
      <button onClick={onClick}>
        <SvgAddIcon />
      </button>
    </div>
  );
};
