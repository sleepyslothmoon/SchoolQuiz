import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function Home() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  // 메인 화면에 올 때마다 이전 세션(학생 정보)을 초기화해서 다중 접속 테스트가 쉽도록 함
  useEffect(() => {
    sessionStorage.removeItem('quiz_student_id');
    sessionStorage.removeItem('quiz_animal_selections');
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      navigate(`/room/${pin}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* 닌텐도의 마스코트 버블 느낌 */}
      <div className="mb-4 bg-white rounded-[10px] px-4 py-2 border border-[var(--color-chrome-indigo)] shadow-sm self-center">
        <span className="font-pixel text-[13px] text-[var(--color-carbon)] font-bold">WELCOME TO ANIMAL QUIZ.COM!</span>
      </div>

      <Card className="w-full max-w-md bg-[var(--color-lavender)] border-[var(--color-chrome-indigo)]">
        <div className="p-8 text-center flex flex-col items-center">
          <h1 className="mb-8 text-4xl nintendo-title tracking-tight">동물 퀴즈 대회! 🦁</h1>
          
          <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full bg-[var(--color-platinum)] p-6 rounded-[6px] border border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]">
            <div className="bg-[var(--color-canvas)] text-white text-[11px] font-bold py-1 px-2 text-left uppercase w-full">
              ≡ JOIN ROOM
            </div>
            <input
              type="text"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="PIN 번호 6자리"
              className="nintendo-input h-10 px-4 text-center text-[15px] font-bold tracking-[0.25em] outline-none w-full"
            />
            <Button size="lg" type="submit" disabled={pin.length !== 6} className="w-full">
              입장하기
            </Button>
          </form>

          <div className="mt-8 text-xs text-[var(--color-ink-soft)] font-bold">
            <button 
              onClick={() => navigate('/teacher')}
              className="hover:text-[var(--color-signal)] underline uppercase"
            >
              TEACHER DASHBOARD
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
