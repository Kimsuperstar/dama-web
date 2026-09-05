import { useEffect, useState } from 'react';

import {
    useParams, useNavigate,
} from 'react-router-dom';

import { HeroMoonSection } from '../components/HeroMoonSection';

import {
    Step1ChooseVerseMethod,
} from '../features/leaveVerse/Step1ChooseVerseMethod';

import {
    Step1SelectVerse,
} from '../features/leaveVerse/Step1SelectVerse';

import {
    Step1WriteVerse,
} from '../features/leaveVerse/Step1WriteVerse';

import {
    Step2WriteMessage,
} from '../features/leaveVerse/Step2WriteMessage';

import {
    Step3ConfirmSend,
} from '../features/leaveVerse/Step3ConfirmSend';

import { HEART_CATEGORIES } from '../data/verses';
import { API_BASE_URL } from '../config/api';

function FriendMoonPage() {

    const { shareToken } = useParams();
    const navigate = useNavigate();


    // =========================================================
    // 보름달 데이터
    // =========================================================

    const [moon, setMoon] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // =========================================================
    // 말씀 남기기 Flow
    // =========================================================

    const [leaveFlowStep, setLeaveFlowStep] =
        useState('hero');


    // =========================================================
    // 말씀 작성 상태
    // =========================================================

    const [selectedCategory, setSelectedCategory] =
        useState('응원');

    const [verses, setVerses] = useState([]);

    const [selectedVerse, setSelectedVerse] = useState(null);

    const [personalMessage, setPersonalMessage] =
        useState('');

    const [authorName, setAuthorName] =
        useState('');

    const [isAnonymous, setIsAnonymous] =
        useState(false);


    // =========================================================
    // 말씀 보기 모달
    // =========================================================

    // =========================================================
    // 공유 토큰으로 Moon 조회
    // =========================================================

    useEffect(() => {

        const fetchMoon = async () => {

            try {

                const response = await fetch(
                    `${API_BASE_URL}/api/v1/moons/share/${shareToken}`
                );

                if (!response.ok) {

                    throw new Error(
                        `보름달 조회 실패: ${response.status}`
                    );
                }


                const data = await response.json();


                // 받은 말씀 개수 조회
                const countResponse = await fetch(
                    `${API_BASE_URL}/api/v1/moons/share/${shareToken}/messages/count`
                );

                if (!countResponse.ok) {
                    throw new Error(
                        `받은 말씀 개수 조회 실패: ${countResponse.status}`
                    );
                }

                const messageCount =
                    await countResponse.json();


                setMoon({
                    ...data,

                    targetCount: 15,

                    // 공유 페이지에서는 본문은 가져오지 않음
                    messages: [],

                    // 개수만 서버에서 가져옴
                    messageCount: messageCount,

                    dDay: '추석까지 D-12',
                });


            } catch (error) {

                console.error(error);

                setError(
                    '보름달을 불러오지 못했습니다.'
                );


            } finally {

                setLoading(false);
            }
        };


        fetchMoon();

    }, [shareToken]);

    // =========================================================
    // 말씀 목록 조회
    // =========================================================

    useEffect(() => {

        const fetchVerses = async () => {

            try {

                const response = await fetch(
                    `${API_BASE_URL}/api/v1/verses`
                );

                if (!response.ok) {

                    throw new Error(
                        `말씀 조회 실패: HTTP ${response.status}`
                    );
                }

                const data =
                    await response.json();

                setVerses(data);

                // 처음 들어왔을 때 첫 번째 말씀 기본 선택
                if (data.length > 0) {
                    setSelectedVerse(data[0]);
                }

            } catch (error) {

                console.error(
                    '말씀 조회 실패:',
                    error
                );
            }
        };

        fetchVerses();

    }, []);


    // =========================================================
    // 말씀 전송 완료
    // =========================================================

    const handleConfirmSend = async () => {
        try {

            // 직접 입력했는지, 기존 말씀을 선택했는지 판단
            const isManual =
                selectedVerse?.source === 'manual';


            // =====================================================
            // 화면의 한글 카테고리를 서버 Enum 값으로 변환
            // 예: "응원" -> "ENCOURAGE"
            // =====================================================

            const categoryItem =
                HEART_CATEGORIES.find(
                    (category) =>
                        category.id === selectedCategory
                );

            if (!categoryItem) {
                throw new Error(
                    `카테고리를 찾을 수 없습니다: ${selectedCategory}`
                );
            }

            const categoryValue =
                categoryItem.value;

            const requestBody = {

                sourceType:
                    isManual
                        ? 'MANUAL'
                        : 'PROVIDED',

                verseId:
                    isManual
                        ? null
                        : selectedVerse?.id,

                category:
                    isManual
                        ? categoryValue
                        : null,

                manualReference:
                    isManual
                        ? selectedVerse?.reference
                        : null,

                manualText:
                    isManual
                        ? selectedVerse?.verse
                        : null,

                personalMessage:
                    personalMessage.trim(),

                authorName:
                    authorName.trim() || '친구',

                isAnonymous:
                    isAnonymous,
            };


            // =====================================================
            // Spring Boot로 말씀 저장 요청
            // =====================================================

            const response = await fetch(
                `${API_BASE_URL}/api/v1/moons/share/${shareToken}/messages`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(requestBody),
                }
            );


            if (!response.ok) {
                throw new Error(
                    `말씀 저장 실패: ${response.status}`
                );
            }


            const savedMessage =
                await response.json();


            // DB 저장 성공 후 화면의 개수도 증가
            setMoon((prev) => ({
                ...prev,

                messageCount:
                    (prev.messageCount ?? 0) + 1,
            }));


            // Step3에게 저장 성공 결과를 돌려주기 위해 반환
            return savedMessage;


        } catch (error) {

            console.error(
                '말씀 저장 실패:',
                error
            );

            // Step3에서 실패 사실을 알 수 있게 다시 던짐
            throw error;
        }
    };


    // =========================================================
    // 말씀 남기기 Flow 초기화
    // =========================================================

    const resetLeaveVerseFlow = () => {

        setLeaveFlowStep('hero');

        setSelectedCategory('응원');

        setSelectedVerse(
            verses[0] ?? null
        );

        setPersonalMessage('');

        setAuthorName('');

        setIsAnonymous(false);
    };


    // =========================================================
    // 로딩 / 오류
    // =========================================================

    if (loading) {

        return (
            <div>
                보름달을 불러오는 중...
            </div>
        );
    }


    if (error) {

        return (
            <div>
                {error}
            </div>
        );
    }


    if (!moon) {
        return null;
    }


    // =========================================================
    // 화면
    // =========================================================

    return (
        <div className="w-full flex justify-center">


            {/* ============================================= */}
            {/* 1. 친구 보름달 메인 화면 */}
            {/* ============================================= */}

            {leaveFlowStep === 'hero' && (

                <HeroMoonSection

                    isLoggedIn={false}

                    currentUser={null}

                    moonData={moon}

                    userRole="visitor"
                    canViewReceivedMessages={false}


                    // 말씀 남기기 클릭
                    onOpenLeaveVerse={() =>
                        setLeaveFlowStep('chooseMethod')
                    }


                    // 나도 보름달 만들기
                    onOpenCreateMoon={() =>
                        navigate('/')
                    }


                    // 메인으로
                    onBackToLanding={() =>
                        navigate('/')
                    }

                />

            )}


            {/* ============================================= */}
            {/* 2. Step 1 - 말씀 선택 방법 */}
            {/* ============================================= */}

            {leaveFlowStep === 'chooseMethod' && (

                <Step1ChooseVerseMethod

                    recipientName={moon.ownerName}

                    onChooseBrowse={() =>
                        setLeaveFlowStep('selectBrowse')
                    }

                    onChooseWrite={() =>
                        setLeaveFlowStep('selectWrite')
                    }

                    onBack={() =>
                        setLeaveFlowStep('hero')
                    }

                />

            )}


            {/* ============================================= */}
            {/* 3. Step 1-A - 말씀 찾아보기 */}
            {/* ============================================= */}

            {leaveFlowStep === 'selectBrowse' && (

                <Step1SelectVerse

                    recipientName={moon.ownerName}

                    verses={verses}
                    selectedCategory={selectedCategory}

                    onSelectCategory={
                        setSelectedCategory
                    }

                    selectedVerse={
                        selectedVerse
                    }

                    onSelectVerse={
                        setSelectedVerse
                    }

                    onNext={() =>
                        setLeaveFlowStep('step2')
                    }

                    onBack={() =>
                        setLeaveFlowStep('chooseMethod')
                    }

                />

            )}


            {/* ============================================= */}
            {/* 4. Step 1-B - 직접 입력 */}
            {/* ============================================= */}

            {leaveFlowStep === 'selectWrite' && (

                <Step1WriteVerse

                    recipientName={moon.ownerName}

                    onSaveAndNext={(
                        customVerse,
                        category
                    ) => {

                        setSelectedVerse(
                            customVerse
                        );

                        setSelectedCategory(
                            category
                        );

                        setLeaveFlowStep(
                            'step2'
                        );
                    }}

                    onBack={() =>
                        setLeaveFlowStep('chooseMethod')
                    }

                />

            )}


            {/* ============================================= */}
            {/* 5. Step 2 - 메시지 작성 */}
            {/* ============================================= */}

            {leaveFlowStep === 'step2' && (

                <Step2WriteMessage

                    recipientName={moon.ownerName}

                    selectedVerse={
                        selectedVerse
                    }

                    personalMessage={
                        personalMessage
                    }

                    onChangePersonalMessage={
                        setPersonalMessage
                    }

                    authorName={
                        authorName
                    }

                    onChangeAuthorName={
                        setAuthorName
                    }

                    isAnonymous={
                        isAnonymous
                    }

                    onToggleAnonymous={
                        setIsAnonymous
                    }

                    onNext={() =>
                        setLeaveFlowStep('step3')
                    }

                    onBack={() => {

                        if (
                            selectedVerse?.source ===
                            'manual'
                        ) {

                            setLeaveFlowStep(
                                'selectWrite'
                            );

                        } else {

                            setLeaveFlowStep(
                                'selectBrowse'
                            );
                        }
                    }}

                    onEditVerse={() => {

                        if (
                            selectedVerse?.source ===
                            'manual'
                        ) {

                            setLeaveFlowStep(
                                'selectWrite'
                            );

                        } else {

                            setLeaveFlowStep(
                                'selectBrowse'
                            );
                        }
                    }}

                />

            )}


            {/* ============================================= */}
            {/* 6. Step 3 - 최종 확인 */}
            {/* ============================================= */}

            {leaveFlowStep === 'step3' && (

                <Step3ConfirmSend

                    recipientName={moon.ownerName}

                    category={
                        selectedCategory
                    }

                    selectedVerse={
                        selectedVerse
                    }

                    personalMessage={
                        personalMessage
                    }

                    authorName={
                        authorName
                    }

                    isAnonymous={
                        isAnonymous
                    }

                    totalMessagesCount={
                        moon.messages.length
                    }


                    // 말씀 보내기
                    onConfirmSend={
                        handleConfirmSend
                    }


                    // 이전
                    onBack={() =>
                        setLeaveFlowStep('step2')
                    }


                    // 완료 후 메인으로
                    onClose={
                        resetLeaveVerseFlow
                    }


                    // 나도 보름달 만들기
                    onOpenCreateMoon={() => {

                        resetLeaveVerseFlow();

                        navigate('/');
                    }}

                />

            )}


            {/* ============================================= */}
            {/* 받은 말씀 보기 모달 */}
            {/* ============================================= */}

        </div>
    );
}


export { FriendMoonPage };
