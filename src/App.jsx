import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { MoonPage } from './pages/MoonPage';
import { LoginPage } from './pages/LoginPage';
import { CreateMoonModal } from './components/CreateMoonModal';
import { LoginModal } from './components/LoginModal';
import { DesignSystemReviewModal } from './components/DesignSystemReviewModal';
import { INITIAL_MOCK_MESSAGES } from './data/verses';

/**
 * 라우팅 및 전역 레이아웃 컴포넌트
 */
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 및 인증 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authProvider, setAuthProvider] = useState(null); // 'developer' | 'kakao' | 'naver' | null
  const [isDevChuseokDay, setIsDevChuseokDay] = useState(false);

  // 모달 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateMoonModalOpen, setIsCreateMoonModalOpen] = useState(false);
  const [isDesignReviewOpen, setIsDesignReviewOpen] = useState(false);

  // 구버전 쿼리스트링(?moon=...)이 URL에 남아있는 경우 /moon/:moonId 로 리다이렉트
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryMoon = params.get('moon');
    if (queryMoon && !location.pathname.startsWith('/moon/')) {
      navigate(`/moon/${queryMoon}`, { replace: true });
    }
  }, [location, navigate]);

  // 로그인 성공 핸들러
  const handleLoginSuccess = (userInfo) => {
    setIsLoggedIn(true);
    setAuthProvider(userInfo?.provider || 'developer');
    setIsLoginModalOpen(false);

    if (userInfo?.provider === 'developer') {
      const devMoonId = 'moon-developer';
      const storedMoons = localStorage.getItem('dama_all_moons');
      let existingDevMoon = null;
      if (storedMoons) {
        try {
          const parsed = JSON.parse(storedMoons);
          existingDevMoon = parsed[devMoonId];
        } catch {
          // ignore
        }
      }

      const devMoon = existingDevMoon || {
        id: devMoonId,
        ownerName: '개발자',
        targetCount: 15,
        messages: INITIAL_MOCK_MESSAGES,
        dDay: '추석까지 D-12',
      };

      // 보존
      const moonsMap = storedMoons ? JSON.parse(storedMoons) : {};
      moonsMap[devMoon.id] = devMoon;
      localStorage.setItem('dama_all_moons', JSON.stringify(moonsMap));
      localStorage.setItem('dama_current_moon', JSON.stringify(devMoon));

      navigate(`/moon/${devMoon.id}`);
      setIsCreateMoonModalOpen(false);
    } else {
      // 일반 소셜 로그인(카카오/네이버) 시 보름달 생성 모달 열기
      setIsCreateMoonModalOpen(true);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthProvider(null);
    navigate('/');
  };

  // 새 보름달 생성 요청 (헤더 또는 랜딩페이지에서 호출)
  const handleRequestCreateMoon = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      setIsCreateMoonModalOpen(true);
    }
  };

  // 보름달 생성 완료 핸들러
  const handleCreateMoon = (newMoon) => {
    setIsLoggedIn(true);
    setIsCreateMoonModalOpen(false);
    navigate(`/moon/${newMoon.id}`);
  };

  // 현재 화면 판단 (헤더 도구 표시용)
  const currentView = location.pathname === '/' ? 'landing' : 'hero';

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#3F315F] font-sans antialiased selection:bg-[#EADDFF] selection:text-[#3F315F] relative">
      {/* Subtle Background Gradient & Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFF1C7]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-[#EADDFF]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-32 w-[400px] h-[400px] bg-[#E8B7C8]/20 rounded-full blur-3xl" />
      </div>

      {/* Global Header */}
      <Header
        isLoggedIn={isLoggedIn}
        authProvider={authProvider}
        currentView={currentView}
        isDevChuseokDay={isDevChuseokDay}
        onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenCreateMoon={handleRequestCreateMoon}
        onOpenDesignReview={() => setIsDesignReviewOpen(true)}
        onGoHome={() => navigate('/')}
      />

      {/* Main Routed Content */}
      <main className="w-full flex justify-center">
        <Routes>
          {/* 1. 랜딩 페이지 */}
          <Route
            path="/"
            element={
              <LandingPage
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenCreateMoon={handleRequestCreateMoon}
                onExploreDemoMoon={() => navigate('/moon/demo')}
                isDevChuseokDay={isDevChuseokDay}
                onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
              />
            }
          />

          {/* 2. 보름달 상세 및 말씀 남기기 페이지 */}
          <Route
            path="/moon/:moonId"
            element={
              <MoonPage
                isLoggedIn={isLoggedIn}
                authProvider={authProvider}
                isDevChuseokDay={isDevChuseokDay}
                onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
                onLoginSuccess={handleLoginSuccess}
                onOpenLoginModal={() => setIsLoginModalOpen(true)}
                onLogout={handleLogout}
              />
            }
          />

          {/* 3. 독립 로그인 페이지 */}
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <LandingPage
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onOpenCreateMoon={handleRequestCreateMoon}
                onExploreDemoMoon={() => navigate('/moon/demo')}
                isDevChuseokDay={isDevChuseokDay}
                onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
              />
            }
          />
        </Routes>
      </main>

      {/* Modals */}
      <CreateMoonModal
        isOpen={isCreateMoonModalOpen}
        onClose={() => setIsCreateMoonModalOpen(false)}
        onCreateMoon={handleCreateMoon}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <DesignSystemReviewModal
        isOpen={isDesignReviewOpen}
        onClose={() => setIsDesignReviewOpen(false)}
      />
    </div>
  );
}

/**
 * 최상위 App 컴포넌트: Router Provider 래핑
 */
export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
