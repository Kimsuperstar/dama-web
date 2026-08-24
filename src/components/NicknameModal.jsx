import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function NicknameModal({
  isOpen,
  currentNickname = '',
  onClose,
  onSave,
}) {
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // 기존 닉네임이 있으면 입력창에 미리 보여주기
  useEffect(() => {
    if (isOpen) {
      setNickname(currentNickname ?? '');
      setError('');
    }
  }, [isOpen, currentNickname]);

  if (!isOpen) {
    return null;
  }

  // 기존 닉네임이 있는지 확인
  const isEdit = Boolean(currentNickname);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      await onSave(trimmedNickname);

      onClose();
    } catch (error) {
      console.error('닉네임 저장 실패:', error);

      setError('닉네임 변경에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-[390px] bg-[#FFF8EE] rounded-[28px] border border-[#E8B7C8] shadow-2xl p-6 sm:p-7 relative">

        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-[#565B86] hover:bg-[#FFF1C7] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 제목 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF1C7] text-[#6B4AA6] text-xs font-bold mb-3">
            🌕 담아
          </div>

          <h2 className="text-xl font-bold text-[#3F315F]">
            {isEdit
              ? '닉네임을 수정해주세요'
              : '어떻게 불러드릴까요?'}
          </h2>

          <p className="mt-2 text-xs text-[#565B86]">
            보름달에 표시될 이름이에요.
          </p>
        </div>

        {/* 입력 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) =>
              setNickname(e.target.value)
            }
            placeholder="닉네임을 입력해주세요"
            maxLength={12}
            autoFocus
            className="
              w-full
              h-12
              px-4
              rounded-2xl
              bg-white
              border
              border-[#E8B7C8]
              text-sm
              text-[#3F315F]
              placeholder:text-[#8C7A9C]
              outline-none
              focus:border-[#6B4AA6]
            "
          />

          {/* 글자 수 */}
          <div className="flex justify-between mt-2 px-1">
            <div>
              {error && (
                <p className="text-xs text-red-500">
                  {error}
                </p>
              )}
            </div>

            <span className="text-[11px] text-[#8C7A9C]">
              {nickname.length}/12
            </span>
          </div>

          {/* 저장 */}
          <button
            type="submit"
            disabled={
              isSaving || !nickname.trim()
            }
            className="
              w-full
              h-12
              mt-5
              rounded-full
              bg-[#6B4AA6]
              hover:bg-[#53318C]
              text-white
              font-semibold
              text-sm
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isSaving
              ? '저장 중...'
              : isEdit
                ? '변경하기'
                : '시작하기'}
          </button>
        </form>
      </div>
    </div>
  );
}