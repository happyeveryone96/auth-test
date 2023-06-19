import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Navbar.css";

import { logout } from "../../slices/auth";

const Navbar = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  return (
    <nav className="navbar navbar-expand navbar-white">
      <div className="nav-container">
        <div>
          <Link to={"/"} className="navbar-brand">
            DataUs
          </Link>
        </div>

        <div>
          <div className="nav nav-pills outline-active">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link ">
                    {user.username || user.name}
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
                  <Link to={"/login"} className="nav-link">
                    Sign in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
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
