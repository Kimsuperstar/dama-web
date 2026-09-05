import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Sparkles, BookOpen, Clock, Heart, AlertCircle, Moon, ShieldAlert } from 'lucide-react';
import { HEART_CATEGORIES } from '../data/verses';
import { CHUSEOK_OPEN_AT } from '../constants/chuseok';

/**
 * 받은 말씀 목록 및 추석 오픈 보관함 모달
 * (추석 당일 전까지는 말씀 본문, 장절, 메시지 및 보낸이 이름이 안전하게 잠김)
 */
export function ViewVersesModal({
  isOpen,
  onClose,
  moonData,
  isOwner = true,
  isAdmin = false,
  isDevChuseokDay = false,
  onToggleDevChuseok,
}) {
  const [activeCategory, setActiveCategory] = useState('전체');

  if (!isOpen) return null;

  const messages = moonData?.messages || [];
  const filteredMessages = activeCategory === '전체'
    ? messages
    : messages.filter((m) => m.category === activeCategory);

  const isChuseokPassed = Date.now() >= CHUSEOK_OPEN_AT;
  const isActuallyUnlocked = isChuseokPassed || (isAdmin && isDevChuseokDay);

  const getCategoryName = (categoryValue) => {
    const category = HEART_CATEGORIES.find(
      (item) => item.value === categoryValue
    );

    return category?.name ?? categoryValue;
  };

  const getVerseReference = (message) => {
    if (message.sourceType === 'MANUAL') {
      return message.manualReference;
    }

    return message.verseReference ?? '';
  };

  const getVerseText = (message) => {
    if (message.sourceType === 'MANUAL') {
      return message.manualText;
    }

    return message.verseText ?? '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-[520px] max-h-[90vh] bg-[#FFF8EE] rounded-[28px] border border-[#E8B7C8] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#E8B7C8]/50 flex items-center justify-between bg-white/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌕</span>
              <h3 className="text-lg font-bold text-[#3F315F]">
                {moonData?.ownerName || '나'}의 보름달 말씀 보관함
              </h3>
            </div>
            <p className="text-xs text-[#565B86] mt-0.5">
              도착한 말씀과 축복 <strong>총 {messages.length}개</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#565B86] hover:bg-[#FFF1C7] transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chuseok Unlock Announcement Banner */}
        <div className={`px-5 py-3.5 border-b border-[#E8B7C8]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
          isActuallyUnlocked
            ? 'bg-gradient-to-r from-[#FFF1C7] via-[#FFF8EE] to-[#EADDFF]/40'
            : 'bg-gradient-to-r from-[#FFF1C7] to-[#FFF8EE]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              isActuallyUnlocked ? 'bg-[#BA1A1A] text-white shadow-xs' : 'bg-[#6B4AA6] text-white'
            }`}>
              {isActuallyUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[#3F315F] flex items-center gap-1.5">
                <span>
                  {isActuallyUnlocked
                    ? '🌕 2026 한가위 추석 당일! 모든 말씀이 공개되었습니다'
                    : '추석 날짜(2026.09.25 00:00)에 공개됩니다'}
                </span>
              </p>
              <p className="text-[11px] text-[#565B86]">
                {isActuallyUnlocked
                  ? '소중한 분들이 마음을 담아 전한 축복과 성경 말씀을 확인하세요.'
                  : '추석 전까지 말씀 구절, 개인 메시지, 보낸 사람은 모두 비밀로 보관돼요.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            {isAdmin && onToggleDevChuseok && (
              <button
                type="button"
                onClick={onToggleDevChuseok}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                  isDevChuseokDay
                    ? 'bg-[#BA1A1A] text-white shadow-xs'
                    : 'bg-white text-[#BA1A1A] border border-[#BA1A1A]/40 hover:bg-[#FFF1C7]'
                }`}
                title="개발용: 2026년 추석 당일(00:00) 상태 토글"
              >
                <span>🌕</span>
                <span>{isDevChuseokDay ? '추석 당일 ON' : '추석 당일 테스트'}</span>
              </button>
            )}

          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 sm:px-5 py-3 border-b border-[#E8B7C8]/40 bg-white/60 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('전체')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activeCategory === '전체'
                ? 'bg-[#6B4AA6] text-white shadow-xs'
                : 'bg-white text-[#565B86] border border-[#E8B7C8] hover:bg-[#FFF1C7]/40'
            }`}
          >
            전체 ({messages.length})
          </button>
          {HEART_CATEGORIES.map((cat) => {
            const count = messages.filter((m) => m.category === cat.value).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#6B4AA6] text-white shadow-xs'
                    : 'bg-white text-[#3F315F] border border-[#E8B7C8] hover:bg-[#FFF1C7]/40'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] ${activeCategory === cat.id ? 'text-white/80' : 'text-[#8C7A9C]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Message Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-3xl mb-2">☁️</div>
              <p className="text-sm font-semibold text-[#3F315F]">아직 도착한 말씀이 없어요</p>
              <p className="text-xs text-[#565B86] mt-1">친구들에게 보름달 링크를 공유해보세요!</p>
            </div>
          ) : (
            filteredMessages.map((msg, index) => {
              const isLocked = msg.locked === true || !isActuallyUnlocked;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`p-4 sm:p-4.5 rounded-[22px] border transition-all text-left relative overflow-hidden ${
                    isLocked 
                      ? 'bg-white/95 border-[#E8B7C8] shadow-xs' 
                      : 'bg-white border-[#6B4AA6]/40 shadow-sm'
                  }`}
                >
                  {/* Top Status & Date */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EADDFF] text-[#6B4AA6]">
                        {getCategoryName(msg.category)}의 마음
                      </span>
                      {isLocked ? (
                        <span className="text-[11px] font-semibold text-[#8C7A9C] flex items-center gap-1">
                          <Lock className="w-3 h-3 text-[#6B4AA6]" />
                          <span>추석에 열리는 말씀</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#3F315F] flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-[#6B4AA6]" />
                          {getVerseReference(msg)}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#565B86]">{msg.createdAt}</span>
                  </div>

                  {/* Locked Body vs Unlocked Body */}
                  {isLocked ? (
                    <div className="p-4 bg-[#FFF8EE] rounded-2xl border border-dashed border-[#E8B7C8] flex flex-col items-center justify-center text-center py-5">
                      <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-2 shadow-2xs">
                        <Lock className="w-4 h-4" />
                      </div>
                      <p className="font-serif-kr text-xs sm:text-[13px] font-bold text-[#3F315F] mb-1">
                        &ldquo;추석날 보름달과 함께 공개될 성경 말씀입니다&rdquo;
                      </p>
                      <p className="text-[11px] text-[#8C7A9C]">
                        추석 당일(00:00)에 말씀과 보낸 사람이 공개돼요 ✦
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Verse Body (Unlocked) */}
                      <p className="font-serif-kr text-xs sm:text-[13px] text-[#3F315F] leading-relaxed mb-3">
                        &ldquo;{getVerseText(msg)}&rdquo;
                      </p>

                      {msg.personalMessage && (
                        <div className="p-3 bg-[#FFF1C7]/35 rounded-xl border border-[#E8B7C8] mb-2.5">
                          <p className="text-xs sm:text-[13px] text-[#3F315F] leading-relaxed break-keep">
                            {msg.personalMessage}
                          </p>
                        </div>
                      )}

                      <div className="text-right text-[11px] font-bold text-[#6B4AA6]">
                        — {msg.isAnonymous ? '익명의 친구' : `${msg.authorName}이(가)`}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-white/80 border-t border-[#E8B7C8]/40 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#3F315F] text-white rounded-full text-sm font-semibold hover:bg-[#53318C] transition-colors shadow-xs"
          >
            확인 및 닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
