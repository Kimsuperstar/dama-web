import { motion } from 'motion/react';
import { ChevronLeft, X, Search, Edit3, ArrowRight } from 'lucide-react';

/**
 * 1단계 선택 화면: 말씀 선택 방법 고르기
 * 1) 말씀 찾아보기 (감정 카테고리 + 추천 말씀 + 검색)
 * 2) 직접 입력하기 (성경 구절 및 본문 직접 작성)
 */
export function Step1ChooseVerseMethod({
  onChooseBrowse,
  onChooseWrite,
  onBack,
}) {
  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
      <div>
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center font-medium text-xs sm:text-sm text-[#3F315F]">
            말씀 담기
          </div>
          <button
            onClick={onBack}
            className="p-1 -mr-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs text-[#565B86] mb-6 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#6B4AA6] font-semibold">말씀 선택</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>메시지</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>보내기</span>
          </div>
          <span className="font-semibold text-[#6B4AA6]">1 / 3</span>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-[23px] font-bold text-[#3F315F] leading-snug mb-1.5 font-display">
            어떤 말씀을 담아볼까요?
          </h2>
          <p className="text-sm text-[#565B86] leading-relaxed break-keep">
            상대방을 생각하며 말씀을 골라주세요.
          </p>
        </div>

        {/* 2 Method Selection Cards */}
        <div className="space-y-3.5 mt-2">
          {/* Card 1: 말씀 찾아보기 */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onChooseBrowse}
            className="group relative bg-white/95 hover:bg-white rounded-[24px] p-5 sm:p-5.5 border border-[#E8B7C8] hover:border-[#6B4AA6] transition-all cursor-pointer dama-card-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EADDFF] group-hover:bg-[#6B4AA6] text-[#6B4AA6] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#3F315F] group-hover:text-[#6B4AA6] transition-colors">
                    말씀 찾아보기
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF1C7] text-[#6B4AA6]">
                    추천 & 검색
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#565B86] leading-relaxed break-keep">
                  어떤 말씀을 전할지 고민된다면 마음에 맞는 말씀을 찾아보세요.
                </p>
              </div>
              <div className="text-[#CCC3D3] group-hover:text-[#6B4AA6] self-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: 직접 입력하기 */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onChooseWrite}
            className="group relative bg-white/95 hover:bg-white rounded-[24px] p-5 sm:p-5.5 border border-[#E8B7C8] hover:border-[#6B4AA6] transition-all cursor-pointer dama-card-shadow text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1C7] group-hover:bg-[#6B4AA6] text-[#6B4AA6] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                <Edit3 className="w-6 h-6" />
              </div>
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#3F315F] group-hover:text-[#6B4AA6] transition-colors">
                    직접 입력하기
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAC8D9] text-[#785160]">
                    자유 입력
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#565B86] leading-relaxed break-keep">
                  떠오르는 말씀이 있다면 직접 입력해보세요.
                </p>
              </div>
              <div className="text-[#CCC3D3] group-hover:text-[#6B4AA6] self-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-6 pb-2 text-center">
        <p className="text-[11px] text-[#565B86]/80 leading-relaxed">
          담아에서 제공하는 성경 본문은 <strong>성경전서 개역한글판</strong>을 기준으로 합니다.
        </p>
      </div>
    </div>
  );
}
