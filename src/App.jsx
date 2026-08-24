import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { MoonPage } from './pages/MoonPage';
import { LoginPage } from './pages/LoginPage';
import { CreateMoonModal } from './components/CreateMoonModal';
import { LoginModal } from './components/LoginModal';
import { DesignSystemReviewModal } from './components/DesignSystemReviewModal';

/**
 * Spring Boot 서버 주소
 */
const API_BASE_URL = 'http://localhost:8080';

/**
 * 라우팅 및 전역 레이아웃 컴포넌트
 */
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // 로그인 / 인증 상태
  // =========================================================

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authProvider, setAuthProvider] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 처음 사용자 정보를 확인하기 전까지의 상태
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [isDevChuseokDay, setIsDevChuseokDay] = useState(false);

  // =========================================================
  // 모달 상태
  // =========================================================

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateMoonModalOpen, setIsCreateMoonModalOpen] =
    useState(false);
  const [isDesignReviewOpen, setIsDesignReviewOpen] = useState(false);

  // =========================================================
  // React ↔ Spring Boot 연결 확인
  // =========================================================

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/health`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log('Spring Boot 연결 성공:', data);
      })
      .catch((error) => {
        console.error('Spring Boot 연결 실패:', error);
      });
  }, []);

  // =========================================================
  // 앱 시작 시 로그인 사용자 확인
  // =========================================================

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/users/me`,
          {
            method: 'GET',

            // Spring Security 세션 쿠키를 함께 전송
            credentials: 'include',
          }
        );

        // 로그인하지 않은 사용자
        if (response.status === 401) {
          setIsLoggedIn(false);
          setAuthProvider(null);
          setCurrentUser(null);
          return;
        }

        if (!response.ok) {
          throw new Error(
            `사용자 조회 실패: HTTP ${response.status}`
          );
        }

        const user = await response.json();

        console.log('현재 로그인 사용자:', user);

        setCurrentUser(user);
        setIsLoggedIn(true);
        setAuthProvider(user.provider?.toLowerCase() ?? null);
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);

        setIsLoggedIn(false);
        setAuthProvider(null);
        setCurrentUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // =========================================================
  // OAuth 로그인 성공 후 처리
  // =========================================================

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const loginResult = params.get('login');

    if (loginResult === 'success') {
      // OAuth 로그인 후 Spring이
      // http://localhost:5173/?login=success
      // 로 돌려보냈을 경우

      fetch(`${API_BASE_URL}/api/v1/users/me`, {
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('로그인 사용자 조회 실패');
          }

          return response.json();
        })
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          setAuthProvider(
            user.provider?.toLowerCase() ?? null
          );

          setIsLoginModalOpen(false);

          // 로그인 성공 후 보름달 생성 모달
          setIsCreateMoonModalOpen(true);

          // URL의 ?login=success 제거
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('OAuth 로그인 처리 실패:', error);
        });
    }
  }, [location.search, navigate]);

  // =========================================================
  // 기존 ?moon=... 주소 호환
  // =========================================================

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryMoon = params.get('moon');

    if (
      queryMoon &&
      !location.pathname.startsWith('/moon/')
    ) {
      navigate(`/moon/${queryMoon}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  // =========================================================
  // OAuth 로그인 시작
  // =========================================================

  const handleOAuthLogin = (provider) => {
    if (provider === 'kakao') {
      window.location.href =
        `${API_BASE_URL}/oauth2/authorization/kakao`;

      return;
    }

    if (provider === 'naver') {
      window.location.href =
        `${API_BASE_URL}/oauth2/authorization/naver`;

      return;
    }

    console.error('지원하지 않는 로그인 제공자:', provider);
  };

  // =========================================================
  // 로그아웃
  // =========================================================

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(
          `로그아웃 실패: HTTP ${response.status}`
        );
      }

      setIsLoggedIn(false);
      setAuthProvider(null);
      setCurrentUser(null);

      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // =========================================================
  // 새 보름달 생성 요청
  // =========================================================

  const handleRequestCreateMoon = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsCreateMoonModalOpen(true);
  };

  // =========================================================
  // 보름달 생성 완료
  // =========================================================

  const handleCreateMoon = (newMoon) => {
    setIsCreateMoonModalOpen(false);

    navigate(`/moon/${newMoon.id}`);
  };

  // =========================================================
  // 현재 화면
  // =========================================================

  const currentView =
    location.pathname === '/' ? 'landing' : 'hero';

  // 로그인 상태 확인 중
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EE] text-[#3F315F]">
        로그인 상태 확인 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#3F315F] font-sans antialiased selection:bg-[#EADDFF] selection:text-[#3F315F] relative">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFF1C7]/30 rounded-full blur-3xl" />

        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-[#EADDFF]/25 rounded-full blur-3xl" />

        <div className="absolute bottom-10 -left-32 w-[400px] h-[400px] bg-[#E8B7C8]/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        authProvider={authProvider}
        currentUser={currentUser}
        currentView={currentView}
        isDevChuseokDay={isDevChuseokDay}
        onToggleDevChuseok={() =>
          setIsDevChuseokDay((prev) => !prev)
        }
        onOpenLogin={() =>
          setIsLoginModalOpen(true)
        }
        onLogout={handleLogout}
        onOpenCreateMoon={handleRequestCreateMoon}
        onOpenDesignReview={() =>
          setIsDesignReviewOpen(true)
        }
        onGoHome={() => navigate('/')}
      />

      {/* Main */}
      <main className="w-full flex justify-center">
        <Routes>

          {/* 랜딩 */}
          <Route
            path="/"
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onOpenLogin={() =>
                  setIsLoginModalOpen(true)
                }
                onOpenCreateMoon={
                  handleRequestCreateMoon
                }
                onExploreDemoMoon={() =>
                  navigate('/moon/demo')
                }
                isDevChuseokDay={
                  isDevChuseokDay
                }
                onToggleDevChuseok={() =>
                  setIsDevChuseokDay(
                    (prev) => !prev
                  )
                }
              />
            }
          />

          {/* 보름달 */}
          <Route
            path="/moon/:moonId"
            element={
              <MoonPage
                isLoggedIn={isLoggedIn}
                authProvider={authProvider}
                currentUser={currentUser}
                isDevChuseokDay={isDevChuseokDay}

                onOAuthLogin={handleOAuthLogin}

                onToggleDevChuseok={() =>
                  setIsDevChuseokDay((prev) => !prev)
                }

                onOpenLoginModal={() =>
                  setIsLoginModalOpen(true)
                }

                onLogout={handleLogout}
              />
            }
          />

          {/* 로그인 페이지 */}
          <Route
            path="/login"
            element={
              <LoginPage
                onOAuthLogin={
                  handleOAuthLogin
                }
              />
            }
          />

          {/* 잘못된 URL */}
          <Route
            path="*"
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onOpenLogin={() =>
                  setIsLoginModalOpen(true)
                }
                onOpenCreateMoon={
                  handleRequestCreateMoon
                }
                onExploreDemoMoon={() =>
                  navigate('/moon/demo')
                }
                isDevChuseokDay={
                  isDevChuseokDay
                }
                onToggleDevChuseok={() =>
                  setIsDevChuseokDay(
                    (prev) => !prev
                  )
                }
              />
            }
          />
        </Routes>
      </main>

      {/* 보름달 생성 */}
      <CreateMoonModal
        isOpen={isCreateMoonModalOpen}
        onClose={() =>
          setIsCreateMoonModalOpen(false)
        }
        onCreateMoon={handleCreateMoon}
      />

      {/* 로그인 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() =>
          setIsLoginModalOpen(false)
        }
        onOAuthLogin={handleOAuthLogin}
      />

      {/* 디자인 리뷰 */}
      <DesignSystemReviewModal
        isOpen={isDesignReviewOpen}
        onClose={() =>
          setIsDesignReviewOpen(false)
        }
      />
    </div>
  );
}

/**
 * 최상위 App
 */
export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
