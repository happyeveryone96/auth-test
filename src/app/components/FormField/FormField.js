import React from "react";
import { Field, ErrorMessage } from "formik";
import "app/components/FormField/FormField.css";

const FormField = (props) => {
  const { placeholder, name, type, errors, touched, disabled, as } = props;

  const isInvalid = errors[name] && touched[name];

  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        type={type}
        disabled={disabled}
        as={as}
        className={
          "form-group form-control form-control-lg" +
          (isInvalid ? " is-invalid" : "")
        }
      />
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </div>
  );
};

export default FormField;
