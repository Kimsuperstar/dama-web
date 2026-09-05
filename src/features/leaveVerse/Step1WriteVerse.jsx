import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, X, ArrowRight, BookOpen } from 'lucide-react';
import { HEART_CATEGORIES } from '../../data/verses';

/**
 * 1단계 (직접 입력하기): 성경 구절 장절과 본문 직접 작성
 */
export function Step1WriteVerse({
  recipientName = '친구',
  onSaveAndNext,
  onBack,
}) {
  const [reference, setReference] = useState('');
  const [verseText, setVerseText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('축복');

  const isFormValid = reference.trim().length > 0 && verseText.trim().length > 0;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!isFormValid) return;

    // 수동 입력된 성경 구절 객체 생성
    const customVerse = {
      id: `custom-${Date.now()}`,
      category: selectedCategory,
      reference: reference.trim(),
      verse: verseText.trim(),
      summary: verseText.trim(),
      testament: '직접 입력',
      source: 'manual',
    };

    onSaveAndNext(customVerse, selectedCategory);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
      <div>
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-[#3F315F] hover:opacity-75 transition-opacity"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center font-medium text-xs sm:text-sm text-[#3F315F]">
            말씀 직접 입력하기
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
        <div className="flex items-center justify-between text-xs text-[#565B86] mb-5 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#6B4AA6] font-semibold">말씀 입력</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>메시지</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>보내기</span>
          </div>
          <span className="font-semibold text-[#6B4AA6]">1 / 3</span>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-xl sm:text-[22px] font-bold text-[#3F315F] leading-snug mb-1 font-display">
            전하고 싶은 말씀을 입력해주세요
          </h2>
          <p className="text-xs sm:text-sm text-[#565B86] leading-relaxed break-keep">
            {recipientName}에게 선물하고 싶은 성경 구절과 본문을 적어보세요.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Heart Category Selection */}
          <div>
            <label className="block text-xs font-bold text-[#3F315F] mb-1.5">
              이 말씀의 마음 테마
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {HEART_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#6B4AA6] text-white shadow-xs'
                        : 'bg-white text-[#3F315F] border border-[#E8B7C8] hover:bg-[#FFF1C7]/30'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bible Reference Input */}
          <div>
            <label className="block text-xs font-bold text-[#3F315F] mb-1.5">
              성경 구절 (장·절) <span className="text-[#BA1A1A]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="예: 이사야 41:10, 시편 23:1, 요한복음 3:16"
                required
                maxLength={40}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none focus:border-[#6B4AA6] focus:ring-1 focus:ring-[#6B4AA6] shadow-2xs"
              />
              <BookOpen className="w-4 h-4 text-[#8C7A9C] absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* Bible Verse Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#3F315F]">
                말씀 본문 <span className="text-[#BA1A1A]">*</span>
              </label>
              <span className="text-[11px] text-[#8C7A9C]">{verseText.length}자</span>
            </div>
            <textarea
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              placeholder="전하고 싶은 말씀을 입력해주세요."
              rows={5}
              required
              className="w-full p-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm font-serif-kr text-[#3F315F] placeholder-[#565B86]/50 focus:outline-none focus:border-[#6B4AA6] focus:ring-1 focus:ring-[#6B4AA6] leading-relaxed resize-none shadow-2xs"
            />
          </div>

          {/* Live Preview Card */}
          {reference.trim() && verseText.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#6B4AA6]/30 text-center"
            >
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF1C7] text-[#6B4AA6] text-[11px] font-bold mb-2">
                <span>{reference}</span>
                <span className="text-[#8C7A9C]">·</span>
                <span>{selectedCategory}</span>
              </div>
              <p className="font-serif-kr text-xs text-[#3F315F] leading-relaxed">
                &ldquo;{verseText}&rdquo;
              </p>
            </motion.div>
          )}
        </form>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full h-14 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            isFormValid
              ? 'bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white dama-button-shadow active:scale-[0.99] hover:opacity-95'
              : 'bg-[#CCC3D3] text-white cursor-not-allowed'
          }`}
        >
          <span>이 말씀 담기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
