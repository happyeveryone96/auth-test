import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import qs from "query-string";
import FormField from "app/components/FormField/FormField";

import { login, socialLogin } from "app/slices/auth";
import { clearMessage } from "app/slices/message";

import SocialLogin from "app/components/SocialLogin/SocialLogin";

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
    email: Yup.string().required("이메일을 입력해주세요."),
    password: Yup.string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 최소 8자리 이상 입력해주세요.")
      .test(
        "password",
        "비밀번호는 문자, 숫자, 특수문자를 모두 포함해야 합니다.",
        (value) => {
          const optionalSpeciesCount = [
            /[A-Z]/.test(value),
            /[a-z]/.test(value),
            /[\u3131-\uD79D]/.test(value),
          ].filter(Boolean).length;

          const essentialSpeciesCount = [
            /[@$!%*?&]/.test(value),
            /\d/.test(value),
          ].filter(Boolean).length;

          return optionalSpeciesCount >= 1 && essentialSpeciesCount === 2;
        }
      ),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
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
                <h1 className="text-xs-center">로그인</h1>
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
                <p className="text-xs-center find">
                  <Link to="/findId">아이디 찾기</Link>
                  <Link to="/findPw">비밀번호 찾기</Link>
                </p>
                <button
                  type="submit"
                  className="form-group btn btn-lg btn-primary pull-xs-right"
                >
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
