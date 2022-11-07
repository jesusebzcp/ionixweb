import { useRouter } from "next/router";
import { Formik, Form as FormContainer } from "formik";

import styles from "./styles.module.css";

import { Button } from "../button";
import { Input } from "../Input";

export type OrderType = "asc" | "desc";

interface HeaderFilterTabletProps {
  order: OrderType;
  updateOrder: (value: OrderType) => void;
  handleSearch: (search: string | string[]) => void;
}

export const HeaderFilterTablet = ({
  order,
  updateOrder,
  handleSearch,
}: HeaderFilterTabletProps) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ search: router?.query?.q ?? "" }}
      onSubmit={(values) => {
        handleSearch(values.search);
      }}
    >
      {({ setFieldTouched, errors, values, handleChange, isValid }) => (
        <FormContainer className={styles.container}>
          <Input
            value={values.search as string}
            customStyles={styles.search}
            label="Buscar usuario por correo"
            name="search"
            onBlur={() => setFieldTouched("search")}
            onChange={handleChange("search")}
            error={errors.search}
          />
          <div className={styles.containerButton}>
            <Button color={"secondary"} text="Buscar usuario" type="submit" />
          </div>
          <button
            onClick={() => updateOrder(order === "asc" ? "desc" : "asc")}
            className={styles.order}
          >
            order:{order}
          </button>
        </FormContainer>
      )}
    </Formik>
  );
};
