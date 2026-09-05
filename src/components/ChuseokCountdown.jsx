import { useState, useEffect } from 'react';
import { Clock, Gift } from 'lucide-react';
import { CHUSEOK_OPEN_AT } from '../constants/chuseok';

/**
 * 2026년 추석(양력 2026년 9월 25일 00:00:00 KST) 실시간 카운트다운 컴포넌트
 */
export function ChuseokCountdown({ isDevChuseokDay = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (isDevChuseokDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const now = Date.now();
      const difference = CHUSEOK_OPEN_AT - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPassed: false,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isDevChuseokDay]);

  return (
    <div className="w-full bg-gradient-to-b from-[#FFF1C7]/45 via-white/95 to-[#FFF8EE] rounded-[24px] p-4 sm:p-5 border border-[#E8B7C8] dama-card-shadow relative overflow-hidden text-center mb-4">
      <div className="absolute -top-3 -right-3 text-3xl opacity-20 pointer-events-none select-none">
        🧧
      </div>
      <div className="absolute -bottom-3 -left-3 text-2xl opacity-15 pointer-events-none select-none">
        🌕
      </div>

      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6B4AA6] text-white rounded-full text-[11px] font-bold shadow-2xs">
          <Clock className="w-3 h-3 text-[#FFF1C7]" />
          <span>2026 한가위 D-Day 카운트다운</span>
        </div>

        <span className="text-[11px] font-semibold text-[#6B4AA6] bg-[#EADDFF]/50 px-2.5 py-0.5 rounded-full">
          2026.09.25 (금) 00:00 열림
        </span>
      </div>

      {isDevChuseokDay || timeLeft.isPassed ? (
        <div className="py-2 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1C7] border border-[#E8B7C8] text-[#BA1A1A] font-bold text-sm mb-1 animate-pulse">
            <Gift className="w-4 h-4" />
            <span>🌕 보름달처럼 풍성한 한가위 되세요 🌕</span>
          </div>
          <p className="text-xs text-[#565B86] mt-1 font-medium break-keep">
            2026 한가위 추석 당일! 소중한 분들이 마음에 담아 전한 축복과 성경 말씀이 모두 열렸습니다.
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-2 my-2">
            <div className="bg-white rounded-2xl py-2 px-1 border border-[#E8B7C8]/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-extrabold text-[#3F315F] font-mono block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#8C7A9C]">일</span>
            </div>

            <div className="bg-white rounded-2xl py-2 px-1 border border-[#E8B7C8]/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-extrabold text-[#3F315F] font-mono block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#8C7A9C]">시간</span>
            </div>

            <div className="bg-white rounded-2xl py-2 px-1 border border-[#E8B7C8]/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-extrabold text-[#3F315F] font-mono block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#8C7A9C]">분</span>
            </div>

            <div className="bg-white rounded-2xl py-2 px-1 border border-[#E8B7C8]/70 shadow-2xs">
              <span className="text-xl sm:text-2xl font-extrabold text-[#BA1A1A] font-mono block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#BA1A1A]">초</span>
            </div>
          </div>

          <p className="text-[11px] text-[#565B86] mt-1.5 font-medium">
            ✦ 추석 당일 00:00에 비밀 말씀이 공개됩니다 ✦
          </p>
        </div>
      )}
    </div>
  );
}
