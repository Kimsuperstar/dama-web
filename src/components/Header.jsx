import React, { useEffect, useRef, useState } from 'react';
import { DamaLogo } from './DamaLogo';
import {
  Check,
  Eye,
  Sparkles,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

export function Header({
  isLoggedIn = false,
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
  onOpenDesignReview,
  onGoHome,
}) {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);

  const showDevTools =
    isLoggedIn &&
    (isAdmin || currentUser?.role === 'ADMIN') &&
    currentView !== 'landing';

  const showAdminMenu =
    realIsAdmin &&
    currentView !== 'landing' &&
    (onToggleAdminViewMode || onToggleDevChuseok || onOpenDesignReview);

  useEffect(() => {
    if (!isAdminMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target)
      ) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isAdminMenuOpen]);

  const handleAdminMenuAction = (action) => {
    action?.();
    setIsAdminMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8EE]/90 border-b border-[#E8B7C8]/40 transition-colors">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <DamaLogo
          variant="primary"
          color="#3F315F"
          onClick={onGoHome}
          className="cursor-pointer"
        />

        <div className="flex items-center gap-1.5 sm:gap-2">
          {showAdminMenu && (
            <div ref={adminMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAdminMenuOpen((prev) => !prev)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-xs ${
                  adminViewMode === 'user'
                    ? 'bg-white text-[#6B4AA6] border-[#6B4AA6]/45 ring-2 ring-[#EADDFF]'
                    : isDevChuseokDay
                      ? 'bg-[#BA1A1A] text-white border-[#BA1A1A] ring-2 ring-[#BA1A1A]/20'
                      : 'bg-white/80 text-[#53318C] border-[#E8B7C8]/80 hover:bg-[#FFF1C7]/60'
                }`}
                aria-label="관리자 메뉴 열기"
                aria-expanded={isAdminMenuOpen}
                title="관리자 메뉴"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>

              {isAdminMenuOpen && (
                <div className="absolute right-0 top-10 w-56 rounded-2xl border border-[#E8B7C8] bg-white/95 backdrop-blur-md p-2 text-left shadow-xl z-50">
                  <div className="px-3 py-2 border-b border-[#E8B7C8]/50 mb-1">
                    <p className="text-xs font-bold text-[#3F315F]">
                      관리자 메뉴
                    </p>
                    <p className="text-[11px] font-medium text-[#8C7A9C] mt-0.5">
                      현재 {adminViewMode === 'admin' ? '관리자 모드' : '사용자 모드'}
                    </p>
                  </div>

                  {onToggleAdminViewMode && (
                    <button
                      type="button"
                      onClick={() => handleAdminMenuAction(onToggleAdminViewMode)}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#3F315F] hover:bg-[#FFF1C7]/60 transition-colors"
                    >
                      {adminViewMode === 'admin' ? (
                        <UserRound className="w-4 h-4 text-[#6B4AA6]" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-[#6B4AA6]" />
                      )}
                      <span>
                        {adminViewMode === 'admin'
                          ? '사용자 모드로 보기'
                          : '관리자 모드로 돌아가기'}
                      </span>
                    </button>
                  )}

                  {showDevTools && onToggleDevChuseok && (
                    <button
                      type="button"
                      onClick={() => handleAdminMenuAction(onToggleDevChuseok)}
                      className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#3F315F] hover:bg-[#FFF1C7]/60 transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#6B4AA6]" />
                        <span>추석 당일 미리보기</span>
                      </span>
                      {isDevChuseokDay && (
                        <Check className="w-4 h-4 text-[#BA1A1A]" />
                      )}
                    </button>
                  )}

                  {showDevTools && onOpenDesignReview && (
                    <button
                      type="button"
                      onClick={() => handleAdminMenuAction(onOpenDesignReview)}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#3F315F] hover:bg-[#FFF1C7]/60 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#6B4AA6]" />
                      <span>디자인 피드백 보기</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#8C7A9C] hover:text-[#BA1A1A] hover:bg-[#FFF1C7]/60 border border-[#E8B7C8]/70 bg-white/70 transition-all shadow-2xs"
              title="로그아웃"
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
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
