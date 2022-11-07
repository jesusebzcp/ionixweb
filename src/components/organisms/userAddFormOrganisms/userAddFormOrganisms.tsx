import { Form } from "@/components/molecules/form";
import { Filed } from "@/components/molecules/form/form";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

import * as Yup from "yup";
import { UploadImage } from "@/components/molecules/uploadImage";
import { toast } from "react-toastify";
import { context } from "@/core/StoreContext";
import { StoreContextUI } from "@/core/dto";
import { createNewUser, updateUser } from "@/core/users/actions";
import { useRouter } from "next/router";
import { LoadingOrganisms } from "../loadingOrganisms";
import { UserAuth } from "@/core/auth/dto";

export const UserAddFormOrganisms = ({
  selectUser = null,
}: {
  selectUser?: UserAuth | null;
}) => {
  const router = useRouter();
  const { state, usersDispatch }: StoreContextUI = useContext(context);
  const { usersState } = state;
  const { loading } = usersState;

  const [image, setImage] = useState<File | null | string>(null);

  console.log("image", image);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Este campo es requerido")
      .email("El email debe ser valido"),
    password: Yup.string()
      .required("Este campo es requerido")
      .min(6, "Debe contener al menos 6 caracteres"),
    firstname: Yup.string().required("Este campo es requerido"),
    lastname: Yup.string().required("Este campo es requerido"),
    username: Yup.string().required("Este campo es requerido"),
  });

  const initialValues = useMemo(
    () =>
      selectUser
        ? { ...selectUser }
        : {
            email: "",
            firstname: "",
            lastname: "",
            username: "",
            ...(!selectUser && { password: "" }),
          },
    [selectUser]
  );

  const fields = useMemo(
    () => [
      {
        name: "firstname",
        label: "Ingrese nombre",
      },
      {
        name: "lastname",
        label: "Ingrese apellido",
      },
      {
        name: "email",
        label: "Ingrese correo",
      },
      {
        name: "username",
        label: "Ingrese username",
      },
      ...(!selectUser
        ? [
            {
              name: "password",
              label: "Ingrese password",
              type: "password",
            },
          ]
        : []),
    ],
    [selectUser]
  );

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      if (!image) {
        return toast.error("La imagen es obligatoria.");
      }
      if (selectUser) {
        updateUser(values as any, image, usersDispatch);
      } else {
        await createNewUser(values as any, image, usersDispatch);
      }
      router.back();
    },
    [image, router, selectUser, usersDispatch]
  );

  useEffect(() => {
    if (selectUser) {
      setImage(selectUser.imageUrl);
    }
  }, [selectUser]);

  if (loading) {
    return <LoadingOrganisms label={"Creando usuario"} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.col} />
      <div className={styles.col}>
        <div className={styles.containerForm}>
          <UploadImage url={image} onChange={setImage} />
          <Form
            title={selectUser ? "Editar usuario" : "Crear nuevo usuario"}
            initialValues={initialValues}
            validationSchema={validationSchema}
            fields={fields as Filed[]}
            styles={styles.form}
            stylesInput={styles.input}
            textButton={selectUser ? "Guardar cambios" : "Crear nuevo usuario"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className={styles.col} />
    </div>
  );
};
