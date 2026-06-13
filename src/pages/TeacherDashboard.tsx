import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useRoom } from '../hooks/useRoom';

export default function TeacherDashboard() {
  const { createRoom } = useRoom();
  const [currentPin, setCurrentPin] = useState<string | null>(null);

  const handleCreateRoom = async () => {
    const room = await createRoom();
    setCurrentPin(room.pin);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">교사용 대시보드</h1>
          <Button variant="ghost" onClick={() => window.location.href = '/'}>메인으로</Button>
        </div>

        {!currentPin ? (
          <Card className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold">새로운 퀴즈 방 만들기</h2>
            <p className="mb-8 text-slate-500">학생들이 접속할 수 있는 PIN 번호를 생성합니다.</p>
            <Button size="lg" onClick={handleCreateRoom}>방 생성하기</Button>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8 text-center">
              <h2 className="mb-2 text-lg font-medium text-slate-500">접속 PIN 번호</h2>
              <div className="text-6xl font-black tracking-[0.2em] text-blue-600">{currentPin}</div>
            </Card>
            
            <Card className="p-8">
              <h2 className="mb-4 text-xl font-semibold">컨트롤 패널</h2>
              <div className="flex flex-col gap-4">
                <Button variant="success">퀴즈 시작하기</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
