import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { HEART_CATEGORIES } from '../../data/verses';
import { RefreshCw, Search, ArrowRight, Check, X, BookOpen, ChevronLeft } from 'lucide-react';

const CATEGORY_MAP = {
  응원: 'ENCOURAGE',
  축복: 'BLESSING',
  위로: 'COMFORT',
  감사: 'THANKS',
  사랑: 'LOVE',
  평안: 'PEACE',
  새출발: 'NEW_START',
  믿음: 'FAITH',
};

const CATEGORY_REVERSE_MAP = {
  ENCOURAGE: '응원',
  BLESSING: '축복',
  COMFORT: '위로',
  THANKS: '감사',
  LOVE: '사랑',
  PEACE: '평안',
  NEW_START: '새출발',
  FAITH: '믿음',
};

const TESTAMENT_MAP = {
  구약: 'OLD',
  신약: 'NEW',
};

/**
 * 1단계 (말씀 찾아보기): 성경 말씀 검색창 + 감정 카테고리 선택 + 추천 말씀 카드
 */
export function Step1SelectVerse({
  verses = [],
  selectedCategory = '응원',
  onSelectCategory,
  selectedVerse,
  onSelectVerse,
  onNext,
  onBack,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('전체');

  // 현재 선택된 감정 카테고리에 속한 성경 구절 목록
  const categoryVerses = useMemo(() => {

    const categoryValue =
      CATEGORY_MAP[selectedCategory] ?? selectedCategory;

    return verses.filter(
      (v) => v.category === categoryValue
    );

  }, [verses, selectedCategory]);

  // 다른 말씀 보기 (순환)
  const handleNextInSameCategory = () => {
    const currentIndex = categoryVerses.findIndex((v) => v.id === selectedVerse?.id);
    const nextIndex = (currentIndex + 1) % (categoryVerses.length || 1);
    const nextVerse = categoryVerses[nextIndex] || categoryVerses[0];
    if (nextVerse) {
      onSelectVerse({
        ...nextVerse,
        source: 'provided',
      });
    }
  };

  // 검색 필터링 (키워드 또는 성경 구절 검색)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();

    return verses.filter((v) => {
      const testamentValue =
        TESTAMENT_MAP[selectedTestament] ?? selectedTestament;

      const matchTestament =
        selectedTestament === '전체' ||
        v.testament === testamentValue;
      const matchQuery =
        v.reference.toLowerCase().includes(query) ||
        v.verse.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query);
      return matchTestament && matchQuery;
    });
  }, [verses, searchQuery, selectedTestament]);

  const handleSelectFromSearch = (v) => {

    onSelectVerse({
      ...v,
      source: 'provided',
    });

    const categoryName =
      CATEGORY_REVERSE_MAP[v.category] ?? v.category;

    onSelectCategory(categoryName);

    setSearchQuery('');
  };

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
            말씀 찾아보기
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
            <span className="text-[#6B4AA6] font-semibold">말씀 선택</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>메시지</span>
            <span className="text-[#CCC3D3]">›</span>
            <span>보내기</span>
          </div>
          <span className="font-semibold text-[#6B4AA6]">1 / 3</span>
        </div>

        {/* Search Bar (Top Area) */}
        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="성경 구절이나 키워드를 검색해보세요"
              className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder-[#565B86]/60 focus:outline-none focus:border-[#6B4AA6] focus:ring-1 focus:ring-[#6B4AA6] shadow-2xs transition-all"
            />
            <Search className="w-4 h-4 text-[#8C7A9C] absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-[#8C7A9C] hover:text-[#3F315F] absolute right-3 top-3"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Result Dropdown / Inline list */}
          {searchQuery.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 bg-white rounded-2xl border border-[#E8B7C8] shadow-lg p-3 max-h-60 overflow-y-auto space-y-2"
            >
              <div className="flex items-center justify-between px-1 pb-1 border-b border-[#E8B7C8]/40">
                <span className="text-xs font-bold text-[#6B4AA6]">
                  검색 결과 ({searchResults.length})
                </span>
                <div className="flex gap-1">
                  {['전체', '구약', '신약'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTestament(t)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedTestament === t
                        ? 'bg-[#6B4AA6] text-white'
                        : 'bg-[#FFF8EE] text-[#565B86]'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-5 text-xs text-[#565B86]">
                  &lsquo;{searchQuery}&rsquo;에 해당하는 말씀을 찾지 못했어요.
                </div>
              ) : (
                searchResults.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleSelectFromSearch(v)}
                    className="p-3 rounded-xl bg-[#FFF8EE]/60 hover:bg-[#EADDFF]/40 border border-[#E8B7C8]/50 hover:border-[#6B4AA6] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#3F315F]">
                        {v.reference}
                      </span>
                      <span className="text-[10px] text-[#565B86] bg-[#FFF1C7] px-2 py-0.5 rounded-md font-medium">
                        성경전서 개역한글판
                      </span>
                    </div>
                    <p className="text-xs font-serif-kr text-[#3F315F] line-clamp-2 leading-relaxed">
                      {v.verse}
                    </p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Emotion / Heart Category Section */}
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#3F315F] leading-snug mb-1 font-display">
            어떤 마음을 전하고 싶나요?
          </h2>
          <p className="text-xs sm:text-sm text-[#565B86]">
            마음을 고르면 어울리는 말씀을 추천해드릴게요.
          </p>

          {/* Heart Category Chips Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5 mt-3.5">
            {HEART_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {

                    onSelectCategory(cat.id);

                    const categoryValue =
                      CATEGORY_MAP[cat.id] ?? cat.id;

                    const matched =
                      verses.filter(
                        (v) => v.category === categoryValue
                      );

                    if (matched.length > 0) {
                      onSelectVerse({
                        ...matched[0],
                        source: 'provided',
                      });
                    }
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${isSelected
                    ? 'bg-[#EADDFF] border-2 border-[#6B4AA6] text-[#3F315F] shadow-xs scale-[1.02]'
                    : 'bg-white/90 border border-[#E8B7C8]/80 text-[#3F315F] hover:border-[#6B4AA6]/50 hover:bg-[#FFF1C7]/30'
                    }`}
                >
                  <span className="text-sm sm:text-base">{cat.emoji}</span>
                  <span>{cat.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#6B4AA6] stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E8B7C8]/30 my-4" />

        {/* Bible Verse Card Area */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-bold text-[#3F315F]">
              추천 말씀
            </h3>
            <span className="text-[11px] text-[#565B86]">
              {selectedCategory}의 마음
            </span>
          </div>

          {/* Bible Verse Card */}
          <motion.div
            key={selectedVerse?.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white/95 rounded-[24px] p-5 sm:p-6 border border-[#E8B7C8] dama-card-shadow text-center flex flex-col items-center justify-center min-h-[190px]"
          >
            <div className="flex items-center justify-between w-full mb-3 px-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF1C7] text-[#6B4AA6] text-xs font-semibold">
                <BookOpen className="w-3 h-3" />
                <span>{selectedVerse?.reference}</span>
              </div>
              <span className="text-[10px] text-[#8C7A9C] font-medium bg-[#FFF8EE] px-2 py-0.5 rounded-md border border-[#E8B7C8]/60">
                성경전서 개역한글판
              </span>
            </div>

            <p className="font-serif-kr text-[15px] sm:text-[16px] text-[#3F315F] leading-relaxed break-keep px-1 select-text">
              &ldquo;{selectedVerse?.verse}&rdquo;
            </p>

            <div className="w-8 h-0.5 bg-[#E8B7C8]/60 rounded-full mt-4" />
          </motion.div>

          {/* Verse Action Buttons */}
          <div className="flex items-center justify-center gap-3 mt-3.5">
            <button
              type="button"
              onClick={handleNextInSameCategory}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-[#6B4AA6] bg-white border border-[#6B4AA6]/40 hover:bg-[#FFF1C7]/40 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#6B4AA6]" />
              <span>다른 말씀 보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
        >
          <span>메시지 작성하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
