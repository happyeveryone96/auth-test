import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from 'app/slices/auth';
import { logout } from 'app/slices/auth';
import { useLocation } from 'react-router-dom';
import LoginModal from 'app/components/LoginModal/LoginModal';
import 'app/components/Navbar/Navbar.css';
import { AppDispatch } from 'app/store';

interface AuthState {
  auth: {
    isLoggedIn: boolean;
    user: any[] | null;
  };
}

const Navbar = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const location = useLocation();
  const { pathname } = location;
  const isLecturePage = pathname === '/lecture';
  const isSettingPage = pathname === '/settings';
  const isConsultingPage = pathname === '/consulting';
  const isMentorPage = pathname === '/mentor';

  const { isLoggedIn } = useSelector((state: AuthState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  useEffect(() => {
    if (isLoggedIn && !accessToken) {
      dispatch(reset());
    }
  }, [dispatch, isLoggedIn, accessToken]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LoginModal isOpen={isModalOpen} close={closeModal} />
      <div className="nav-top">
        <div className="nav-top-left">
          <div>
            <Link to={'/'} className="navbar-brand">
              GPTUs
            </Link>
          </div>
          <input type="text" />
          <div className="search-icon">
            <img src="/images/search.png" alt="돋보기" />
          </div>
        </div>
        <div className="nav-top-right">
          {isLoggedIn ? (
            <Link to="" className="nav-link" onClick={logOut}>
              로그아웃
            </Link>
          ) : (
            <>
              <div className="login" onClick={openModal}>
                로그인
              </div>
              <div className="divider">|</div>
              <Link to="/register" className="register">
                회원가입
              </Link>
            </>
          )}

          <div className="tutor">GPTUS 선생님 되는 방법</div>
        </div>
      </div>
      <nav className="navbar navbar-expand navbar-white">
        <div className="nav-container">
          <div className="nav-container-left">
            <div className="menu">
              <img src="/images/menu.png" alt="메뉴" />
              <span>전체보기</span>
            </div>
            <div className="nav-container-center">
              <Link
                to={'/lecture'}
                className={`nav-link ${isLecturePage && 'selected'}`}
              >
                강의
              </Link>
              <Link
                to={'/consulting'}
                className={`nav-link ${isConsultingPage && 'selected'}`}
              >
                상담
              </Link>
              <Link
                to={'/mentor'}
                className={`nav-link ${isMentorPage && 'selected'}`}
              >
                강사
              </Link>
              <Link to="#" className="nav-link">
                커뮤니티
              </Link>

              {isLoggedIn && (
                <Link
                  to={'/settings'}
                  className={`nav-link ${isSettingPage && 'selected'}`}
                >
                  내정보
                </Link>
              )}
            </div>
          </div>
          <div className="nav-container-right">
            <div className="user-guide">
              <span>
                <img src="/images/guide.png" alt="이용자 가이드" />
                이용자 가이드
              </span>
            </div>
            <div className="schedule">
              <span>
                <img src="/images/star.png" alt="내강의 일정" />
                내강의 일정
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
