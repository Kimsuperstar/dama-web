import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { HeroMoonSection } from './components/HeroMoonSection';
import { Step1ChooseVerseMethod } from './components/LeaveVerseFlow/Step1ChooseVerseMethod';
import { Step1SelectVerse } from './components/LeaveVerseFlow/Step1SelectVerse';
import { Step1WriteVerse } from './components/LeaveVerseFlow/Step1WriteVerse';
import { Step2WriteMessage } from './components/LeaveVerseFlow/Step2WriteMessage';
import { Step3ConfirmSend } from './components/LeaveVerseFlow/Step3ConfirmSend';
import { ViewVersesModal } from './components/ViewVersesModal';
import { CreateMoonModal } from './components/CreateMoonModal';
import { LoginModal } from './components/LoginModal';
import { DesignSystemReviewModal } from './components/DesignSystemReviewModal';
import { HEART_CATEGORIES, INITIAL_BIBLE_VERSES, INITIAL_MOCK_MESSAGES } from './data/verses';

/**
 * 담아(Dama) 메인 애플리케이션 컴포넌트
 */
export function App() {
  // 보름달 데이터 저장소 (로컬 스토리지에 moonId 별로 저장)
  const [moonData, setMoonData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMoonId = params.get('moon');

    // 1. URL 파라미터가 있는 경우
    if (urlMoonId) {
      const storedMoons = localStorage.getItem('dama_all_moons');
      if (storedMoons) {
        try {
          const parsed = JSON.parse(storedMoons);
          if (parsed[urlMoonId]) {
            return parsed[urlMoonId];
          }
        } catch {
          // ignore
        }
      }
      // URL ID로 존재하지 않으면 해당 ID를 가진 새 보름달 객체로 생성
      return {
        id: urlMoonId,
        ownerName: '소망',
        targetCount: 15,
        messages: [],
        dDay: '추석까지 D-12',
      };
    }

    // 2. 현재 로그인/생성되어 보존된 보름달이 있는 경우
    const savedCurrent = localStorage.getItem('dama_current_moon');
    if (savedCurrent) {
      try {
        return JSON.parse(savedCurrent);
      } catch {
        // fallback
      }
    }

    // 3. 기본 예시 보름달
    return {
      id: 'demo',
      ownerName: '소망',
      targetCount: 15,
      messages: INITIAL_MOCK_MESSAGES,
      dDay: '추석까지 D-12',
    };
  });

  // 상태 보존 (현재 활성 보름달 및 전체 보름달 레지스트리에 저장)
  useEffect(() => {
    if (moonData && moonData.id) {
      localStorage.setItem('dama_current_moon', JSON.stringify(moonData));

      // 전체 보름달 맵에도 함께 업데이트
      const storedMoons = localStorage.getItem('dama_all_moons');
      let moonsMap = {};
      if (storedMoons) {
        try {
          moonsMap = JSON.parse(storedMoons);
        } catch {
          moonsMap = {};
        }
      }
      moonsMap[moonData.id] = moonData;
      localStorage.setItem('dama_all_moons', JSON.stringify(moonsMap));
    }
  }, [moonData]);

  // 플로우 뷰 모드 ('landing' | 'hero' | 'step1' | 'step2' | 'step3')
  // URL에 ?moon= 파라미터가 있으면 즉시 해당 보름달 방문자 뷰로 진입, 없으면 랜딩페이지
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('moon')) {
      return 'hero';
    }
    return 'landing';
  });

  // URL 쿼리 파라미터 감지 및 브라우저 URL 동기화
  const navigateTo = (view, moonId = null) => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    if (view === 'landing') {
      url.searchParams.delete('moon');
    } else if (moonId) {
      url.searchParams.set('moon', moonId);
    } else if (moonData?.id) {
      url.searchParams.set('moon', moonData.id);
    }
    window.history.pushState({}, '', url.toString());
  };

  // 브라우저 뒤로가기/앞으로가기(popstate) 이벤트 처리
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlMoonId = params.get('moon');
      if (urlMoonId) {
        setCurrentView('hero');
        setUserRole('visitor');
        const storedMoons = localStorage.getItem('dama_all_moons');
        if (storedMoons) {
          try {
            const parsed = JSON.parse(storedMoons);
            if (parsed[urlMoonId]) {
              setMoonData(parsed[urlMoonId]);
            }
          } catch {
            // ignore
          }
        }
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 초기 URL 쿼리 파라미터 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMoonId = params.get('moon');
    if (urlMoonId) {
      setCurrentView('hero');
      setUserRole('visitor');

      // 해당 moonId 로드
      const storedMoons = localStorage.getItem('dama_all_moons');
      if (storedMoons) {
        try {
          const parsed = JSON.parse(storedMoons);
          if (parsed[urlMoonId]) {
            setMoonData(parsed[urlMoonId]);
          }
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // 모달 상태
  const [isViewVersesOpen, setIsViewVersesOpen] = useState(false);
  const [isCreateMoonOpen, setIsCreateMoonOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDesignReviewOpen, setIsDesignReviewOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authProvider, setAuthProvider] = useState(null); // 'developer' | 'kakao' | 'naver' | null
  const [isDevChuseokDay, setIsDevChuseokDay] = useState(false);
  const [userRole, setUserRole] = useState('visitor'); // 기본 비로그인 시점: 'visitor', 로그인 시: 'owner'

  // 말씀 남기기 폼 상태
  const [selectedCategory, setSelectedCategory] = useState('응원');
  const [selectedVerse, setSelectedVerse] = useState(INITIAL_BIBLE_VERSES[0]);
  const [personalMessage, setPersonalMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // 로그아웃 핸들러 - 로그아웃 시 즉시 랜딩페이지로 이동 및 URL 클리어
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthProvider(null);
    setUserRole('visitor');
    navigateTo('landing');
  };

  // 말씀 전송 핸들러
  const handleConfirmSend = () => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      moonId: moonData.id,
      category: selectedCategory,
      verseReference: selectedVerse?.reference || '빌립보서 4:13',
      verseText: selectedVerse?.verse || '',
      personalMessage: personalMessage.trim(),
      authorName: authorName.trim() || '친구',
      isAnonymous: isAnonymous,
      createdAt: '오늘',
    };

    setMoonData((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
    }));
  };

  // 새 보름달 생성 요청 (로그인 필수)
  const handleRequestCreateMoon = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
    } else {
      setIsCreateMoonOpen(true);
    }
  };

  // 로그인 성공 핸들러
  // 1) 개발자/테스트용 원클릭 로그인 시: '개발자의 보름달'이 이미 만들어진 상태로 바로 내 보름달 화면으로 이동 (모달 안 뜸)
  // 2) 일반 소셜 로그인(카카오, 네이버) 시: 로그인 후 나만의 보름달을 만들 수 있도록 보름달 생성 모달 오픈
  const handleLoginSuccess = (userInfo) => {
    setIsLoggedIn(true);
    setAuthProvider(userInfo?.provider || 'developer');
    setUserRole('owner');

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

      setMoonData(devMoon);
      navigateTo('hero', devMoon.id);
      setIsCreateMoonOpen(false);
    } else {
      // 일반 소셜 로그인(카카오/네이버)은 원래대로 보름달 만들기 모달 오픈
      navigateTo('hero', moonData?.id);
      setIsCreateMoonOpen(true);
    }
  };

  // 새 보름달 생성 완료 핸들러
  const handleCreateMoon = (newMoon) => {
    setMoonData(newMoon);
    setIsLoggedIn(true);
    setUserRole('owner');
    navigateTo('hero', newMoon.id);
  };

  // 플로우 초기화 / 홈으로 이동
  const resetLeaveVerseFlow = () => {
    navigateTo(isLoggedIn ? 'hero' : 'landing');
    setSelectedCategory('응원');
    setSelectedVerse(INITIAL_BIBLE_VERSES[0]);
    setPersonalMessage('');
    setAuthorName('');
    setIsAnonymous(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#3F315F] font-sans antialiased selection:bg-[#EADDFF] selection:text-[#3F315F] relative">
      {/* Background Subtle Gradient & Light */}
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
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onOpenCreateMoon={handleRequestCreateMoon}
        onOpenDesignReview={() => setIsDesignReviewOpen(true)}
        onGoHome={resetLeaveVerseFlow}
      />

      {/* Main Content Area */}
      <main className="w-full flex justify-center">
        {/* 비로그인 기본 랜딩 페이지 */}
        {currentView === 'landing' && (
          <LandingPage
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenCreateMoon={handleRequestCreateMoon}
            onExploreDemoMoon={() => {
              setUserRole('visitor');
              navigateTo('hero', 'demo');
            }}
            isDevChuseokDay={isDevChuseokDay}
            onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
          />
        )}

        {/* 보름달 상세 화면 (주인 시점 / 친구 방문자 시점) */}
        {currentView === 'hero' && (
          <HeroMoonSection
            isLoggedIn={isLoggedIn}
            authProvider={authProvider}
            moonData={moonData}
            userRole={userRole}
            onChangeUserRole={setUserRole}
            isDevChuseokDay={isDevChuseokDay}
            onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
            onOpenLeaveVerse={() => setCurrentView('chooseMethod')}
            onOpenViewVerses={() => setIsViewVersesOpen(true)}
            onOpenCreateMoon={handleRequestCreateMoon}
            onBackToLanding={() => navigateTo('landing')}
          />
        )}

        {/* 말씀 선택 방법 고르기 화면 (첫 화면) */}
        {currentView === 'chooseMethod' && (
          <Step1ChooseVerseMethod
            recipientName={moonData.ownerName}
            onChooseBrowse={() => setCurrentView('selectBrowse')}
            onChooseWrite={() => setCurrentView('selectWrite')}
            onBack={() => setCurrentView('hero')}
          />
        )}

        {/* 경로 1: 말씀 찾아보기 (검색창 + 감정 카테고리 + 추천 말씀) */}
        {currentView === 'selectBrowse' && (
          <Step1SelectVerse
            recipientName={moonData.ownerName}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedVerse={selectedVerse}
            onSelectVerse={setSelectedVerse}
            onNext={() => setCurrentView('step2')}
            onBack={() => setCurrentView('chooseMethod')}
          />
        )}

        {/* 경로 2: 직접 입력하기 (성경 구절 + 말씀 본문 입력) */}
        {currentView === 'selectWrite' && (
          <Step1WriteVerse
            recipientName={moonData.ownerName}
            onSaveAndNext={(customVerse, category) => {
              setSelectedVerse(customVerse);
              setSelectedCategory(category);
              setCurrentView('step2');
            }}
            onBack={() => setCurrentView('chooseMethod')}
          />
        )}

        {/* 공통 2단계: 메시지 작성 */}
        {currentView === 'step2' && (
          <Step2WriteMessage
            recipientName={moonData.ownerName}
            selectedVerse={selectedVerse}
            personalMessage={personalMessage}
            onChangePersonalMessage={setPersonalMessage}
            authorName={authorName}
            onChangeAuthorName={setAuthorName}
            isAnonymous={isAnonymous}
            onToggleAnonymous={setIsAnonymous}
            onNext={() => setCurrentView('step3')}
            onBack={() => {
              if (selectedVerse?.source === 'manual') {
                setCurrentView('selectWrite');
              } else {
                setCurrentView('selectBrowse');
              }
            }}
            onEditVerse={() => {
              if (selectedVerse?.source === 'manual') {
                setCurrentView('selectWrite');
              } else {
                setCurrentView('selectBrowse');
              }
            }}
          />
        )}

        {/* 공통 3단계: 최종 확인 및 전송 */}
        {currentView === 'step3' && (
          <Step3ConfirmSend
            recipientName={moonData.ownerName}
            category={selectedCategory}
            selectedVerse={selectedVerse}
            personalMessage={personalMessage}
            authorName={authorName}
            isAnonymous={isAnonymous}
            totalMessagesCount={moonData.messages.length}
            onConfirmSend={handleConfirmSend}
            onBack={() => setCurrentView('step2')}
            onClose={resetLeaveVerseFlow}
            onOpenCreateMoon={() => {
              resetLeaveVerseFlow();
              handleRequestCreateMoon();
            }}
          />
        )}
      </main>

      {/* Modals */}
      <ViewVersesModal
        isOpen={isViewVersesOpen}
        onClose={() => setIsViewVersesOpen(false)}
        moonData={moonData}
        isOwner={userRole === 'owner'}
        isDevChuseokDay={isDevChuseokDay}
        onToggleDevChuseok={() => setIsDevChuseokDay((prev) => !prev)}
      />

      <CreateMoonModal
        isOpen={isCreateMoonOpen}
        onClose={() => setIsCreateMoonOpen(false)}
        onCreateMoon={handleCreateMoon}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <DesignSystemReviewModal
        isOpen={isDesignReviewOpen}
        onClose={() => setIsDesignReviewOpen(false)}
      />
    </div>
  );
}

export default App;
