import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import qs from "query-string";
import FormField from "../../components/FormField/FormField";

import { login, socialLogin } from "app/slices/auth";
import { clearMessage } from "app/slices/message";

import SocialLogin from "app/components/SocialLogin";

import "app/pages/Login/Login.css";

const Login = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isLogin = accessToken && accessToken.length > 0;
  const navigate = useNavigate();

  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);
  const {
    accessToken: accessTokenFromSocialLogin,
    refreshToken: refreshTokenFromSocialLogin,
  } = query;

  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    if (query.accessToken) {
      localStorage.setItem("accessToken", accessTokenFromSocialLogin);
      localStorage.setItem("refreshToken", refreshTokenFromSocialLogin);
      dispatch(socialLogin(query.accessToken));
    }
  }, [
    dispatch,
    accessTokenFromSocialLogin,
    refreshTokenFromSocialLogin,
    query.accessToken,
  ]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email can't be blank"),
    password: Yup.string().required("password can't be blank"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        setLoading(false);
      });
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="login-container">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <Link to="/register">Need an account?</Link>
                </p>
                <FormField
                  placeholder="Email"
                  name="email"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  placeholder="Password"
                  name="password"
                  type="password"
                  errors={errors}
                  touched={touched}
                />
                <button
                  type="submit"
                  className="form-group btn btn-lg btn-primary pull-xs-right"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Sign in</span>
                </button>
                <SocialLogin />
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

export default Login;
