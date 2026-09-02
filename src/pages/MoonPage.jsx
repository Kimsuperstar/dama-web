import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeroMoonSection } from '../components/HeroMoonSection';
import { Step1ChooseVerseMethod } from '../features/leaveVerse/Step1ChooseVerseMethod';
import { Step1SelectVerse } from '../features/leaveVerse/Step1SelectVerse';
import { Step1WriteVerse } from '../features/leaveVerse/Step1WriteVerse';
import { Step2WriteMessage } from '../features/leaveVerse/Step2WriteMessage';
import { Step3ConfirmSend } from '../features/leaveVerse/Step3ConfirmSend';
import { ViewVersesModal } from '../components/ViewVersesModal';
import { CreateMoonModal } from '../components/CreateMoonModal';
import { LoginModal } from '../components/LoginModal';
import { INITIAL_BIBLE_VERSES, INITIAL_MOCK_MESSAGES } from '../data/verses';

/**
 * 특정 보름달 상세 및 말씀 남기기 인터랙션 페이지 (경로: /moon/:moonId)
 */
export function MoonPage({
  isLoggedIn = false,
  authProvider = null,
  currentUser = null,
  isDevChuseokDay = false,
  onToggleDevChuseok,
  onOAuthLogin,
  onOpenLoginModal,
  onOpenNicknameModal,
  onLogout,
  onSessionExpired,
}) {
  const { moonId } = useParams();
  const navigate = useNavigate();

  // 보름달 데이터
  const [moonData, setMoonData] = useState(null);

  const API_BASE_URL = 'http://localhost:8080';

 // =========================================================
  // moonId가 변경되면 실제 Spring Boot에서 Moon 조회
  // =========================================================
  useEffect(() => {

    const fetchMoon = async () => {

      // 데모 Moon
      if (moonId === 'demo') {
        setMoonData({
          id: 'demo',
          ownerName: '소망',
          targetCount: 15,
          messages: INITIAL_MOCK_MESSAGES,
          dDay: '추석까지 D-12',
        });

        return;
      }


      // 개발용 Moon
      if (moonId === 'moon-developer') {
        setMoonData({
          id: 'moon-developer',
          ownerName: '개발자',
          targetCount: 15,
          messages: INITIAL_MOCK_MESSAGES,
          dDay: '추석까지 D-12',
        });

        return;
      }


      try {

        // =====================================================
        // 1. Moon 정보 조회
        // =====================================================

        const response = await fetch(
          `${API_BASE_URL}/api/v1/moons/${moonId}`,
          {
            credentials: 'include',
          }
        );


        // 로그인 세션 만료
        if (response.status === 401) {
          onSessionExpired?.();
          return;
        }


        if (!response.ok) {
          throw new Error(
            `보름달 조회 실패: ${response.status}`
          );
        }


        const moon =
          await response.json();


        console.log(
          '서버에서 조회한 Moon:',
          moon
        );


        // =====================================================
        // 2. 받은 말씀 목록 조회
        // =====================================================

        const messagesResponse = await fetch(
          `${API_BASE_URL}/api/v1/moons/${moonId}/messages`,
          {
            credentials: 'include',
          }
        );


        if (messagesResponse.status === 401) {
          onSessionExpired?.();
          return;
        }


        if (!messagesResponse.ok) {
          throw new Error(
            `받은 말씀 조회 실패: ${messagesResponse.status}`
          );
        }


        const messages =
          await messagesResponse.json();


        console.log(
          '받은 말씀 목록:',
          messages
        );


        // =====================================================
        // 3. 화면에 사용할 Moon 데이터 완성
        // =====================================================

        setMoonData({
          ...moon,

          targetCount: 15,

          // 실제 DB 데이터
          messages: messages,

          dDay: '추석까지 D-12',
        });


      } catch (error) {

        console.error(
          '보름달 조회 실패:',
          error
        );
      }
    };


    fetchMoon();

  }, [moonId]);

  // 사용자 권한 상태 ('visitor' | 'owner')
  const [userRole, setUserRole] = useState(() => {
    if (isLoggedIn) return 'owner';
    return 'visitor';
  });

  // 말씀 남기기 Flow 상태 ('hero' | 'chooseMethod' | 'selectBrowse' | 'selectWrite' | 'step2' | 'step3')
  const [leaveFlowStep, setLeaveFlowStep] = useState('hero');

  // 모달 상태
  const [isViewVersesOpen, setIsViewVersesOpen] = useState(false);
  const [isCreateMoonOpen, setIsCreateMoonOpen] = useState(false);
  const [isLocalLoginOpen, setIsLocalLoginOpen] = useState(false);

  // 말씀 남기기 폼 상태
  const [selectedCategory, setSelectedCategory] = useState('응원');
  const [selectedVerse, setSelectedVerse] = useState(INITIAL_BIBLE_VERSES[0]);
  const [personalMessage, setPersonalMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // 말씀 전송 완료 핸들러
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

  // 플로우 초기화
  const resetLeaveVerseFlow = () => {
    setLeaveFlowStep('hero');
    setSelectedCategory('응원');
    setSelectedVerse(INITIAL_BIBLE_VERSES[0]);
    setPersonalMessage('');
    setAuthorName('');
    setIsAnonymous(false);
  };

  // 새 보름달 생성 요청 (로그인 필수)
  const handleRequestCreateMoon = () => {
    if (!isLoggedIn) {
      if (onOpenLoginModal) {
        onOpenLoginModal();
      } else {
        setIsLocalLoginOpen(true);
      }
    } else {
      setIsCreateMoonOpen(true);
    }
  };

  // 새 보름달 생성 완료 핸들러
  const handleCreateMoon = (newMoon) => {
    setMoonData(newMoon);
    setUserRole('owner');
    navigate(`/moon/${newMoon.id}`);
  };

  if (!moonData) {
    return (
      <div className="w-full flex justify-center">
        보름달을 불러오는 중...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      {/* 1. 보름달 히어로 메인 화면 */}
      {leaveFlowStep === 'hero' && (
        <HeroMoonSection
          isLoggedIn={isLoggedIn}
          authProvider={authProvider}
          currentUser={currentUser}
          moonData={moonData}
          userRole={userRole}
          onChangeUserRole={setUserRole}
          isDevChuseokDay={isDevChuseokDay}
          onToggleDevChuseok={onToggleDevChuseok}
          onOpenLeaveVerse={() => setLeaveFlowStep('chooseMethod')}
          onOpenViewVerses={() => setIsViewVersesOpen(true)}
          onOpenCreateMoon={handleRequestCreateMoon}
          onOpenNicknameModal={onOpenNicknameModal}
          onBackToLanding={() => navigate('/')}
        />
      )}

      {/* 2. 말씀 남기기 Flow - Step 1: 말씀 선택 방법 고르기 */}
      {leaveFlowStep === 'chooseMethod' && (
        <Step1ChooseVerseMethod
          recipientName={moonData.ownerName}
          onChooseBrowse={() => setLeaveFlowStep('selectBrowse')}
          onChooseWrite={() => setLeaveFlowStep('selectWrite')}
          onBack={() => setLeaveFlowStep('hero')}
        />
      )}

      {/* 2-A. 말씀 찾아보기 (검색 & 추천) */}
      {leaveFlowStep === 'selectBrowse' && (
        <Step1SelectVerse
          recipientName={moonData.ownerName}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedVerse={selectedVerse}
          onSelectVerse={setSelectedVerse}
          onNext={() => setLeaveFlowStep('step2')}
          onBack={() => setLeaveFlowStep('chooseMethod')}
        />
      )}

      {/* 2-B. 직접 입력하기 (자유 작성) */}
      {leaveFlowStep === 'selectWrite' && (
        <Step1WriteVerse
          recipientName={moonData.ownerName}
          onSaveAndNext={(customVerse, category) => {
            setSelectedVerse(customVerse);
            setSelectedCategory(category);
            setLeaveFlowStep('step2');
          }}
          onBack={() => setLeaveFlowStep('chooseMethod')}
        />
      )}

      {/* 3. 말씀 남기기 Flow - Step 2: 메시지 작성 */}
      {leaveFlowStep === 'step2' && (
        <Step2WriteMessage
          recipientName={moonData.ownerName}
          selectedVerse={selectedVerse}
          personalMessage={personalMessage}
          onChangePersonalMessage={setPersonalMessage}
          authorName={authorName}
          onChangeAuthorName={setAuthorName}
          isAnonymous={isAnonymous}
          onToggleAnonymous={setIsAnonymous}
          onNext={() => setLeaveFlowStep('step3')}
          onBack={() => {
            if (selectedVerse?.source === 'manual') {
              setLeaveFlowStep('selectWrite');
            } else {
              setLeaveFlowStep('selectBrowse');
            }
          }}
          onEditVerse={() => {
            if (selectedVerse?.source === 'manual') {
              setLeaveFlowStep('selectWrite');
            } else {
              setLeaveFlowStep('selectBrowse');
            }
          }}
        />
      )}

      {/* 4. 말씀 남기기 Flow - Step 3: 최종 확인 및 전송 */}
      {leaveFlowStep === 'step3' && (
        <Step3ConfirmSend
          recipientName={moonData.ownerName}
          category={selectedCategory}
          selectedVerse={selectedVerse}
          personalMessage={personalMessage}
          authorName={authorName}
          isAnonymous={isAnonymous}
          totalMessagesCount={moonData.messages.length}
          onConfirmSend={handleConfirmSend}
          onBack={() => setLeaveFlowStep('step2')}
          onClose={resetLeaveVerseFlow}
          onOpenCreateMoon={() => {
            resetLeaveVerseFlow();
            handleRequestCreateMoon();
          }}
        />
      )}

      {/* Modals */}
      <ViewVersesModal
        isOpen={isViewVersesOpen}
        onClose={() => setIsViewVersesOpen(false)}
        moonData={moonData}
        isOwner={userRole === 'owner'}
        isDevChuseokDay={isDevChuseokDay}
        onToggleDevChuseok={onToggleDevChuseok}
      />

      <CreateMoonModal
        isOpen={isCreateMoonOpen}
        onClose={() => setIsCreateMoonOpen(false)}
        onCreateMoon={handleCreateMoon}
      />

      <LoginModal
        isOpen={isLocalLoginOpen}
        onClose={() => setIsLocalLoginOpen(false)}
        onOAuthLogin={onOAuthLogin}
      />
    </div>
  );
}
