import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { editProfile } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

import "./Settings.css";

const Settings = () => {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    UserService.getUserProfile(accessToken);
  }, [accessToken]);

  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const { email, username, name } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    profileImg: "",
    username: username || name,
    shortBio: "",
    email,
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleEditProfile = (formValue) => {
    const { username, password } = formValue;

    setLoading(true);

    dispatch(editProfile({ username, password, accessToken }))
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="settings-container">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEditProfile}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      name="profileImg"
                      type="text"
                      placeholder="Profile Image"
                      disabled
                      className={
                        "form-control" +
                        (errors.profileImg && touched.profileImg
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="profileImg"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className={
                        "form-control" +
                        (errors.username && touched.username
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="shortBio"
                      as="textarea"
                      type="text"
                      disabled
                      placeholder="Short bio about you"
                      className={
                        "form-control" +
                        (errors.shortBio && touched.shortBio
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="shortBio"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="email"
                      type="text"
                      placeholder="Email"
                      disabled
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Update Settings</span>
                    </button>
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
