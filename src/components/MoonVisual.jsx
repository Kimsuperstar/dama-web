import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

/**
 * 차오르는 보름달 인터랙티브 SVG 컴포넌트
 * @param {number} percentage 0부터 100까지의 차오름 퍼센트
 * @param {'sm'|'md'|'lg'} size 크기
 * @param {boolean} glow 빛 효과 여부
 * @param {string} className 추가 클래스
 */
export function MoonVisual({
  percentage = 0,
  size = 'md',
  glow = true,
  className = '',
}) {
  // 0% ~ 100% 클램핑
  const clampedPct = Math.min(100, Math.max(0, percentage));
  
  const radius = 48;
  const cx = 50;
  const cy = 50;

  // 음력 위상 타원 궤적(Terminator Ellipse) 계산
  const isWaxingMoreThanHalf = clampedPct >= 50;
  const phaseFraction = (clampedPct - 50) / 50; // -1 to +1
  const rx = Math.abs(phaseFraction * radius);
  const sweepFlag = phaseFraction >= 0 ? 0 : 1;

  const dimensions = {
    sm: 'w-28 h-28',
    md: 'w-56 h-56 sm:w-64 sm:h-64',
    lg: 'w-72 h-72 sm:w-80 sm:h-80',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions[size] || dimensions.md} ${className}`}>
      {/* 은은한 달빛 후광 레이어 */}
      {glow && (
        <>
          <div className="absolute inset-0 bg-[#FFF1C7]/30 rounded-full blur-3xl transform scale-125 pointer-events-none" />
          <div className="absolute inset-0 bg-[#6B4AA6]/15 rounded-full blur-2xl transform scale-150 pointer-events-none" />
        </>
      )}

      {/* 밤하늘 반짝이는 별 파티클 */}
      <motion.div 
        className="absolute -top-2 right-4 text-[#FFF1C7] pointer-events-none drop-shadow-sm"
        animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-5 h-5 text-[#6B4AA6]/70 fill-[#FFF1C7]" />
      </motion.div>

      <motion.div 
        className="absolute bottom-6 -left-3 text-[#E8B7C8] pointer-events-none"
        animate={{ y: [0, 5, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Sparkles className="w-4 h-4 text-[#E8B7C8] fill-[#FFF8EE]" />
      </motion.div>

      <motion.div 
        className="absolute top-1/2 -right-4 text-[#FFF1C7] pointer-events-none"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <span className="text-xs">✦</span>
      </motion.div>

      {/* 플로팅 애니메이션 보름달 */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* 뒤편 전통 구름 문양 1 */}
        <motion.div
          className="absolute -bottom-2 -left-6 text-[#EADDFF]/70 pointer-events-none select-none z-0"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="68" height="32" viewBox="0 0 100 45" fill="none">
            <path
              d="M10 35 C 10 20, 25 15, 35 25 C 45 10, 65 10, 75 22 C 85 18, 95 28, 90 35 C 80 42, 20 42, 10 35 Z"
              fill="#EADDFF"
              fillOpacity="0.45"
              stroke="#D9CEE8"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

        {/* 앞편 전통 구름 문양 2 */}
        <motion.div
          className="absolute -bottom-4 right-1 text-[#FFF1C7] pointer-events-none select-none z-20"
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <svg width="84" height="38" viewBox="0 0 120 50" fill="none">
            <path
              d="M15 40 C 15 25, 30 18, 45 28 C 55 12, 80 12, 92 25 C 105 20, 115 32, 108 40 C 95 48, 25 48, 15 40 Z"
              fill="#FFF8EE"
              fillOpacity="0.85"
              stroke="#E8B7C8"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>

        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full relative z-10 ${glow ? 'animate-moon-glow' : ''}`}
          style={{ filter: 'drop-shadow(0 12px 24px rgba(63, 49, 95, 0.12))' }}
        >
          <defs>
            <radialGradient id="moonLitGradient" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#FFF8EE" />
              <stop offset="100%" stopColor="#FFF1C7" />
            </radialGradient>

            <radialGradient id="moonDarkGradient" cx="60%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#EADBFF" />
              <stop offset="70%" stopColor="#D9CEE8" />
              <stop offset="100%" stopColor="#C8BED8" />
            </radialGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 달의 기본 어두운 원형 베이스 */}
          <circle 
            cx={cx} 
            cy={cy} 
            r={radius} 
            fill="url(#moonDarkGradient)" 
            stroke="#D8CEE6" 
            strokeWidth="0.5" 
          />

          {/* 차오른 달빛 영역 */}
          {clampedPct > 0 && clampedPct < 100 && (
            <g filter="url(#softGlow)">
              {isWaxingMoreThanHalf ? (
                <path
                  d={`M ${cx} ${cy - radius} 
                     A ${radius} ${radius} 0 0 0 ${cx} ${cy + radius}
                     A ${rx} ${radius} 0 0 ${sweepFlag} ${cx} ${cy - radius} Z`}
                  fill="url(#moonLitGradient)"
                />
              ) : (
                <path
                  d={`M ${cx} ${cy - radius} 
                     A ${radius} ${radius} 0 0 0 ${cx} ${cy + radius}
                     A ${rx} ${radius} 0 0 ${sweepFlag} ${cx} ${cy - radius} Z`}
                  fill="url(#moonLitGradient)"
                />
              )}
            </g>
          )}

          {/* 100% 만월 */}
          {clampedPct >= 100 && (
            <circle 
              cx={cx} 
              cy={cy} 
              r={radius} 
              fill="url(#moonLitGradient)" 
              filter="url(#softGlow)"
            />
          )}

          {/* 섬세한 한지 크레이터 오버레이 */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="#FFF1C7"
            opacity="0.04"
            className="mix-blend-overlay pointer-events-none"
          />
        </svg>
      </motion.div>
    </div>
  );
}
