import React from 'react';
import { DamaLogo } from './DamaLogo';
import { Sparkles, ShieldCheck, UserRound } from 'lucide-react';

/**
 * 상단 글로벌 헤더 컴포넌트
 */
export function Header({
  isLoggedIn = false,
  authProvider = null,
  currentUser = null,
  isAdmin = false,
  realIsAdmin = false,
  adminViewMode = 'admin',
  onToggleAdminViewMode,
  currentView = 'landing',
  isDevChuseokDay = false,
  onToggleDevChuseok,
  onOpenLogin,
  onLogout,
  onOpenCreateMoon,
  onOpenDesignReview,
  onGoHome,
}) {
  // 랜딩페이지이거나 카카오/네이버 일반 로그인인 경우 개발/피드백 도구 숨김 (개발자 로그인 상태일 때만 표시)
  const showDevTools =
    isLoggedIn &&
    (isAdmin || currentUser?.role === 'ADMIN') &&
    currentView !== 'landing';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8EE]/90 border-b border-[#E8B7C8]/40 transition-colors">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <DamaLogo 
          variant="primary" 
          color="#3F315F" 
          onClick={onGoHome}
          className="cursor-pointer"
        />

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 개발자 추석 당일 테스트 버튼 (개발자 로그인 시에만 노출) */}
          {showDevTools && (
            <button
              type="button"
              onClick={onToggleDevChuseok}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                isDevChuseokDay
                  ? 'bg-[#BA1A1A] text-white shadow-xs animate-pulse ring-2 ring-[#BA1A1A]/30'
                  : 'bg-white text-[#6B4AA6] border border-[#6B4AA6]/40 hover:bg-[#EADDFF]/50'
              }`}
              title="클릭하여 2026년 추석 당일(00:00 오픈) 상태를 시연합니다"
            >
              <span>{isDevChuseokDay ? '🌕' : '🧪'}</span>
              <span className="hidden sm:inline">
                {isDevChuseokDay ? '추석 당일 모드 ON' : '추석 당일 시연'}
              </span>
              <span className="sm:hidden">
                {isDevChuseokDay ? '추석ON' : '추석시연'}
              </span>
            </button>
          )}

          {/* Design System & Critique Inspector Button (개발자 로그인 시에만 노출) */}
          {showDevTools && (
            <button
              onClick={onOpenDesignReview}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#53318C] bg-[#FFF1C7] border border-[#E8B7C8] hover:bg-[#FFEAA7] transition-all"
              title="디자인 시스템 및 보완점 분석 보기"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6B4AA6]" />
              <span className="hidden md:inline">디자인 피드백</span>
              <span className="md:hidden">피드백</span>
            </button>
          )}

          {/* Login / Logout Button */}
          {realIsAdmin && onToggleAdminViewMode && (
            <button
              type="button"
              onClick={onToggleAdminViewMode}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-all shadow-xs ${
                adminViewMode === 'admin'
                  ? 'bg-[#3F315F] text-white border-[#3F315F] hover:bg-[#53318C]'
                  : 'bg-white text-[#6B4AA6] border-[#6B4AA6]/40 hover:bg-[#EADDFF]/50'
              }`}
              title={
                adminViewMode === 'admin'
                  ? '일반 사용자 화면으로 확인'
                  : '관리자 화면으로 돌아가기'
              }
            >
              {adminViewMode === 'admin' ? (
                <UserRound className="w-3.5 h-3.5" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {adminViewMode === 'admin' ? '사용자 모드' : '관리자 모드'}
              </span>
            </button>
          )}

          {/* Login / Logout Button */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#8C7A9C] hover:text-[#BA1A1A] hover:bg-[#FFF1C7]/60 border border-[#E8B7C8]/70 bg-white/70 transition-all shadow-2xs"
              title="로그아웃하여 방문자 시점으로 돌아가기"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#3F315F] bg-white/80 border border-[#6B4AA6]/30 hover:border-[#6B4AA6] hover:bg-white transition-all shadow-xs"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
