import React, { useState, useEffect, useCallback } from 'react';
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
import { SupportPage } from './pages/SupportPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { CreateMoonModal } from './components/CreateMoonModal';
import { NicknameModal } from './components/NicknameModal';
import { LoginModal } from './components/LoginModal';
import { DesignSystemReviewModal } from './components/DesignSystemReviewModal';
import { FriendMoonPage } from './pages/FriendMoonPage';
import { API_BASE_URL } from './config/api';

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
  const realIsAdmin = currentUser?.role === 'ADMIN';
  const [adminViewMode, setAdminViewMode] = useState('admin');
  const isAdmin = realIsAdmin && adminViewMode === 'admin';
  const isPreviewingAsUser = realIsAdmin && adminViewMode === 'user';

  // =========================================================
  // 모달 상태
  // =========================================================

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateMoonModalOpen, setIsCreateMoonModalOpen] =
    useState(false);
  const [isDesignReviewOpen, setIsDesignReviewOpen] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] =
    useState(false);

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
            `로그인 상태 확인 실패: ${response.status}`
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

    const handleOAuthLoginSuccess = async () => {
      try {

        // 1. 로그인 사용자 조회
        const userResponse = await fetch(
          `${API_BASE_URL}/api/v1/users/me`,
          {
            credentials: 'include',
          }
        );

        if (!userResponse.ok) {
          throw new Error('로그인 사용자 조회 실패');
        }

        const user = await userResponse.json();

        // 2. 로그인 상태 저장
        setCurrentUser(user);
        setIsLoggedIn(true);

        setAuthProvider(
          user.provider?.toLowerCase() ?? null
        );

        setIsLoginModalOpen(false);


        // 3. 이 사용자의 2026년 보름달이 있는지 조회
        const moonResponse = await fetch(
          `${API_BASE_URL}/api/v1/moons/me?seasonYear=2026`,
          {
            credentials: 'include',
          }
        );


        // 4. 기존 Moon이 있으면
        if (moonResponse.ok) {

          const moon = await moonResponse.json();

          console.log(
            '기존 보름달 있음:',
            moon
          );

          // 생성 모달은 열지 않음
          setIsCreateMoonModalOpen(false);

          // 기존 보름달로 이동
          navigate(`/moon/${moon.id}`, {
            replace: true,
          });

          return;
        }


        // 5. Moon이 없으면 404
        if (moonResponse.status === 404) {

          console.log(
            '기존 보름달 없음 → 생성 모달 열기'
          );

          setIsCreateMoonModalOpen(true);

          // ?login=success 제거
          navigate('/', {
            replace: true,
          });

          return;
        }


        // 404 이외의 실패
        throw new Error(
          `내 보름달 조회 실패: ${moonResponse.status}`
        );

      } catch (error) {

        console.error(
          'OAuth 로그인 처리 실패:',
          error
        );
      }
    };


    handleOAuthLoginSuccess();
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
        `${API_BASE_URL}/api/v1/auth/logout`,
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
  // 로그인 세션 만료 처리
  // =========================================================

  const handleSessionExpired = useCallback(() => {
    setIsLoggedIn(false);
    setAuthProvider(null);
    setCurrentUser(null);

    setIsLoginModalOpen(true);

    navigate('/');
  }, [navigate]);

  const navigateToMyMoonOrCreate = useCallback(async ({ replace = false } = {}) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/moons/me?seasonYear=2026`,
        {
          credentials: 'include',
        }
      );

      if (response.ok) {
        const moon = await response.json();

        navigate(`/moon/${moon.id}`, {
          replace,
        });

        return;
      }

      if (response.status === 404) {
        setIsCreateMoonModalOpen(true);
        return;
      }

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      throw new Error(`내 보름달 조회 실패: HTTP ${response.status}`);
    } catch (error) {
      console.error('내 보름달 이동 실패:', error);
    }
  }, [handleSessionExpired, navigate]);

  const handleGoHome = () => {
    if (isLoggedIn) {
      navigateToMyMoonOrCreate();
      return;
    }

    navigate('/');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (
      isAuthLoading ||
      !isLoggedIn ||
      location.pathname !== '/' ||
      params.get('login') === 'success'
    ) {
      return;
    }

    navigateToMyMoonOrCreate({
      replace: true,
    });
  }, [
    isAuthLoading,
    isLoggedIn,
    location.pathname,
    location.search,
    navigateToMyMoonOrCreate,
  ]);

  useEffect(() => {
    if (!realIsAdmin) {
      setAdminViewMode('admin');
      setIsDevChuseokDay(false);
    }
  }, [realIsAdmin]);

  const handleToggleAdminViewMode = () => {
    if (!realIsAdmin) {
      return;
    }

    setAdminViewMode((prev) => {
      const nextMode = prev === 'admin' ? 'user' : 'admin';

      if (nextMode === 'user') {
        setIsDevChuseokDay(false);
      }

      return nextMode;
    });
  };

  const handleToggleAdminChuseokPreview = () => {
    if (!isAdmin) {
      setIsDevChuseokDay(false);
      return;
    }

    setIsDevChuseokDay((prev) => !prev);
  };

  // =========================================================
  // 닉네임 변경
  // =========================================================

  const updateNickname = async (nickname) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/me/nickname`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',

        body: JSON.stringify({
          nickname: nickname,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `닉네임 변경 실패: HTTP ${response.status}`
      );
    }

    const user = await response.json();

    console.log('닉네임 변경 완료:', user);

    // 여기 중요
    // 서버에서 받은 최신 User로 로그인 사용자 갱신
    setCurrentUser(user);

    return user;
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

  const handleCreateMoon = async (ownerName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/moons`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',

          body: JSON.stringify({
            ownerName: ownerName,
            seasonYear: 2026,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `보름달 생성 실패: HTTP ${response.status}`
        );
      }

      const moon = await response.json();

      console.log('보름달 생성 완료:', moon);

      setIsCreateMoonModalOpen(false);

      navigate(`/moon/${moon.id}`);

    } catch (error) {
      console.error(
        '보름달 생성 실패:',
        error
      );
    }
  };

  // =========================================================
  // 현재 화면
  // =========================================================

  const currentView =
    location.pathname === '/' ? 'landing' : 'hero';
  const searchParams = new URLSearchParams(location.search);
  const isHandlingOAuthSuccess =
    location.pathname === '/' &&
    searchParams.get('login') === 'success';
  const shouldRedirectLoggedInHome =
    isLoggedIn &&
    location.pathname === '/' &&
    !isHandlingOAuthSuccess;
  const homeRouteElement =
    isHandlingOAuthSuccess || shouldRedirectLoggedInHome ? (
      <div className="w-full min-h-[60vh] flex items-center justify-center px-4 text-sm font-bold text-[#3F315F]">
        {isHandlingOAuthSuccess
          ? '로그인 처리 중...'
          : '내 보름달로 이동 중...'}
      </div>
    ) : (
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
        isDevChuseokDay={isAdmin && isDevChuseokDay}
        onToggleDevChuseok={isAdmin ? handleToggleAdminChuseokPreview : undefined}
      />
    );

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
        isAdmin={isAdmin}
        realIsAdmin={realIsAdmin}
        adminViewMode={adminViewMode}
        onToggleAdminViewMode={handleToggleAdminViewMode}
        currentView={currentView}
        isDevChuseokDay={isDevChuseokDay}
        onToggleDevChuseok={handleToggleAdminChuseokPreview}
        onOpenLogin={() =>
          setIsLoginModalOpen(true)
        }
        onLogout={handleLogout}
        onOpenCreateMoon={handleRequestCreateMoon}
        onOpenDesignReview={() =>
          setIsDesignReviewOpen(true)
        }
        onGoHome={handleGoHome}
      />

      {/* Main */}
      <main className="w-full flex justify-center">
        <Routes>

          {/* 랜딩 */}
          <Route
            path="/"
            element={homeRouteElement}
          />

          {/* 보름달 */}
          <Route
            path="/moon/:moonId"
            element={
              <MoonPage
                isLoggedIn={isLoggedIn}
                authProvider={authProvider}
                currentUser={currentUser}
                onSessionExpired={handleSessionExpired}
                isAdmin={isAdmin}
                previewAsUser={isPreviewingAsUser}
                isDevChuseokDay={isAdmin && isDevChuseokDay}
                onOAuthLogin={handleOAuthLogin}
                onOpenNicknameModal={() =>
                  setIsNicknameModalOpen(true)
                }
                onToggleDevChuseok={isAdmin ? handleToggleAdminChuseokPreview : undefined}
                onOpenLoginModal={() =>
                  setIsLoginModalOpen(true)
                }
                onLogout={handleLogout}
              />
            }
          />

          {/* 친구가 공유 링크로 들어오는 보름달 */}
          <Route
            path="/share/:shareToken"
            element={
              <FriendMoonPage />
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

          <Route
            path="/support"
            element={
              <SupportPage
                onBack={() => navigate(-1)}
              />
            }
          />

          <Route
            path="/terms"
            element={
              <TermsPage
                onBack={() => navigate(-1)}
              />
            }
          />

          <Route
            path="/privacy"
            element={
              <PrivacyPage
                onBack={() => navigate(-1)}
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
                isDevChuseokDay={isAdmin && isDevChuseokDay}
                onToggleDevChuseok={isAdmin ? handleToggleAdminChuseokPreview : undefined}
              />
            }
          />
        </Routes>
      </main>

      {/* 보름달 생성 */}
      <CreateMoonModal
        isOpen={isCreateMoonModalOpen}
        onClose={() => setIsCreateMoonModalOpen(false)}
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

      {/* 닉네임 설정 / 수정 */}
      <NicknameModal
        isOpen={isNicknameModalOpen}
        currentNickname={currentUser?.nickname ?? ''}
        onClose={() =>
          setIsNicknameModalOpen(false)
        }
        onSave={updateNickname}
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
