import React from 'react';
import { motion } from 'motion/react';
import { MoonVisual } from './MoonVisual';
import { ChuseokCountdown } from './ChuseokCountdown';
import { CHUSEOK_OPEN_AT } from '../constants/chuseok';
import { 
  Sparkles, 
  Moon, 
  Heart, 
  BookOpen, 
  Gift, 
  Share2, 
  Lock, 
  ChevronRight,
  CheckCircle2,
  Users,
  ShieldCheck
} from 'lucide-react';

/**
 * 담아(Dama) 비로그인 메인 랜딩 페이지 컴포넌트
 */
export function LandingPage({
  onOpenLogin,
  onOpenCreateMoon,
  onExploreDemoMoon,
  isDevChuseokDay = false,
  onToggleDevChuseok,
}) {
  // 2026년 추석 당일 판별 (상수 CHUSEOK_OPEN_AT 활용)
  const isChuseokPeriod = isDevChuseokDay || (Date.now() >= CHUSEOK_OPEN_AT);

  return (
    <div className="w-full max-w-[540px] px-4 pt-4 pb-16 flex flex-col items-center text-center">
      {/* 2026 Festive Season Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1C7] border border-[#E8B7C8] text-[#53318C] text-xs font-bold shadow-2xs mb-3">
        <span>🌾</span>
        <span>2026 한가위 성경 말씀 나눔 ✦ 담아</span>
        <span>🌕</span>
      </div>

      {/* Main Slogan & Headline */}
      <div className="mb-4">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#3F315F] tracking-tight leading-tight mb-2 break-keep">
          보름달에<br />
          <span className="text-[#6B4AA6] relative inline-block">
            말씀을 담아
            <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#FFF1C7] -z-10 rounded-sm" />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#565B86] leading-relaxed break-keep font-medium max-w-md mx-auto">
          소중한 사람에게 축복의 성경 말씀과 따뜻한 마음을 선물하고, 추석 00:00에 나만의 보름달을 함께 열어보세요.
        </p>
      </div>

      {/* Moon Visual Preview */}
      <div className="my-3 relative flex flex-col items-center">
        <MoonVisual percentage={isChuseokPeriod ? 100 : 75} size="lg" glow={true} />
      </div>

      {/* 2026 Chuseok Real-time Countdown Timer */}
      <div className="w-full my-3">
        <ChuseokCountdown 
          isDevChuseokDay={isDevChuseokDay} 
          onToggleDevChuseok={onToggleDevChuseok} 
        />
      </div>

      {/* Primary Landing CTAs */}
      <div className="w-full space-y-2.5 my-3">
        <button
          onClick={onOpenCreateMoon}
          className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 dama-button-shadow transition-all active:scale-[0.99] hover:opacity-95"
        >
          <Moon className="w-5 h-5 fill-white" />
          <span>내 보름달 만들기</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={onExploreDemoMoon}
          className="w-full h-12 bg-white hover:bg-[#FFF1C7]/30 border border-[#6B4AA6]/40 text-[#3F315F] rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs transition-all"
        >
          <Users className="w-4 h-4 text-[#6B4AA6]" />
          <span>예시 보름달 둘러보기</span>
        </button>
      </div>

      {/* Service Key Features Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4 text-left">
        <div className="bg-white/90 rounded-2xl p-4 border border-[#E8B7C8]/70 dama-card-shadow">
          <div className="w-8 h-8 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-2 font-bold text-sm">
            🌕
          </div>
          <h3 className="font-bold text-xs text-[#3F315F] mb-1">말씀으로 차는 달</h3>
          <p className="text-[11px] text-[#565B86] leading-tight break-keep">
            지인들이 전해준 축복의 성경 구절로 보름달이 환하게 채워집니다.
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl p-4 border border-[#E8B7C8]/70 dama-card-shadow">
          <div className="w-8 h-8 rounded-full bg-[#EADDFF] text-[#6B4AA6] flex items-center justify-center mb-2 font-bold text-sm">
            🔒
          </div>
          <h3 className="font-bold text-xs text-[#3F315F] mb-1">추석 당일 개봉</h3>
          <p className="text-[11px] text-[#565B86] leading-tight break-keep">
            정성껏 모인 비밀 말씀은 한가위 추석 00:00에 모두 열립니다.
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl p-4 border border-[#E8B7C8]/70 dama-card-shadow">
          <div className="w-8 h-8 rounded-full bg-[#FFF1C7] text-[#BA1A1A] flex items-center justify-center mb-2 font-bold text-sm">
            💌
          </div>
          <h3 className="font-bold text-xs text-[#3F315F] mb-1">간편한 링크 나눔</h3>
          <p className="text-[11px] text-[#565B86] leading-tight break-keep">
            회원가입 없이 누구나 링크 하나로 마음을 남길 수 있어요.
          </p>
        </div>
      </div>

      {/* 3 Step Process */}
      <div className="w-full bg-white/95 rounded-[28px] p-5 sm:p-6 border border-[#E8B7C8] dama-card-shadow my-4 text-left">
        <h2 className="text-base sm:text-lg font-bold text-[#3F315F] text-center mb-5 font-display">
          담아, 이렇게 시작해요
        </h2>

        <div className="grid grid-cols-3 gap-2 text-center relative">
          <div className="absolute top-4 left-[20%] right-[20%] h-[1px] border-t border-dashed border-[#6B4AA6]/30 -z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
              1
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
              <Moon className="w-4 h-4 fill-current text-[#6B4AA6]" />
            </div>
            <div className="font-bold text-xs text-[#3F315F] mb-1">보름달 만들기</div>
            <p className="text-[10px] text-[#565B86] leading-tight break-keep">
              내 이름으로 나만의 보름달을 3초 만에 만들어요.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
              2
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
              <Share2 className="w-4 h-4 text-[#6B4AA6]" />
            </div>
            <div className="font-bold text-xs text-[#3F315F] mb-1">링크 공유하기</div>
            <p className="text-[10px] text-[#565B86] leading-tight break-keep">
              카카오톡이나 인스타그램에 내 보름달 링크를 전해요.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-7 h-7 rounded-full bg-[#3F315F] text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">
              3
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FFF1C7] text-[#6B4AA6] flex items-center justify-center mb-1.5">
              <Gift className="w-4 h-4 text-[#BA1A1A]" />
            </div>
            <div className="font-bold text-xs text-[#3F315F] mb-1">추석에 열어보기</div>
            <p className="text-[10px] text-[#565B86] leading-tight break-keep">
              추석 00:00에 도착한 사랑과 축복의 말씀을 확인해요.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pt-6 pb-2 border-t border-[#E8B7C8]/40 text-center mt-4">
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-[#565B86] mb-2">
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">이용약관</a>
          <span>·</span>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">개인정보처리방침</a>
          <span>·</span>
          <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-[#3F315F]">고객센터</a>
        </div>
        <p className="text-[11px] text-[#565B86]/70">
          © 2026 Dama. All rights reserved. 너를 생각하며 말씀을 담아
        </p>
      </footer>
    </div>
  );
}
