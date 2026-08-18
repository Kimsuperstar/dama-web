import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MoonVisual } from '../MoonVisual';
import { ChevronLeft, X, Send, Sparkles, Moon, ArrowRight } from 'lucide-react';

/**
 * 3단계: 말씀 최종 확인 & 보내기 완료 및 바이럴 연결
 */
export function Step3ConfirmSend({
  recipientName = '친구',
  category,
  selectedVerse,
  personalMessage = '',
  authorName = '',
  isAnonymous = false,
  onConfirmSend,
  onBack,
  onClose,
  onOpenCreateMoon,
  totalMessagesCount = 0,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const displayAuthor = isAnonymous ? '익명의 친구' : (authorName || '소중한 친구');

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      onConfirmSend();
      setIsSending(false);
      setIsSubmitted(true);
    }, 600);
  };

  // 말씀 전송 완료 화면
  if (isSubmitted) {
    const updatedCount = totalMessagesCount + 1;
    const progressPct = Math.min(100, Math.round((updatedCount / 15) * 100));

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] mx-auto px-5 py-6 flex flex-col items-center justify-between min-h-[calc(100vh-70px)] text-center"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="p-2 text-[#3F315F] hover:opacity-75"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center my-auto w-full">
          {/* Celebrating Waxing Moon */}
          <div className="my-2 relative">
            <MoonVisual percentage={progressPct} size="md" glow={true} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#3F315F] mt-4 mb-2">
            {recipientName}의 보름달에<br />
            마음이 담겼어요 🌙
          </h2>

          <p className="text-sm text-[#565B86] leading-relaxed max-w-xs mb-6 break-keep">
            당신이 남긴 말씀으로 {recipientName}의 달이 조금 더 차올랐어요.
            추석이 되면 {recipientName}이가 당신이 남긴 말씀과 메시지를 열어볼 수 있어요.
          </p>

          {/* Current Moon Progress Card */}
          <div className="w-full bg-white/95 rounded-[22px] p-4 border border-[#E8B7C8] dama-card-shadow mb-6 text-left">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-[#3F315F]">현재 {recipientName}의 보름달</span>
              <span className="bg-[#EADDFF] text-[#6B4AA6] px-2.5 py-0.5 rounded-full font-bold">
                받은 말씀 {updatedCount}개
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#FFF1C7] rounded-full overflow-hidden mb-1.5">
              <motion.div
                initial={{ width: `${Math.max(0, progressPct - 7)}%` }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-[#6B4AA6] rounded-full"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#565B86]">
              <span>0</span>
              <span>15 (만월)</span>
            </div>
          </div>

          {/* Viral Loop: Create My Moon Box */}
          <div className="w-full bg-[#FFF1C7]/40 rounded-[24px] p-5 border border-[#E8B7C8] mb-4">
            <h3 className="font-bold text-base text-[#3F315F] mb-1">
              나도 친구들의 말씀을 받아볼까요?
            </h3>
            <p className="text-xs text-[#565B86] mb-4">
              나만의 보름달을 만들고 친구들에게 공유해보세요.
            </p>
            <button
              onClick={onOpenCreateMoon}
              className="w-full h-12 bg-[#6B4AA6] hover:bg-[#53318C] text-white rounded-full font-semibold text-sm flex items-center justify-center gap-1.5 dama-button-shadow transition-all"
            >
              <Moon className="w-4 h-4 fill-white" />
              <span>내 보름달 만들기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-[#565B86] hover:text-[#3F315F] underline underline-offset-4 py-2"
        >
          {recipientName}의 보름달로 돌아가기
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
      <div>
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#3F315F] hover:opacity-75"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center font-medium text-xs sm:text-sm text-[#3F315F]">
            보내기 전 확인하기
          </div>
          <button
            onClick={onClose}
            className="p-1 -mr-1 text-[#3F315F] hover:opacity-75"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs text-[#565B86] mb-6 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span>말씀 선택</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>메시지</span>
            <span className="text-[#CCC3D3]">›</span>
            <span className="text-[#6B4AA6] font-semibold">보내기</span>
          </div>
          <span className="font-semibold text-[#6B4AA6]">3 / 3</span>
        </div>

        {/* Preview Card in Moonlit Hanji Container */}
        <div className="relative my-2">
          <div className="absolute inset-0 bg-[#FFF1C7]/60 rounded-full blur-2xl transform scale-90 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/95 rounded-[28px] p-6 sm:p-7 border border-[#E8B7C8] dama-card-shadow text-center"
          >
            <div className="absolute top-4 right-4 text-[#6B4AA6]/40">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="text-xs font-bold text-[#6B4AA6] mb-2 tracking-wide">
              {selectedVerse?.reference}
            </div>

            <p className="font-serif-kr text-[15px] sm:text-[16px] text-[#3F315F] leading-relaxed break-keep mb-5 px-1 font-medium">
              &ldquo;{selectedVerse?.verse}&rdquo;
            </p>

            <div className="w-12 h-0.5 bg-[#E8B7C8]/50 mx-auto mb-5 rounded-full" />

            <p className="text-sm text-[#3F315F] leading-relaxed mb-6 font-normal break-keep">
              {personalMessage}
            </p>

            {/* Author Badge */}
            <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-[#EADDFF] text-[#3F315F] text-xs font-semibold">
              <span>{displayAuthor}이(가) 담음</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Notice & Prompt */}
        <div className="text-center mt-6 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#3F315F] mb-1">
            정성껏 담은 마음을<br />
            {recipientName}에게 보낼까요?
          </h3>
          <p className="text-xs text-[#565B86] mt-1">
            ⓘ 보낸 말씀은 수정할 수 없어요.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 pb-2 space-y-2">
        <button
          onClick={handleSend}
          disabled={isSending}
          className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
        >
          {isSending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>보름달에 담는 중...</span>
            </div>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{recipientName}에게 말씀 보내기</span>
            </>
          )}
        </button>

        <button
          onClick={onBack}
          disabled={isSending}
          className="w-full py-2.5 text-xs text-[#565B86] hover:text-[#3F315F] transition-colors"
        >
          수정하러 돌아가기
        </button>
      </div>
    </div>
  );
}
