"use client";

import { Form, Formik } from "formik";
import * as yup from "yup";

export const USWDSForm = ({
  initialValues,
  validationSchema,
  submit,
  children,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        submit(values);
        setSubmitting(false);
      }}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
};

type Props = {
  initialValues: { [key: string]: any };
  validationSchema: yup.ObjectSchema<any>;
  submit: Function;
  children: any;
};
