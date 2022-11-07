import React from "react";
import { Formik, Form as FormContainer, FormikErrors } from "formik";
import type { OptionalObjectSchema } from "yup/lib/object";

import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/button";

export interface Filed {
  name: string;
  label: string;
  type?: "text" | "password";
}

interface FormProps {
  styles?: any;
  initialValues: any;
  validationSchema: OptionalObjectSchema<any>;
  fields: Filed[];
  stylesInput?: any;
  textButton: string;
  handleSubmit: (values: any) => void;
  title?: string;
}

export const Form = ({
  styles,
  initialValues,
  validationSchema,
  fields,
  stylesInput = {},
  textButton,
  title,
  handleSubmit,
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        handleSubmit(values);
      }}
    >
      {({ setFieldTouched, errors, values, handleChange, isValid }) => (
        <FormContainer className={styles ?? {}}>
          {title ? (
            <div>
              <h2>{title}</h2>
            </div>
          ) : null}

          {fields.map((props, index) => (
            <Input
              {...props}
              key={`${props.name}-${index}`}
              customStyles={stylesInput}
              onBlur={() => setFieldTouched(props.name)}
              onChange={handleChange(props.name)}
              value={values[props.name]}
              error={errors && (errors[props.name] as FormikErrors<string>)}
            />
          ))}
          <Button type={"submit"} text={textButton} disabled={!isValid} />
        </FormContainer>
      )}
    </Formik>
  );
};
