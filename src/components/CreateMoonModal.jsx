import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Moon, Sparkles, Check, ArrowRight } from 'lucide-react';
import { DamaLogo } from './DamaLogo';

/**
  * 나만의 보름달 생성 모달
  * (목표 개수 설정 없이 15개 수신 시 자연스럽게 만월이 되는 한국 추석 보름달 컨셉)
  */
 export function CreateMoonModal({
  isOpen,
  onClose,
  onCreateMoon,
}) {
  const [name, setName] = useState('');
  const [createdUrl, setCreatedUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setName('');
    setCreatedUrl(null);
    setCopied(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    await onCreateMoon(trimmedName);
  };

  const handleCopy = () => {
    if (createdUrl) {
      navigator.clipboard.writeText(createdUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-[420px] bg-[#FFF8EE] rounded-[28px] border border-[#E8B7C8] shadow-2xl p-6 sm:p-7 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <DamaLogo variant="symbol" size="sm" />
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-[#565B86] hover:bg-[#FFF1C7] transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!createdUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#EADDFF] text-[#6B4AA6] mx-auto flex items-center justify-center mb-2.5 shadow-xs">
                <Moon className="w-6 h-6 fill-[#6B4AA6]" />
              </div>
              <h3 className="text-xl font-bold text-[#3F315F]">
                내 보름달 만들기
              </h3>
              <p className="text-xs text-[#565B86] mt-1 break-keep">
                친구들에게 따뜻한 말씀을 선물받을 나만의 보름달을 열어보세요.
              </p>
            </div>

            {/* Name Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#3F315F]">
                  당신의 이름 또는 별명
                </label>
                <span className="text-[11px] text-[#8C7A9C]">최대 12자</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 하늘, 지민, 민우, 다은, 믿음이"
                maxLength={12}
                required
                autoFocus
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] focus:outline-none focus:border-[#6B4AA6] focus:ring-1 focus:ring-[#6B4AA6] shadow-2xs"
              />

              {/* Quick Name Suggestions */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[11px] text-[#565B86] shrink-0">추천:</span>
                {['하늘', '지민', '민우', '다은', '소망', '믿음이'].map((sampleName) => (
                  <button
                    key={sampleName}
                    type="button"
                    onClick={() => setName(sampleName)}
                    className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8B7C8] text-[11px] text-[#6B4AA6] font-medium hover:bg-[#EADDFF]/50 transition-colors"
                  >
                    {sampleName}
                  </button>
                ))}
              </div>
            </div>

            {/* 15 Verses Moon Concept Info Box */}
            <div className="p-3.5 bg-[#FFF1C7]/50 rounded-2xl border border-[#E8B7C8]/70 flex items-start gap-2.5 text-left">
              <span className="text-base mt-0.5">🌕</span>
              <div className="text-xs text-[#565B86] leading-relaxed">
                <strong className="text-[#3F315F] font-bold">15개의 말씀이 모이면 만월이 완성돼요</strong>
                <p className="mt-0.5 text-[11px] text-[#565B86]">
                  음력 8월 15일 보름달의 의미를 담아 15개의 말씀으로 환한 달이 채워지며, 그 이후에도 계속해서 말씀을 받으실 수 있어요.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!name.trim()}
                className={`w-full h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-1.5 transition-all ${
                  name.trim()
                    ? 'bg-gradient-to-r from-[#6B4AA6] to-[#53318C] text-white dama-button-shadow active:scale-[0.99]'
                    : 'bg-[#CCC3D3] text-white cursor-not-allowed'
                }`}
              >
                <span>보름달 생성하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FFF1C7] text-[#6B4AA6] mx-auto flex items-center justify-center shadow-xs">
              <Sparkles className="w-7 h-7 text-[#6B4AA6]" />
            </div>

            <h3 className="text-xl font-bold text-[#3F315F]">
              보름달이 생성되었어요! 🌕
            </h3>
            <p className="text-xs text-[#565B86] break-keep">
              아래 링크를 친구들에게 공유하여 따뜻한 말씀을 선물받으세요.
            </p>

            <div className="p-3 bg-white rounded-2xl border border-[#E8B7C8] flex items-center justify-between">
              <span className="text-xs text-[#565B86] truncate max-w-[240px]">
                {createdUrl}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#6B4AA6] text-white hover:bg-[#53318C] transition-all flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{copied ? '복사됨' : '링크 복사'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-[#3F315F] text-white rounded-full text-xs font-semibold hover:bg-[#53318C] transition-colors"
            >
              내 보름달 보러가기
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
