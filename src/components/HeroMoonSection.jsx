import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoonVisual } from './MoonVisual';
import { ChuseokCountdown } from './ChuseokCountdown';
import { CHUSEOK_OPEN_AT } from '../constants/chuseok';
import { 
  Share2, 
  Link2, 
  BookOpen, 
  Clock, 
  Heart, 
  Gift, 
  Mail, 
  Check, 
  Sparkles,
  ChevronRight,
  Layers,
  UserCheck,
  Users
} from 'lucide-react';

/**
 * 메인 히어로 보름달 섹션
 */
export function HeroMoonSection({
  isLoggedIn = false,
  authProvider = null,
  moonData,
  userRole = 'visitor',
  onChangeUserRole,
  isDevChuseokDay = false,
  onToggleDevChuseok,
  onOpenLeaveVerse,
  onOpenViewVerses,
  onOpenCreateMoon,
  onBackToLanding,
}) {
  // 토스트 알림 스택 상태
  const [toasts, setToasts] = useState([]);

  // 2026년 추석 당일 판별 (상수 CHUSEOK_OPEN_AT 활용)
  const isChuseokPeriod = isDevChuseokDay || (Date.now() >= CHUSEOK_OPEN_AT);

  const messagesCount = moonData?.messages?.length || 0;
  const targetCount = moonData?.targetCount || 15;
  const originalPercentage = Math.min(100, Math.round((messagesCount / targetCount) * 100));
  
  // 추석 당일이 되면 아직 15개가 다 모이지 않았더라도 모든 보름달을 환한 만월(100%)로 표시
  const displayPercentage = isChuseokPeriod ? 100 : originalPercentage;

  // 토스트 추가 헬퍼
  const triggerToast = (title, subtitle) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      title,
      subtitle,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // 친구들에게 내 보름달 공유하기 버튼 클릭 시
  const handleShareMoon = () => {
    const moonId = moonData?.id || 'demo';
    const shareUrl = `${window.location.origin}/moon/${moonId}`;
    navigator.clipboard.writeText(shareUrl);
    triggerToast(
      '보름달 링크가 복사됐어요!',
      '친구에게 공유하면 바로 말씀을 남길 수 있어요.'
    );
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Non-overlapping Stacked Toast Container */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="px-5 py-3 rounded-2xl text-left shadow-xl flex items-start gap-3 pointer-events-auto select-none border bg-[#3F315F] text-white border-[#53318C]/80"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Check className="w-4 h-4 text-[#6B4AA6] stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#FFF1C7] leading-snug">
                  {toast.title}
                </span>
                {toast.subtitle && (
                  <span className="text-xs text-[#EADDFF]/90 font-medium mt-0.5 leading-snug">
                    {toast.subtitle}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Canvas Card */}
      <div className="w-full max-w-[480px] px-4 pt-3 pb-12 flex flex-col items-center text-center">
        {/* 뒤로가기 버튼 (비로그인 상태일 때 랜딩 홈으로 이동) */}
        {!isLoggedIn && onBackToLanding && (
          <div className="w-full flex justify-start mb-2">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#565B86] hover:text-[#3F315F] bg-white/70 hover:bg-white border border-[#E8B7C8]/70 transition-all shadow-2xs"
            >
              <span>← 담아 소개 홈으로</span>
            </button>
          </div>
        )}

        {/* Chuseok Festive Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF1C7] border border-[#E8B7C8] text-[#53318C] text-[11px] font-bold shadow-2xs mb-2">
          <span>🌾</span>
          <span>{isChuseokPeriod ? '보름달처럼 풍성한 한가위 되세요' : '2026 한가위 보름달 나눔'}</span>
          <span>🌕</span>
        </div>

        {/* Title Section */}
        <div className="mb-2 w-full flex flex-col items-center">
          <h1 className="font-display text-3xl sm:text-[34px] font-bold text-[#3F315F] tracking-tight leading-tight mb-1.5 flex items-center justify-center gap-2">
            <span>{moonData?.ownerName || '나'}의 보름달</span>
          </h1>

          <p className="text-sm sm:text-base text-[#565B86] leading-relaxed break-keep font-medium">
            {isChuseokPeriod ? (
              <>
                보름달처럼 풍성하고 은혜 넘치는 한가위 되세요 ✦<br />
                {moonData?.ownerName || '소중한 분'}의 보름달이 온 세상을 환하게 비추고 있어요
              </>
            ) : userRole === 'owner' ? (
              <>
                친구들이 남겨주는 따뜻한 말씀으로<br />
                {moonData?.ownerName}의 보름달이 차오르고 있어요
              </>
            ) : (
              <>
                {moonData?.ownerName || '친구'}를 생각하며<br />
                축복의 성경 말씀 한 구절을 선물해주세요
              </>
            )}
          </p>
        </div>

        {/* Starry Accent Divider */}
        <div className="flex items-center justify-center gap-3 my-2 w-36">
          <div className="h-[1px] bg-[#E8B7C8]/50 flex-1" />
          <span className="text-xs text-[#6B4AA6]/70">✦</span>
          <div className="h-[1px] bg-[#E8B7C8]/50 flex-1" />
        </div>

        {/* Visual Component: The Moon (추석 당일에는 만월 100%로 환하게 표시) */}
        <div className="my-2 relative flex flex-col items-center">
          <MoonVisual percentage={displayPercentage} size="lg" glow={true} />
        </div>

        {/* 2026 Chuseok Real-time Countdown Timer */}
        <ChuseokCountdown 
          isDevChuseokDay={isDevChuseokDay} 
          onToggleDevChuseok={onToggleDevChuseok} 
        />

        {/* Progress Info Container */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-[24px] p-4 sm:p-5 border border-[#E8B7C8] dama-card-shadow mb-4">
          <div className="flex flex-col items-center justify-center gap-1 mb-2.5">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#53318C]">
              <span className="text-lg">🌙</span>
              <span>
                {isChuseokPeriod
                  ? `보름달처럼 풍성한 한가위 되세요! 🌕`
                  : messagesCount >= 15 
                    ? `만월 완성! 총 ${messagesCount}개의 말씀이 모였어요 🌕` 
                    : `받은 말씀 ${messagesCount}개 | 15개가 모이면 만월 완성 (${originalPercentage}%)`}
              </span>
            </div>
            <span className="text-[11px] text-[#565B86] break-keep">
              {isChuseokPeriod
                ? `추석을 맞이하여 온 세상을 환하게 비추는 만월이 되었습니다. (총 ${messagesCount}개의 축복 말씀)`
                : messagesCount >= 15 
                  ? '보름달이 가득 찼어요! 계속해서 축복의 말씀을 더해주실 수 있어요.' 
                  : '음력 8월 15일 보름달처럼 15개의 말씀으로 환한 달이 채워져요.'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-[#EADDFF]/40 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${displayPercentage}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isChuseokPeriod 
                  ? 'bg-gradient-to-r from-[#BA1A1A] via-[#6B4AA6] to-[#53318C]' 
                  : 'bg-gradient-to-r from-[#6B4AA6] to-[#53318C]'
              }`}
            />
          </div>

          {/* View Verses Link */}
          <div className="flex items-center justify-between pt-1">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF1C7] text-[#6B4AA6] border border-[#E8B7C8] rounded-full text-xs font-semibold">
              <Clock className="w-3 h-3 text-[#6B4AA6]" />
              <span>{isChuseokPeriod ? '추석 당일 오픈됨' : '추석 당일 00:00 공개'}</span>
            </div>

            <button
              onClick={onOpenViewVerses}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#6B4AA6] hover:text-[#53318C] hover:underline underline-offset-4"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>받은 말씀 열어보기 ({messagesCount})</span>
            </button>
          </div>
        </div>

        {/* Primary Action Section */}
        <div className="w-full space-y-2.5 my-2">
          {userRole === 'owner' ? (
            /* Owner View CTA: 깔끔한 단일 공유 버튼 */
            <div>
              <button
                onClick={handleShareMoon}
                className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
              >
                <Share2 className="w-5 h-5" />
                <span>친구들에게 내 보름달 공유하기</span>
              </button>
            </div>
          ) : (
            /* Visitor View CTA: Focus on Leaving a Verse for Friend */
            <button
              onClick={onOpenLeaveVerse}
              className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
            >
              <span>{moonData?.ownerName || '친구'}에게 말씀 남기기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Notice for Chuseok Opening */}
        <p className="text-[11px] sm:text-xs text-[#565B86] mt-1 mb-6">
          * 친구들이 남긴 말씀은 추석 당일 00:00에 열어볼 수 있어요.
        </p>

        {/* 3 Step Service Explanation Section */}
        <div className="w-full bg-white/95 rounded-[28px] p-5 sm:p-6 border border-[#E8B7C8] dama-card-shadow mb-6 text-left">
          <h2 className="text-base sm:text-lg font-bold text-[#3F315F] text-center mb-5 font-display">
            말씀 남기기, 이렇게 진행돼요
          </h2>

          <div className="grid grid-cols-3 gap-2 text-center relative">
            <div className="absolute top-4 left-[20%] right-[20%] h-[1px] border-t border-dashed border-[#6B4AA6]/30 -z-0" />

            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
                1
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
                <Heart className="w-4 h-4 fill-current text-[#E8B7C8]" />
              </div>
              <div className="font-bold text-xs text-[#3F315F] mb-1">마음 고르기</div>
              <p className="text-[10px] text-[#565B86] leading-tight break-keep">
                {moonData?.ownerName || '친구'}를 생각하며 전하고 싶은 마음을 골라요.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
                2
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
                <BookOpen className="w-4 h-4 text-[#6B4AA6]" />
              </div>
              <div className="font-bold text-xs text-[#3F315F] mb-1">말씀 남기기</div>
              <p className="text-[10px] text-[#565B86] leading-tight break-keep">
                마음에 맞는 말씀과 짧은 메시지를 남겨요.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
                3
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
                <Gift className="w-4 h-4 text-[#BA1A1A]" />
              </div>
              <div className="font-bold text-xs text-[#3F315F] mb-1">추석에 열어보기</div>
              <p className="text-[10px] text-[#565B86] leading-tight break-keep">
                추석이 되면 {moonData?.ownerName || '친구'}가 받은 말씀을 열어봐요.
              </p>
            </div>
          </div>
        </div>

        {/* Guest Participation Banner (비로그인 상태일 때만 노출) */}
        {!isLoggedIn && (
          <div className="w-full bg-gradient-to-b from-[#FFF1C7]/30 to-white/90 rounded-[28px] p-6 border border-[#E8B7C8] text-center dama-card-shadow mb-8">
            <div className="w-10 h-10 rounded-full bg-[#EADDFF] text-[#6B4AA6] mx-auto flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#3F315F] mb-2 font-display">
              담아는 <span className="text-[#6B4AA6] underline decoration-[#E8B7C8] decoration-2 underline-offset-4">회원가입 없이</span><br />
              누구나 말씀을 남길 수 있어요.
            </h3>

            <p className="text-xs text-[#565B86] leading-relaxed max-w-xs mx-auto mb-4 break-keep">
              이 페이지는 {moonData?.ownerName || '친구'}를 위한 보름달이에요.<br />
              따뜻한 말씀으로 {moonData?.ownerName || '친구'}의 보름달을 채워주세요.
            </p>

            <button
              onClick={onOpenCreateMoon}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#6B4AA6] bg-[#FFF8EE] border border-[#6B4AA6]/40 hover:bg-white transition-all"
            >
              <span>나도 내 보름달 만들기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="w-full pt-4 pb-2 border-t border-[#E8B7C8]/40 text-center">
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#565B86] mb-2">
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">이용약관</a>
            <span>·</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">개인정보처리방침</a>
            <span>·</span>
            <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">고객센터</a>
          </div>
          <p className="text-[11px] text-[#565B86]/70">
            © 2026 Dama. All rights reserved. 너를 생각하며 말씀을 담아
          </p>
        </footer>
      </div>
    </div>
  );
}
