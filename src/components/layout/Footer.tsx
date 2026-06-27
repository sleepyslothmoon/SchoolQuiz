import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Modal } from '../ui/Modal';

// Vite의 ?raw 쿼리를 사용하면 마크다운 파일 내용을 문자열로 그대로 가져올 수 있습니다!
import privacyPolicyMd from '../../../privacy_policy.md?raw';
import termsOfServiceMd from '../../../terms_of_service.md?raw';

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      {/* 💡 푸터 본체 */}
      <footer className="w-full py-4 px-6 text-center text-xs text-[var(--color-ink-soft)] bg-[var(--color-canvas)] border-t border-[var(--color-chrome-indigo)] mt-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <button 
            onClick={() => setIsTermsOpen(true)}
            className="hover:text-[var(--color-signal)] underline transition-colors"
          >
            이용약관
          </button>
          <span>|</span>
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-[var(--color-signal)] underline transition-colors font-bold"
          >
            개인정보처리방침
          </button>
        </div>
        <div>
          © 2026 동물 퀴즈 대회(School Quiz). All rights reserved. | 개인정보보호책임자: School Quiz 개발팀
        </div>
      </footer>

      {/* 💡 이용약관 모달 */}
      <Modal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
        title="이용약관"
      >
        <div className="prose prose-sm max-w-none text-[var(--color-ink)]">
          <ReactMarkdown>{termsOfServiceMd}</ReactMarkdown>
        </div>
      </Modal>

      {/* 💡 개인정보처리방침 모달 */}
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="개인정보처리방침"
      >
        <div className="prose prose-sm max-w-none text-[var(--color-ink)]">
          <ReactMarkdown>{privacyPolicyMd}</ReactMarkdown>
        </div>
      </Modal>
    </>
  );
}
