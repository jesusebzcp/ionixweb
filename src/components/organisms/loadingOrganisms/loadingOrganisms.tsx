import Lottie from "lottie-react";

import styles from "./styles.module.css";
import loadingAnimation from "./loading.json";

interface LoadingOrganismsProps {
  label?: string;
}

export const LoadingOrganisms = ({
  label = "loading...",
}: LoadingOrganismsProps) => {
  return (
    <div className={styles.container}>
      <Lottie
        width={100}
        height={100}
        animationData={loadingAnimation}
        loop={true}
      />
      <p>{label}</p>
    </div>
  );
};
