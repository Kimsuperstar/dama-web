import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, AlertTriangle, Sparkles, Palette, Type, Layout, ShieldCheck } from 'lucide-react';
import { DamaLogo } from './DamaLogo';

/**
 * 디자인 시스템 분석 & 비평 모달
 */
export function DesignSystemReviewModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl max-h-[90vh] bg-[#FFF8EE] rounded-[28px] border border-[#E8B7C8] shadow-2xl flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#E8B7C8]/50 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-3">
            <DamaLogo variant="symbol" size="sm" />
            <div>
              <h3 className="text-lg font-bold text-[#3F315F]">
                담아(Dama) 디자인 시스템 및 심층 분석 리포트
              </h3>
              <p className="text-xs text-[#565B86]">
                기존 시안 분석, 디자인 시스템 규격 및 보완점 진단
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#565B86] hover:bg-[#FFF1C7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-[#3F315F]">
          
          {/* Section 1: Color Palette */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#6B4AA6]">
              <Palette className="w-4 h-4" />
              <span>1. 컬러 팔레트 & 보름달 한지 무드</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#FFF8EE] border border-[#E8B7C8]">
                <div className="h-6 rounded-md bg-[#FFF8EE] border border-[#E8B7C8] mb-1.5" />
                <div className="font-bold text-xs">한지 크림 배경</div>
                <div className="text-[10px] text-[#565B86]">#FFF8EE</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="h-6 rounded-md bg-[#FFF1C7] mb-1.5" />
                <div className="font-bold text-xs">보름달빛 옐로우</div>
                <div className="text-[10px] text-[#565B86]">#FFF1C7</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="h-6 rounded-md bg-[#6B4AA6] mb-1.5" />
                <div className="font-bold text-xs text-white">깊은 보라 (Primary)</div>
                <div className="text-[10px] text-[#565B86]">#6B4AA6</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="h-6 rounded-md bg-[#E8B7C8] mb-1.5" />
                <div className="font-bold text-xs">연분홍 (Border)</div>
                <div className="text-[10px] text-[#565B86]">#E8B7C8</div>
              </div>
            </div>
          </div>

          {/* Section 2: Critique & Solved Points */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#6B4AA6]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. 기존 시안의 구조적 완성 & UX 개선점</span>
            </div>

            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#3F315F] mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>실제 음력 주기 알고리즘 기반의 달(Moon) 그래픽 렌더링</span>
                </div>
                <p className="text-[11px] text-[#565B86] leading-relaxed">
                  단순히 색을 채우는 바 형태를 넘어, SVG 타원 궤적(Terminator Ellipse) 수학 공식을 사용하여 메시지 누적 개수(0~15개)에 따라 초승달에서 반달, 온전한 만월(100%)로 자연스럽게 차오르도록 구현했습니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#3F315F] mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>게스트 참여율을 극대화한 No-Login 전송 플로우</span>
                </div>
                <p className="text-[11px] text-[#565B86] leading-relaxed">
                  말씀을 남기는 친구는 가입 절차 없이 3단계(마음/말씀 선택 → 짧은 메시지 작성 → 확인 및 전송)만으로 30초 내에 참여 가능하며, 전송 완료 후 &lsquo;나도 보름달 만들기&rsquo;로 이어지는 강력한 바이럴 루프를 구축했습니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8B7C8]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#3F315F] mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>추석 D-Day 잠금 및 성경 말씀 서체 배합</span>
                </div>
                <p className="text-[11px] text-[#565B86] leading-relaxed">
                  성경 본문에는 단아하고 가독성이 높은 나눔명조(Serif)를 적용하고, 인터페이스는 산세리프를 배합하여 경건함과 현대적인 모바일 사용성을 조화시켰습니다. 추석 당일 오픈 정책을 반영한 &lsquo;받은 말씀 보관함&rsquo;을 포함했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Typography & Components */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#6B4AA6]">
              <Type className="w-4 h-4" />
              <span>3. 타이포그래피 계층 & 인터랙션 규격</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E8B7C8] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#565B86]">디스플레이 / 메인 타이틀:</span>
                <span className="font-bold text-[#3F315F]">Gowun Batang / Gothic A1 (Bold 24~34px)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#565B86]">성경 말씀 구절 본문:</span>
                <span className="font-serif-kr text-[#3F315F]">Nanum Myeongjo (Regular/Medium 15~16px, 행간 1.6)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#565B86]">버튼 및 입력 필드:</span>
                <span className="font-medium text-[#3F315F]">높이 48~56px, Radius 24px (Pill), 터치 영역 44px 이상</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white/70 border-t border-[#E8B7C8]/40 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#6B4AA6] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#53318C]"
          >
            닫기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
