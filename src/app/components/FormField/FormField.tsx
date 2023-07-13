import React from "react";
import { Field, ErrorMessage } from "formik";
import "app/components/FormField/FormField.css";

interface FormFieldType {
  placeholder: string;
  name: string;
  type: string;
  errors: any;
  touched: any;
  disabled: boolean;
  as?: string;
  value?: string;
}

const FormField = (props: FormFieldType) => {
  const { placeholder, name, type, errors, touched, disabled, as, value } =
    props;
  const isInvalid = errors[name] && touched[name];
  const hasValue = value && value.trim().length > 0;

  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        type={type}
        disabled={disabled}
        as={as}
        value={value}
        className={
          "form-group form-control form-control-lg" +
          (isInvalid ? " is-invalid" : "")
        }
      />
      {!hasValue && (
        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback"
        />
      )}
    </div>
  );
};

export default FormField;
