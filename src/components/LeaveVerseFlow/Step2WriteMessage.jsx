import React from 'react';
import { ChevronLeft, X, ArrowRight, User, UserX, BookOpen, Edit3 } from 'lucide-react';

/**
 * 2단계: 메시지 작성 및 작성자(익명/실명) 설정
 */
export function Step2WriteMessage({
  recipientName = '친구',
  selectedVerse,
  personalMessage = '',
  onChangePersonalMessage,
  authorName = '',
  onChangeAuthorName,
  isAnonymous = false,
  onToggleAnonymous,
  onNext,
  onBack,
  onEditVerse,
}) {
  const maxChar = 100;
  const isFormValid = personalMessage.trim().length > 0 && (isAnonymous || authorName.trim().length > 0);

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
      <div>
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center font-medium text-xs sm:text-sm text-[#3F315F]">
            메시지 보내기
          </div>
          <button
            onClick={onBack}
            className="p-1 -mr-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breadcrumb / Step Indicator */}
        <div className="flex items-center justify-between text-xs text-[#565B86] mb-5 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span>말씀 선택</span>
            <span className="text-[#CCC3D3]">›</span>
            <span className="text-[#6B4AA6] font-semibold">메시지</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>보내기</span>
          </div>
          <span className="font-semibold text-[#6B4AA6]">2 / 3</span>
        </div>

        {/* Selected Verse Summary Card */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-[#6B4AA6] mb-2">
            {recipientName}에게 담을 말씀
          </div>
          <div className="bg-white/90 rounded-[20px] p-4 border border-[#E8B7C8] shadow-xs relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3F315F]">
                <BookOpen className="w-3.5 h-3.5 text-[#6B4AA6]" />
                <span>{selectedVerse?.reference}</span>
              </div>
              <button
                onClick={onEditVerse}
                className="px-2.5 py-1 text-xs text-[#565B86] hover:text-[#6B4AA6] bg-[#FFF8EE] border border-[#E8B7C8] rounded-full flex items-center gap-1 hover:border-[#6B4AA6] transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>변경</span>
              </button>
            </div>
            <p className="font-serif-kr text-xs sm:text-[13px] text-[#3F315F] leading-relaxed line-clamp-3">
              {selectedVerse?.verse}
            </p>
          </div>
        </div>

        {/* Message Input Section */}
        <div className="mb-5">
          <h3 className="text-base sm:text-lg font-bold text-[#3F315F] mb-1">
            이 말씀과 함께 어떤 마음을 전할까요?
          </h3>
          <p className="text-xs text-[#565B86] mb-2.5">
            전하고 싶은 따뜻한 이야기를 남겨주세요.
          </p>

          <div className="relative bg-white rounded-[20px] p-3.5 border border-[#E8B7C8] focus-within:border-[#6B4AA6] focus-within:ring-1 focus-within:ring-[#6B4AA6] transition-all">
            <textarea
              value={personalMessage}
              onChange={(e) => {
                if (e.target.value.length <= maxChar) {
                  onChangePersonalMessage(e.target.value);
                }
              }}
              rows={4}
              placeholder="올해 함께할 수 있어서 정말 고마웠어. 앞으로도 늘 응원할게!"
              className="w-full bg-transparent resize-none text-sm text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none leading-relaxed"
            />
            <div className="text-right text-[11px] text-[#565B86] font-medium mt-1">
              {personalMessage.length} / {maxChar}
            </div>
          </div>
        </div>

        {/* Sender Identity Section */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-[#3F315F] mb-2.5">
            누가 남겼는지 알려줄까요?
          </h4>

          <div className="space-y-2.5">
            {/* Option 1: 이름 남기기 */}
            <div 
              onClick={() => onToggleAnonymous(false)}
              className={`p-3.5 rounded-[18px] border transition-all cursor-pointer ${
                !isAnonymous 
                  ? 'bg-white border-[#6B4AA6] shadow-xs' 
                  : 'bg-white/60 border-[#E8B7C8]/70 hover:bg-white'
              }`}
            >
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="senderType"
                  checked={!isAnonymous}
                  onChange={() => onToggleAnonymous(false)}
                  className="w-4 h-4 text-[#6B4AA6] focus:ring-[#6B4AA6]"
                />
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F315F]">
                  <User className="w-3.5 h-3.5 text-[#6B4AA6]" />
                  <span>이름 남기기</span>
                </div>
              </label>

              {!isAnonymous && (
                <div className="mt-2.5 pl-6">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => onChangeAuthorName(e.target.value)}
                    placeholder="이름 또는 별명 (예: 지민)"
                    maxLength={15}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF8EE] border border-[#E8B7C8] text-xs sm:text-sm text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none focus:border-[#6B4AA6]"
                  />
                </div>
              )}
            </div>

            {/* Option 2: 익명으로 남기기 */}
            <div 
              onClick={() => onToggleAnonymous(true)}
              className={`p-3.5 rounded-[18px] border transition-all cursor-pointer ${
                isAnonymous 
                  ? 'bg-white border-[#6B4AA6] shadow-xs' 
                  : 'bg-white/60 border-[#E8B7C8]/70 hover:bg-white'
              }`}
            >
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="senderType"
                  checked={isAnonymous}
                  onChange={() => onToggleAnonymous(true)}
                  className="w-4 h-4 text-[#6B4AA6] focus:ring-[#6B4AA6]"
                />
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3F315F]">
                  <UserX className="w-3.5 h-3.5 text-[#565B86]" />
                  <span>익명으로 남기기</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-3 pb-2">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full h-14 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? 'bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white dama-button-shadow active:scale-[0.99]'
              : 'bg-[#CCC3D3] text-white/80 cursor-not-allowed'
          }`}
        >
          <span>보내기 전 확인하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
