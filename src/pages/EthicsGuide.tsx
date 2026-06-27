import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// 💡 윤리 가이드 데이터 (마치 책의 목차처럼 쫘악 정리해둔 겁니다요!)
const ethicsGuides = [
  {
    id: 1,
    title: '활용 목적',
    description: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.",
    tags: ['주도성', '합목적성']
  },
  {
    id: 2,
    title: '주도적 학습',
    description: '생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.',
    tags: ['주도성']
  },
  {
    id: 3,
    title: '비판적 검증',
    description: '생성형 AI가 틀릴 수 있다는 점을 알아요.',
    tags: ['주도성']
  },
  {
    id: 4,
    title: '사고의 확장',
    description: '생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.',
    tags: ['주도성', '합목적성']
  },
  {
    id: 5,
    title: '안전과 관계',
    description: '나의 정보와 비밀을 말하지 않아요.',
    tags: ['안전성']
  },
  {
    id: 6,
    title: '투명성·윤리',
    description: '생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.',
    tags: ['투명성']
  }
];

export default function EthicsGuide() {
  // 💡 체크박스 상태 (이름표 붙인 상자! 초기값은 false, 즉 '동의 안함' 상태입니다)
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  // 💡 시작하기 버튼 누르면 '/home' 으로 이동하는 함수 (순간이동 포탈 역할!)
  const handleStart = () => {
    if (isAgreed) {
      navigate('/home');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border-[var(--color-chrome-indigo)] p-6 md:p-8">
        
        {/* 제목 영역 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold nintendo-title text-[var(--color-carbon)]">
            생성형 AI 윤리 핵심 가이드
          </h1>
          <p className="text-sm mt-2 text-[var(--color-ink-soft)]">
            안전하고 올바른 AI 사용을 위해 꼭 읽어주세요!
          </p>
        </div>

        {/* 가이드 목록 영역 (반복문으로 붕어빵 찍어내듯 카드 생성!) */}
        <div className="flex flex-col gap-4 mb-8">
          {ethicsGuides.map((guide) => (
            <div key={guide.id} className="p-4 rounded-lg bg-[var(--color-platinum)] border border-[var(--color-chrome-indigo)] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-lg text-[var(--color-signal)]">가이드 {guide.id}</span>
                <span className="font-bold text-[var(--color-carbon)]">{guide.title}</span>
              </div>
              <p className="text-[var(--color-ink)]">{guide.description}</p>
              <div className="flex gap-2 mt-2">
                {guide.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-bold bg-white px-2 py-1 rounded border border-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 동의 체크박스 및 버튼 영역 */}
        <div className="flex flex-col items-center gap-4 bg-[var(--color-lavender)] p-4 rounded-lg border border-[var(--color-chrome-indigo)]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-5 h-5 accent-[var(--color-signal)]"
            />
            <span className="font-bold text-[var(--color-carbon)]">
              위 윤리 가이드를 빠짐없이 읽었으며, 이를 지킬 것을 약속합니다.
            </span>
          </label>

          <Button 
            size="lg" 
            onClick={handleStart} 
            disabled={!isAgreed} 
            className="w-full max-w-sm"
          >
            시작하기
          </Button>
        </div>

      </Card>
    </div>
  );
}
