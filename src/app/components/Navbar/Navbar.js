import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "app/slices/auth";
import { logout } from "app/slices/auth";
import { useLocation } from "react-router-dom";

import "app/components/Navbar/Navbar.css";

const Navbar = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const location = useLocation();
  const { pathname } = location;
  const isSignUpPage = pathname === "/register";
  const isSignInPage = pathname === "/login";
  const isLecturePage = pathname === "/lecture";
  const isSettingPage = pathname === "/settings";
  const isConsultingPage = pathname === "/consulting";
  const isMentorPage = pathname === "/mentor";

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(reset());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  return (
    <nav className="navbar navbar-expand navbar-white">
      <div className="nav-container">
        <div>
          <Link to={"/"} className="navbar-brand">
            GPTUs
          </Link>
        </div>

        <div>
          <div className="nav ">
            <li className="nav-item ">
              <Link
                to={"/lecture"}
                className={`nav-link ${isLecturePage && "selected"}`}
              >
                Lecture
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/consulting"}
                className={`nav-link ${isConsultingPage && "selected"}`}
              >
                Consulting
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/mentor"}
                className={`nav-link ${isMentorPage && "selected"}`}
              >
                Mentor
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    to={"/settings"}
                    className={`nav-link ${isSettingPage && "selected"}`}
                  >
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="" className="nav-link" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to={"/login"}
                    className={`nav-link ${isSignInPage && "selected"}`}
                  >
                    Sign in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to={"/register"}
                    className={`nav-link ${isSignUpPage && "selected"}`}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
