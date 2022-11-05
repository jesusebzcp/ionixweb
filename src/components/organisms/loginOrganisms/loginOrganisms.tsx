import { useCallback, useMemo } from "react";

import * as Yup from "yup";

import { Form } from "@/components/molecules/form";

import styles from "./styles.module.css";
import classNames from "classnames";
import type { Filed } from "@/components/molecules/form/form";
import { loginDispatch } from "@/core/auth/actions";
import { useContext } from "react";
import { context } from "@/core/StoreContext";
import { StoreContextUI } from "@/core/dto";

export const LoginOrganisms = () => {
  const { authDispatch }: StoreContextUI = useContext(context);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Este campo es requerido")
      .email("El email debe ser valido"),
    password: Yup.string()
      .required("Este campo es requerido")
      .min(6, "Debe contener al menos 6 caracteres"),
  });

  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const fields: Filed[] = useMemo(
    () => [
      {
        name: "email",
        label: "Ingrese su correo",
      },
      {
        name: "password",
        label: "Ingrese su password",
        type: "password",
      },
    ],
    []
  );
  const handleSubmit = useCallback(
    (values: typeof initialValues) => {
      loginDispatch(values, authDispatch);
    },
    [authDispatch]
  );
  return (
    <div className={styles.container}>
      <div className={classNames(styles.containerForm)}>
        <Form
          title="Iniciar sesión"
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={fields}
          styles={styles.form}
          stylesInput={styles.input}
          textButton={"Iniciar sesión"}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
