import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useRoom } from '../hooks/useRoom';

export default function TeacherDashboard() {
  const { createRoom } = useRoom();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    try {
      setIsCreating(true);
      const newRoom = await createRoom();
      navigate(`/teacher/room/${newRoom.pin}`);
    } catch (error) {
      console.error("방 생성 중 오류 발생:", error);
      alert("방 생성에 실패했습니다. Firebase 설정이나 Firestore 규칙(Rules)을 확인해 주세요.\n상세 에러: " + (error as Error).message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">교사용 대시보드</h1>
          <Button variant="ghost" onClick={() => navigate('/')}>메인으로</Button>
        </div>

        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold">새로운 퀴즈 방 만들기</h2>
          <p className="mb-8 text-slate-500">학생들이 접속할 수 있는 PIN 번호를 생성합니다.</p>
          <Button size="lg" onClick={handleCreateRoom} disabled={isCreating}>
            {isCreating ? "방 생성 중..." : "방 생성하기"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
