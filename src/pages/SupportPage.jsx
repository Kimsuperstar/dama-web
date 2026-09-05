import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Mail, Send } from 'lucide-react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxwePNpwbeIO3fcNbSGRUhHPFZGCltlWHmVgna1nf60xYY9o5D7ocDlq040O9QG8YxTLA/exec';

export function SupportPage({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.append('name', form.name);
      params.append('message', form.message);
      params.append('email', form.email);
      params.append('title', form.title);

      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      }).catch((submitError) => {
        console.error('문의 전송 실패:', submitError);
      });

      setIsSubmitted(true);
      setForm({
        name: '',
        email: '',
        title: '',
        message: '',
      });
    } catch (submitError) {
      console.error('문의 전송 실패:', submitError);
      setError('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#3F315F]">
            고객센터
          </h1>
          <p className="text-xs sm:text-sm text-[#565B86] mt-2">
            담아를 사용하며 궁금한 점이나 피드백을 남겨주세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="support-name"
                className="block text-sm font-bold text-[#3F315F] mb-2"
              >
                이름
              </label>
              <input
                id="support-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
                className="w-full h-14 px-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder:text-[#8C7A9C]/70 focus:outline-none focus:border-[#6B4AA6] focus:ring-2 focus:ring-[#EADDFF] shadow-2xs"
              />
            </div>

            <div>
              <label
                htmlFor="support-email"
                className="block text-sm font-bold text-[#3F315F] mb-2"
              >
                이메일
              </label>
              <input
                id="support-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                required
                className="w-full h-14 px-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder:text-[#8C7A9C]/70 focus:outline-none focus:border-[#6B4AA6] focus:ring-2 focus:ring-[#EADDFF] shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="support-title"
              className="block text-sm font-bold text-[#3F315F] mb-2"
            >
              제목
            </label>
            <input
              id="support-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              required
              className="w-full h-14 px-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder:text-[#8C7A9C]/70 focus:outline-none focus:border-[#6B4AA6] focus:ring-2 focus:ring-[#EADDFF] shadow-2xs"
            />
          </div>

          <div>
            <label
              htmlFor="support-message"
              className="block text-sm font-bold text-[#3F315F] mb-2"
            >
              메시지
            </label>
            <textarea
              id="support-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="문의 내용을 입력하세요"
              required
              rows={9}
              className="w-full px-4 py-4 rounded-2xl bg-white border border-[#E8B7C8] text-sm text-[#3F315F] placeholder:text-[#8C7A9C]/70 focus:outline-none focus:border-[#6B4AA6] focus:ring-2 focus:ring-[#EADDFF] shadow-2xs resize-y min-h-[260px]"
            />
          </div>

          {isSubmitted && (
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF1C7]/60 border border-[#E8B7C8] px-4 py-3 text-sm font-bold text-[#3F315F]">
              <CheckCircle2 className="w-4 h-4 text-[#6B4AA6]" />
              <span>문의가 전송되었습니다.</span>
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-white border border-[#BA1A1A]/30 px-4 py-3 text-sm font-bold text-[#BA1A1A] text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-[#6B4AA6] to-[#53318C] disabled:from-[#CCC3D3] disabled:to-[#CCC3D3] text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 dama-button-shadow hover:brightness-105 active:scale-[0.99] transition-all disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                <span>보내는 중...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>메시지 보내기</span>
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
