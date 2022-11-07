import { useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

interface UploadImageProps {
  url: string | File | null;
  onChange: (file: File) => void;
}

export const UploadImage = ({ url, onChange }: UploadImageProps) => {
  const refInput = useRef<HTMLInputElement>();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleOpenImage = () => {
    refInput.current?.click();
  };

  const handleOnChangeImage = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity.valid) {
      setImageSrc(URL.createObjectURL(file));
      return onChange(file as File);
    }
  };

  const imageUrl = useMemo(() => {
    if (typeof url !== "string") {
      return imageSrc;
    } else {
      return url;
    }
  }, [imageSrc, url]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      onClick={handleOpenImage}
    >
      <span>{imageUrl ? "Actualizar" : "Sube una foto"}</span>
      <input
        accept="image/.png"
        ref={refInput as any}
        style={{ display: "none" }}
        onChange={handleOnChangeImage}
        type={"file"}
      />
    </div>
  );
};
