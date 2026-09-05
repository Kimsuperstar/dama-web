import React from 'react';
import { motion } from 'motion/react';
import { X, Moon } from 'lucide-react';
import { DamaLogo } from './DamaLogo';

/**
 * 카카오 / 네이버 OAuth 로그인 모달
 */
export function LoginModal({
  isOpen,
  onClose,
  onOAuthLogin,
}) {
  if (!isOpen) return null;

  const handleKakaoLogin = () => {
    onOAuthLogin('kakao');
  };

  const handleNaverLogin = () => {
    onOAuthLogin('naver');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-[390px] bg-[#FFF8EE] rounded-[28px] border border-[#E8B7C8] shadow-2xl p-6 sm:p-7 relative overflow-hidden text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-[#565B86] hover:bg-[#FFF1C7] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="my-2 flex justify-center">
          <DamaLogo variant="primary" size="lg" />
        </div>

        <div className="mt-4 mb-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EADDFF] text-[#6B4AA6] text-xs font-bold mb-2">
            <Moon className="w-3.5 h-3.5 fill-[#6B4AA6]" />
            <span>내 보름달 만들기</span>
          </div>

          <h3 className="text-xl font-bold text-[#3F315F]">
            3초 만에 시작하기
          </h3>
        </div>

        <p className="text-xs sm:text-[13px] text-[#565B86] mb-6 leading-relaxed break-keep">
          간편 회원가입 후 나만의 보름달을 열고,
          <br />
          소중한 지인들의 축복과 말씀을 담아보세요.
        </p>

        <div className="space-y-3">

          {/* 카카오 */}
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="w-full h-12 bg-[#FEE500] hover:brightness-95 active:scale-[0.99] text-[#191919] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3C6.477 3 2 6.477 2 10.771c0 2.766 1.83 5.184 4.582 6.542l-.936 3.447c-.083.308.26.545.518.374l4.133-2.738c.553.076 1.121.116 1.703.116 5.523 0 10-3.477 10-7.771C22 6.477 17.523 3 12 3z"
                fill="#191919"
              />
            </svg>

            <span>카카오로 시작하기</span>
          </button>

          {/* 네이버 */}
          {/* <button
            type="button"
            onClick={handleNaverLogin}
            className="w-full h-12 bg-[#03C75A] hover:brightness-95 active:scale-[0.99] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.273 12.845L7.37 0H0v24h7.727V11.155L16.63 24H24V0h-7.727v12.845z"
                fill="#FFFFFF"
              />
            </svg>

            <span>네이버로 시작하기</span>
          </button> */}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8B7C8]/40">
          <p className="text-[11px] text-[#565B86]/80 leading-relaxed break-keep">
            * 보름달을 선물하고 말씀을 남기는 친구들은{' '}<br></br>
            <strong>회원가입 없이 누구나</strong> 바로 작성할 수 있습니다.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
