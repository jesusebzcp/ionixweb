import { Button } from "../button";
import { Input } from "../Input";
import styles from "./styles.module.css";
import { Formik, Form as FormContainer } from "formik";
import { useRouter } from "next/router";

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
            <Button
              onClick={() => updateOrder("asc")}
              color={"secondary"}
              text="Buscar usuario"
              type="submit"
            />
          </div>
        </FormContainer>
      )}
    </Formik>
  );
};
