import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { register } from "app/slices/auth";
import { clearMessage } from "app/slices/message";

import FormField from "app/components/FormField/FormField";

import "app/pages/Register/Register.css";

const Register = () => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    nickname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().required("닉네임을 입력해주세요."),
    email: Yup.string()
      .email("이메일 형식에 맞지 않습니다.")
      .required("이메일을 입력해주세요."),
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
      )
      .test(
        "password",
        "비밀번호는 닉네임과 같을 수 없습니다.",
        (value, { parent }) => {
          const isUsernameMatch = value !== parent.nickname;
          return isUsernameMatch;
        }
      )
      .test(
        "password",
        "비밀번호는 닉네임을 포함할 수 없습니다.",
        (value, { parent }) => {
          const isNicknameContained = value.includes(parent.nickname);
          return !isNicknameContained;
        }
      )
      .test(
        "password",
        "비밀번호는 이메일 아이디와 같을 수 없습니다.",
        (value, { parent }) => {
          const isEmailIdContained = value !== parent.email?.split("@")[0];
          return isEmailIdContained;
        }
      ),
  });

  const handleRegister = (formValue) => {
    const { nickname, email, password } = formValue;

    dispatch(register({ nickname, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
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
                <FormField
                  placeholder="Nickname"
                  name="nickname"
                  type="text"
                  errors={errors}
                  touched={touched}
                />
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
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary pull-xs-right"
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
