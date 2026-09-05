import { 
  ArrowRight, 
  Edit2, 
  Sparkles, 
  User, 
  EyeOff, 
  Check, 
  ChevronLeft, 
  X,
  Lock
} from 'lucide-react';

/**
 * 2단계: 짧은 메시지 작성 및 보낸 사람 이름/익명 설정
 */
export function Step2WriteMessage({
  recipientName = '소망',
  selectedVerse,
  personalMessage,
  onChangePersonalMessage,
  authorName,
  onChangeAuthorName,
  isAnonymous,
  onToggleAnonymous,
  onNext,
  onBack,
  onEditVerse,
}) {
  const messageTemplates = [
    `${recipientName}아/야, 늘 기도하며 응원해! 올 한 해 하나님께서 네 걸음을 밝히 비춰주시길 바라.`,
    `풍성하고 따뜻한 한가위 보내! 주님의 평안과 위로가 늘 함께하길 기도해.`,
    `힘든 시간 속에서도 흔들리지 않길, 주님이 언제나 너와 함께 계심을 기억해!`,
    `너를 향한 하나님의 선한 계획을 신뢰해. 사랑하고 축복해!`,
  ];

  const handleSelectTemplate = (tpl) => {
    onChangePersonalMessage(tpl);
  };

  const isFormValid = personalMessage.trim().length > 0 && (isAnonymous || authorName.trim().length > 0);

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
            메시지 남기기
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

        {/* Selected Verse Compact Card */}
        <div className="bg-white/95 rounded-2xl p-3.5 border border-[#E8B7C8] mb-5 relative flex items-start justify-between gap-2 shadow-2xs">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#FFF1C7] text-[#6B4AA6] text-[10px] font-bold">
                {selectedVerse?.reference}
              </span>
              <span className="text-[10px] text-[#565B86]">
                {selectedVerse?.category}의 마음
              </span>
            </div>
            <p className="font-serif-kr text-xs text-[#3F315F] line-clamp-2 leading-relaxed">
              &ldquo;{selectedVerse?.verse}&rdquo;
            </p>
          </div>
          <button
            type="button"
            onClick={onEditVerse}
            className="text-[11px] font-medium text-[#6B4AA6] hover:underline shrink-0 p-1 flex items-center gap-0.5"
          >
            <Edit2 className="w-3 h-3" />
            <span>변경</span>
          </button>
        </div>

        {/* Main Title */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-[22px] font-bold text-[#3F315F] leading-snug mb-1 font-display">
            따뜻한 한 마디를 적어보세요
          </h2>
          <p className="text-xs sm:text-sm text-[#565B86]">
            {recipientName}에게 전하고 싶은 마음이나 기도제목을 남겨주세요.
          </p>
        </div>

        {/* Message Input / Template Switcher */}
        <div className="space-y-4">
          {/* Message Textarea Container */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <label className="text-xs font-bold text-[#3F315F]">
                메시지 내용 <span className="text-[#BA1A1A]">*</span>
              </label>
              <span className="text-[11px] text-[#8C7A9C]">
                {personalMessage.length}/300자
              </span>
            </div>

            <textarea
              value={personalMessage}
              onChange={(e) => onChangePersonalMessage(e.target.value)}
              placeholder={`${recipientName}에게 힘이 되는 응원과 축복의 글을 남겨주세요.`}
              maxLength={300}
              rows={4}
              className="w-full p-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none focus:border-[#6B4AA6] focus:ring-1 focus:ring-[#6B4AA6] leading-relaxed resize-none shadow-2xs"
            />
          </div>

          {/* Quick Template Suggestions */}
          <div>
            <div className="text-xs font-medium text-[#565B86] mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#6B4AA6]" />
              <span>추천 문구로 빠르게 채우기</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
              {messageTemplates.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl)}
                  className="px-3 py-1.5 rounded-full text-xs bg-white text-[#3F315F] border border-[#E8B7C8] hover:border-[#6B4AA6] hover:bg-[#FFF1C7]/30 transition-all shrink-0 max-w-[240px] truncate text-left shadow-2xs"
                  title={tpl}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          {/* Author Name / Anonymous Controls */}
          <div className="bg-white/95 rounded-2xl p-4 border border-[#E8B7C8] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#3F315F] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6B4AA6]" />
                <span>보내는 사람</span>
              </label>

              {/* Anonymous Checkbox */}
              <button
                type="button"
                onClick={() => onToggleAnonymous(!isAnonymous)}
                className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                  isAnonymous
                    ? 'bg-[#6B4AA6] text-white'
                    : 'bg-[#FFF8EE] text-[#565B86] border border-[#E8B7C8]'
                }`}
              >
                <EyeOff className="w-3 h-3" />
                <span>익명으로 남기기</span>
                {isAnonymous && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>

            {!isAnonymous ? (
              <input
                type="text"
                value={authorName}
                onChange={(e) => onChangeAuthorName(e.target.value)}
                placeholder="이름 또는 닉네임 (예: 지혜, 중고등부 친구)"
                maxLength={20}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF8EE]/60 border border-[#E8B7C8] text-sm text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none focus:border-[#6B4AA6]"
              />
            ) : (
              <div className="p-2.5 bg-[#FFF8EE] rounded-xl text-xs text-[#6B4AA6] font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#6B4AA6]" />
                <span>상대방에게 이름 대신 <strong>&lsquo;익명의 친구&rsquo;</strong>로 표시돼요.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full h-14 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? 'bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white dama-button-shadow active:scale-[0.99] hover:opacity-95'
              : 'bg-[#CCC3D3] text-white cursor-not-allowed'
          }`}
        >
          <span>마지막 확인하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
