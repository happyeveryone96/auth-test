import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

import "./Register.css";

const Register = () => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("username can't be blank"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("email can't be blank"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("password can't be blank"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setLoading(true);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
        setLoading(false);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="register-container">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <Link to="/login">Have an account?</Link>
                </p>
                <Field
                  placeholder="Username"
                  name="username"
                  type="text"
                  className={
                    "form-group form-control form-control-lg" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
                <Field
                  placeholder="Email"
                  name="email"
                  type="text"
                  className={
                    "form-group form-control form-control-lg" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
                <Field
                  placeholder="Password"
                  name="password"
                  type="password"
                  className={
                    "form-group form-control form-control-lg" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary pull-xs-right"
                    disabled={loading}
                  >
                    <span>Sign up</span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
