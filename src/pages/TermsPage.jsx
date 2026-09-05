import { ArrowLeft, FileText } from 'lucide-react';

const sections = [
  {
    title: '제1조 목적',
    body: '이 약관은 담아가 제공하는 보름달 메시지 서비스의 이용 조건, 절차, 권리와 의무, 책임 사항을 정하기 위한 문서입니다.',
  },
  {
    title: '제2조 서비스 내용',
    body: '담아는 사용자가 카카오 또는 네이버 계정으로 로그인하여 자신의 보름달을 만들고, 공유 링크를 통해 지인이 말씀과 메시지를 남길 수 있도록 돕는 서비스입니다.',
  },
  {
    title: '제3조 회원가입 및 로그인',
    body: '사용자는 카카오 또는 네이버 OAuth 로그인을 통해 서비스를 이용할 수 있습니다. 담아는 소셜 로그인 제공자로부터 전달받은 식별 정보를 기준으로 사용자를 구분합니다.',
  },
  {
    title: '제4조 사용자 콘텐츠',
    body: '사용자는 닉네임, 보름달 이름, 말씀, 개인 메시지, 작성자 이름 등을 직접 입력할 수 있습니다. 사용자는 자신이 입력한 내용에 책임을 지며, 타인의 권리 침해, 비방, 혐오, 불법 정보, 과도한 개인정보 입력을 해서는 안 됩니다.',
  },
  {
    title: '제5조 공유 링크 이용',
    body: '보름달 공유 링크를 받은 사람은 로그인 없이 메시지를 남길 수 있습니다. 링크를 누구에게 공유할지는 사용자가 직접 관리해야 하며, 공개된 링크를 통해 제3자가 접근할 수 있음을 유의해야 합니다.',
  },
  {
    title: '제6조 메시지 공개 시점',
    body: '친구들이 남긴 말씀과 메시지는 2026년 9월 25일 00:00 이후 보름달 소유자에게 공개됩니다. 공개 전에는 서비스 화면에서 잠금 처리될 수 있습니다.',
  },
  {
    title: '제7조 관리자 기능',
    body: '관리자는 서비스 품질 확인, 오류 점검, 운영 테스트를 위해 관리자 전용 미리보기 기능을 사용할 수 있습니다. 관리 기능은 운영 목적 범위 안에서만 사용됩니다.',
  },
  {
    title: '제8조 이용 제한',
    body: '담아는 부적절한 콘텐츠, 서비스 악용, 타인 권리 침해, 시스템 안정성을 해치는 행위가 확인될 경우 게시물 삭제, 접근 제한 등 필요한 조치를 할 수 있습니다.',
  },
  {
    title: '제9조 서비스 변경 및 중단',
    body: '담아는 서비스 개선, 점검, 장애 대응, 외부 서비스 장애 등 필요한 경우 서비스의 전부 또는 일부를 변경하거나 일시 중단할 수 있습니다.',
  },
  {
    title: '제10조 면책',
    body: '담아는 카카오, 네이버, Google Apps Script, Google Sheets, Gmail 등 외부 서비스의 장애나 지연으로 발생한 문제에 대해 담아의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.',
  },
  {
    title: '제11조 문의',
    body: '서비스 이용 중 문의가 필요한 경우 고객센터 페이지를 통해 문의할 수 있습니다.',
  },
];

export function TermsPage({ onBack }) {
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
            <FileText className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-[#6B4AA6] mb-1">Dama Terms</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3F315F]">
            이용약관
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
