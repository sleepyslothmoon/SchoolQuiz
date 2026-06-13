import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function Home() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      navigate(`/room/${pin}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="mb-8 text-4xl font-extrabold text-blue-500">동물 퀴즈 대회! 🦁</h1>
        
        <form onSubmit={handleJoin} className="flex flex-col gap-4">
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="PIN 번호 6자리 입력"
            className="h-16 rounded-2xl border-4 border-blue-100 bg-blue-50 px-6 text-center text-2xl font-bold tracking-[0.25em] text-blue-900 outline-none transition-colors focus:border-blue-400 focus:bg-white"
          />
          <Button size="lg" type="submit" disabled={pin.length !== 6}>
            입장하기
          </Button>
        </form>

        <div className="mt-12 text-sm text-slate-400">
          <button 
            onClick={() => navigate('/teacher')}
            className="hover:text-slate-600 underline"
          >
            선생님이신가요? 교사용 화면으로 가기
          </button>
        </div>
      </Card>
    </div>
  );
}
