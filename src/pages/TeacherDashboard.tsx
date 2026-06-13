import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useRoom } from '../hooks/useRoom';

export default function TeacherDashboard() {
  const { createRoom } = useRoom();
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const newRoom = await createRoom();
    navigate(`/teacher/room/${newRoom.pin}`);
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
          <Button size="lg" onClick={handleCreateRoom}>방 생성하기</Button>
        </Card>
      </div>
    </div>
  );
}
