import React from 'react';

/**
 * 담아(Dama) 공식 브랜드 로고 컴포넌트
 * 새로운 공식 로고(DA✦ | 담아) 벡터 그래픽 적용
 * @param {'primary' | 'symbol' | 'full' | 'stamp' | 'wordmark'} variant
 * @param {string} color 기본 컬러 (#352758 / #3F315F)
 * @param {'sm'|'md'|'lg'|'xl'|number} size
 * @param {string} className
 * @param {function} onClick
 */
export function DamaLogo({ 
  variant = 'primary', 
  color = '#352758', 
  size = 'md',
  className = '',
  onClick,
}) {
  const sizeMap = {
    sm: { height: 26, width: 92 },
    md: { height: 34, width: 120 },
    lg: { height: 44, width: 156 },
    xl: { height: 56, width: 200 },
  };

  const currentSize = typeof size === 'number' 
    ? { height: size, width: size * 3.5 }
    : (sizeMap[size] || sizeMap.md);

  // 1. 단독 심볼 (DA + ✦ 스파클)
  if (variant === 'symbol') {
    const symbolWidth = currentSize.height * 1.1;
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={{ height: currentSize.height, width: symbolWidth }}
      >
        <svg 
          viewBox="0 0 90 90" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Serif 'D' */}
          <path
            d="M 16 18 H 40 C 56 18 68 28 68 45 C 68 62 56 72 40 72 H 16 V 66 H 24 V 24 H 16 V 18 Z M 32 24 V 66 H 39 C 50 66 59 58 59 45 C 59 32 50 24 39 24 H 32 Z"
            fill={color}
          />
          {/* Serif 'A' Intertwined */}
          <path
            d="M 46 29 L 66 72 H 58 L 54 62 H 38 L 34 72 H 26 L 46 29 Z M 46 42 L 41 54 H 51 L 46 42 Z"
            fill={color}
          />
          {/* 4-Point Star Sparkle ✦ */}
          <path
            d="M 68 13 C 68 18 66 21 61 21 C 66 21 68 24 68 29 C 68 24 70 21 75 21 C 70 21 68 18 68 13 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  // 2. 한지 스탬프 인장 스타일
  if (variant === 'stamp') {
    const stampSize = currentSize.height * 1.2;
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center p-1.5 rounded-xl border border-[#E8B7C8] bg-[#FFF8EE] shadow-xs select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={{ width: stampSize, height: stampSize }}
      >
        <svg 
          viewBox="0 0 90 90" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect x="4" y="4" width="82" height="82" rx="14" stroke={color} strokeWidth="3" fill="#FFF1C7" fillOpacity="0.4" />
          {/* 'D' */}
          <path
            d="M 18 20 H 38 C 52 20 62 29 62 45 C 62 61 52 70 38 70 H 18 V 64 H 24 V 26 H 18 V 20 Z M 30 26 V 64 H 37 C 46 64 54 57 54 45 C 54 33 46 26 37 26 H 30 Z"
            fill={color}
          />
          {/* 'A' */}
          <path
            d="M 44 32 L 62 70 H 54 L 51 62 H 37 L 34 70 H 26 L 44 32 Z M 44 44 L 40 54 H 48 L 44 44 Z"
            fill={color}
          />
          {/* Sparkle ✦ */}
          <path
            d="M 64 16 C 64 20 62 22 58 22 C 62 22 64 24 64 28 C 64 24 66 22 70 22 C 66 22 64 20 64 16 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  // 3. 한글 워드마크 단독 (담아)
  if (variant === 'wordmark') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
        style={{ height: currentSize.height }}
      >
        <svg 
          viewBox="0 0 130 70" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          {/* 글자 '담' */}
          {/* ㄷ */}
          <path d="M 6 12 H 42 V 18 H 14 V 30 H 42 V 36 H 6 V 12 Z" fill={color} />
          {/* ㅏ */}
          <path d="M 49 10 H 56 V 40 H 49 V 10 Z" fill={color} />
          <path d="M 56 22 H 63 V 28 H 56 V 22 Z" fill={color} />
          {/* ㅁ */}
          <path d="M 8 44 H 56 V 64 H 8 V 44 Z M 15 50 V 58 H 49 V 50 H 15 Z" fill={color} />

          {/* 글자 '아' */}
          {/* ㅇ */}
          <path 
            d="M 94 10 C 82 10 72 20 72 32 C 72 44 82 54 94 54 C 106 54 116 44 116 32 C 116 20 106 10 94 10 Z M 94 17 C 102 17 109 23 109 32 C 109 41 102 47 94 47 C 86 47 79 41 79 32 C 79 23 86 17 94 17 Z" 
            fill={color} 
          />
          {/* ㅏ */}
          <path d="M 122 10 H 129 V 64 H 122 V 10 Z" fill={color} />
          <path d="M 129 33 H 136 V 40 H 129 V 33 Z" fill={color} />
        </svg>
      </div>
    );
  }

  // 4. 공식 기본형 풀 로고 ( [DA✦] | [담아] )
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ height: currentSize.height }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <svg 
        viewBox="0 0 250 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        style={{ maxHeight: '100%' }}
      >
        {/* ================= 1. Monogram "DA✦" ================= */}
        {/* Serif 'D' */}
        <path
          d="M 18 16 H 42 C 57 16 68 26 68 43 C 68 60 57 70 42 70 H 18 V 64 H 25 V 22 H 18 V 16 Z M 32 22 V 64 H 41 C 51 64 59 55 59 43 C 59 31 51 22 41 22 H 32 Z"
          fill={color}
        />
        {/* Serif 'A' (Interlaced) */}
        <path
          d="M 48 26 L 68 70 H 60 L 56 60 H 39 L 35 70 H 27 L 48 26 Z M 48 40 L 42 53 H 53 L 48 40 Z"
          fill={color}
        />
        {/* 4-Point Star Sparkle ✦ */}
        <path
          d="M 70 12 C 70 17 68 19 63 19 C 68 19 70 21 70 26 C 70 21 72 19 77 19 C 72 19 70 17 70 12 Z"
          fill={color}
        />

        {/* ================= 2. Vertical Divider Line "|" ================= */}
        <path
          d="M 94 12 V 72"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* ================= 3. Korean Wordmark "담아" ================= */}
        {/* --- 글자 '담' --- */}
        {/* 'ㄷ' */}
        <path 
          d="M 116 18 H 154 V 24 H 123 V 35 H 154 V 41 H 116 V 18 Z" 
          fill={color} 
        />
        {/* 'ㅏ' (기둥 + 곁가지) */}
        <path 
          d="M 160 16 H 167 V 44 H 160 V 16 Z" 
          fill={color} 
        />
        <path 
          d="M 167 27 H 174 V 33 H 167 V 27 Z" 
          fill={color} 
        />
        {/* 'ㅁ' (받침) */}
        <path 
          d="M 118 47 H 166 V 67 H 118 V 47 Z M 125 53 V 61 H 159 V 53 H 125 Z" 
          fill={color} 
        />

        {/* --- 글자 '아' --- */}
        {/* 'ㅇ' (초성 원형) */}
        <path 
          d="M 204 16 C 192 16 182 26 182 38 C 182 50 192 60 204 60 C 216 60 226 50 226 38 C 226 26 216 16 204 16 Z M 204 23 C 212 23 219 29 219 38 C 219 47 212 53 204 53 C 196 53 189 47 189 38 C 189 29 196 23 204 23 Z" 
          fill={color} 
        />
        {/* 'ㅏ' (모음 기둥 + 곁가지) */}
        <path 
          d="M 232 16 H 239 V 68 H 232 V 16 Z" 
          fill={color} 
        />
        <path 
          d="M 239 37 H 248 V 44 H 239 V 37 Z" 
          fill={color} 
        />
      </svg>
    </div>
  );
}

