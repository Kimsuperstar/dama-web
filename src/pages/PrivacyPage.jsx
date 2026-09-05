import { ArrowLeft, ShieldCheck } from 'lucide-react';

const sections = [
  {
    title: '1. 수집하는 개인정보',
    body: '담아는 서비스 제공을 위해 소셜 로그인 제공자, 제공자별 사용자 식별값, 닉네임, 보름달 소유자 이름, 친구가 남긴 작성자 이름, 익명 여부, 말씀, 개인 메시지, 고객센터 문의 이름, 이메일, 제목, 문의 내용을 처리할 수 있습니다.',
  },
  {
    title: '2. 자동 수집 정보와 쿠키',
    body: '담아는 로그인 상태 유지와 인증 처리를 위해 Spring Security 기반 세션 쿠키를 사용할 수 있습니다. 쿠키는 사용자를 인증하고 서비스 접근 권한을 확인하는 목적으로 사용됩니다.',
  },
  {
    title: '3. 개인정보 이용 목적',
    body: '수집한 정보는 로그인 및 사용자 식별, 내 보름달 생성과 조회, 공유 링크 제공, 말씀과 메시지 저장 및 공개, 고객 문의 접수와 답변, 서비스 오류 확인과 운영 관리에 사용됩니다.',
  },
  {
    title: '4. 메시지 공개 정책',
    body: '친구가 남긴 말씀과 메시지는 2026년 9월 25일 00:00 전까지 화면상 잠금 처리될 수 있으며, 해당 시점 이후 보름달 소유자에게 공개됩니다.',
  },
  {
    title: '5. 보관 기간',
    body: '회원 정보, 보름달 정보, 메시지 정보는 서비스 제공 기간 동안 보관됩니다. 고객센터 문의는 문의 처리와 분쟁 대응을 위해 처리 완료 후 3년까지 보관할 수 있습니다. 사용자가 삭제를 요청하면 법령상 보관 의무가 없는 한 지체 없이 삭제합니다.',
  },
  {
    title: '6. 제3자 제공',
    body: '담아는 사용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만 법령에 따른 요청이 있거나 사용자의 동의가 있는 경우에는 예외로 합니다.',
  },
  {
    title: '7. 외부 서비스 이용',
    body: '담아는 카카오와 네이버 OAuth를 로그인 인증에 사용하며, 고객센터 문의 저장과 메일 발송을 위해 Google Apps Script, Google Sheets, Gmail을 사용할 수 있습니다.',
  },
  {
    title: '8. 이용자의 권리',
    body: '사용자는 자신의 개인정보에 대해 조회, 수정, 삭제, 처리 정지를 요청할 수 있습니다. 관련 요청은 고객센터를 통해 접수할 수 있습니다.',
  },
  {
    title: '9. 보호 조치',
    body: '담아는 세션 기반 인증, 관리자 권한 제한, 접근 제어, 데이터베이스 저장 관리 등 서비스 특성에 맞는 보호 조치를 적용합니다.',
  },
  {
    title: '10. 문의처',
    body: '개인정보와 관련한 문의는 고객센터 페이지를 통해 접수할 수 있습니다.',
  },
];

export function PrivacyPage({ onBack }) {
  return (
    <div className="w-full max-w-[760px] px-4 sm:px-6 pt-6 pb-16">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#565B86] bg-white/80 border border-[#E8B7C8]/70 hover:bg-[#FFF1C7]/50 hover:text-[#3F315F] transition-all shadow-2xs mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>돌아가기</span>
      </button>

      <section className="bg-white/90 border border-[#E8B7C8] rounded-[28px] p-5 sm:p-7 dama-card-shadow">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-full bg-[#FFF1C7] text-[#6B4AA6] mx-auto flex items-center justify-center mb-3 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-[#6B4AA6] mb-1">Dama Privacy</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3F315F]">
            개인정보처리방침
          </h1>
          <p className="text-xs sm:text-sm text-[#565B86] mt-2">
            시행일: 2026년 9월 5일
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="text-left">
              <h2 className="text-sm sm:text-base font-bold text-[#3F315F] mb-1.5">
                {section.title}
              </h2>
              <p className="text-sm text-[#565B86] leading-relaxed break-keep">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
