import { useState } from 'react';
import { motion } from 'motion/react';
import { MoonVisual } from '../../components/MoonVisual';
import { 
  Check, 
  Moon, 
  Sparkles, 
  ChevronLeft, 
  X, 
  Lock,
  Gift
} from 'lucide-react';

/**
 * 3단계: 최종 카드 확인 및 말씀 담기(전송) 완료 연출 화면
 */
export function Step3ConfirmSend({
  recipientName = '소망',
  category = '응원',
  selectedVerse,
  personalMessage,
  authorName,
  isAnonymous,
  totalMessagesCount = 0,
  onConfirmSend,
  onBack,
  onClose,
  onOpenCreateMoon,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayAuthor = isAnonymous ? '익명의 친구' : (authorName.trim() || '친구');

  // 말씀 담기 버튼 클릭 시 애니메이션 연출 후 완료 상태로 전환
  const handleSend = async () => {
    try {
      setIsSubmitting(true);
      await onConfirmSend();

      // DB 저장 성공한 경우에만
      setIsSubmitted(true);
    } catch (error) {
      console.error(
        '말씀 전송 실패:',
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 전송 완료 후 화면
  if (isSubmitted) {
    const newCount = totalMessagesCount + 1;
    const newPercentage = Math.min(100, Math.round((newCount / 15) * 100));

    return (
      <div className="w-full max-w-[440px] mx-auto px-4 py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between items-center text-center">
        <div className="w-full flex flex-col items-center">
          {/* Top Close Button */}
          <div className="w-full flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-1 -mr-1 text-[#3F315F] hover:opacity-75 transition-opacity"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-4 shadow-sm"
          >
            <Check className="w-8 h-8 stroke-[3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[#3F315F] mb-1 font-display"
          >
            말씀이 잘 담겼어요!
          </motion.h2>

          <p className="text-sm text-[#565B86] mb-6">
            {recipientName}님의 보름달에 따뜻한 마음이 채워졌습니다.
          </p>

          {/* Dynamic Moon Filling Visual */}
          <div className="my-2 relative flex flex-col items-center">
            <MoonVisual percentage={newPercentage} size="md" glow={true} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 px-3 py-1 bg-[#EADDFF] text-[#6B4AA6] text-xs font-bold rounded-full shadow-2xs"
            >
              보름달이 {newPercentage}% 차올랐어요 🌕
            </motion.div>
          </div>

          {/* Chuseok Lock Notice Card */}
          <div className="w-full bg-white/90 rounded-2xl p-4 border border-[#E8B7C8] my-5 text-left flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#FFF8EE] border border-[#E8B7C8] text-[#6B4AA6] flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-4 h-4 text-[#BA1A1A]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#3F315F] mb-0.5">
                추석 00:00에 함께 열어보아요
              </div>
              <p className="text-[11px] text-[#565B86] leading-relaxed break-keep">
                남겨주신 축복의 말씀은 추석 당일 보관함이 오픈될 때 {recipientName}님에게 큰 감동으로 전해집니다.
              </p>
            </div>
          </div>
        </div>

        {/* Viral Conversion: 나도 보름달 만들기 CTA */}
        <div className="w-full space-y-2.5 pt-4 pb-2">
          <button
            type="button"
            onClick={onOpenCreateMoon}
            className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
          >
            <Moon className="w-5 h-5 fill-white" />
            <span>나도 내 보름달 만들기</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 bg-white/90 text-[#3F315F] border border-[#E8B7C8] rounded-full font-medium text-sm flex items-center justify-center gap-1 hover:bg-[#FFF1C7]/30 transition-all shadow-2xs"
          >
            <span>보름달 구경하기</span>
          </button>
        </div>
      </div>
    );
  }

  // 최종 확인 전 화면
  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
      <div>
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center font-medium text-xs sm:text-sm text-[#3F315F]">
            말씀 확인하기
          </div>
          <button
            onClick={onClose}
            className="p-1 -mr-1 text-[#3F315F] hover:opacity-75 transition-opacity"
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

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-[22px] font-bold text-[#3F315F] mb-1 font-display">
            이 마음을 보름달에 담을까요?
          </h2>
          <p className="text-xs sm:text-sm text-[#565B86]">
            {recipientName}님을 위해 작성된 말씀 카드예요.
          </p>
        </div>

        {/* Realistic Final Card Preview */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 rounded-[28px] p-6 sm:p-7 border border-[#E8B7C8] dama-card-shadow text-center relative overflow-hidden"
          >
            {/* Top Tag */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF1C7] text-[#6B4AA6] text-xs font-bold mb-4 shadow-2xs">
              <span>{category}의 말씀</span>
              <Sparkles className="w-3 h-3" />
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
          <p className="text-[11px] text-[#565B86] flex items-center justify-center gap-1 font-medium">
            <Lock className="w-3 h-3 text-[#6B4AA6]" />
            <span>이 말씀은 추석 00:00에 {recipientName}님에게 공개됩니다.</span>
          </p>
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          onClick={handleSend}
          disabled={isSubmitting}
          className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
        >
          <span>{isSubmitting ? '보름달에 담는 중...' : '보름달에 말씀 담기'}</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
