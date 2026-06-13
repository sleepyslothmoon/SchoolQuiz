import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useRoom } from '../hooks/useRoom';
import { useAnimals } from '../hooks/useAnimals';
import { DUMMY_QUIZ } from '../lib/dummyQuiz';

export default function TeacherRoom() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { room, loading, updateRoomStatus } = useRoom(pin);
  const { animals } = useAnimals(room?.id);

  if (loading) return <div className="p-8 text-center">로딩중...</div>;
  if (!room) return <div className="p-8 text-center">방을 찾을 수 없습니다.</div>;

  const joinedStudents = animals.filter(a => a.isTaken);
  const currentQ = DUMMY_QUIZ.questions[room.currentQuestion];

  const handleNext = () => {
    if (room.status === 'LOBBY' || room.status === 'RESULT') {
      if (room.currentQuestion >= DUMMY_QUIZ.questions.length && room.status === 'RESULT') {
        updateRoomStatus(room.id!, 'FINAL');
        return;
      }
      
      const nextQ = room.status === 'RESULT' ? room.currentQuestion + 1 : 0;
      if (nextQ >= DUMMY_QUIZ.questions.length) {
        updateRoomStatus(room.id!, 'FINAL');
      } else {
        updateRoomStatus(room.id!, 'QUESTION', nextQ);
      }
    } else if (room.status === 'QUESTION') {
      updateRoomStatus(room.id!, 'RESULT');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">교사 컨트롤 패널</h1>
            <p className="text-slate-500">PIN: {room.pin}</p>
          </div>
          <Button variant="danger" onClick={() => navigate('/teacher')}>방 종료</Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
              {room.status === 'LOBBY' && (
                <>
                  <div className="text-8xl font-black tracking-widest text-blue-600 mb-8">{room.pin}</div>
                  <h2 className="text-2xl font-bold mb-4">학생들이 접속하길 기다리고 있습니다...</h2>
                  <p className="text-xl text-slate-500 mb-8">현재 접속 인원: {joinedStudents.length}명</p>
                  <Button size="xl" onClick={handleNext} disabled={joinedStudents.length === 0}>
                    퀴즈 시작하기
                  </Button>
                </>
              )}

              {room.status === 'QUESTION' && currentQ && (
                <>
                  <h2 className="text-4xl font-bold mb-8">문제 {room.currentQuestion + 1}. {currentQ.text}</h2>
                  <p className="text-2xl text-slate-500 mb-8">학생들이 문제를 풀고 있습니다...</p>
                  <Button size="lg" variant="success" onClick={handleNext}>
                    정답 확인하기 (시간 종료)
                  </Button>
                </>
              )}

              {room.status === 'RESULT' && currentQ && (
                <>
                  <h2 className="text-3xl font-bold mb-4">문제 {room.currentQuestion + 1} 결과</h2>
                  <div className="text-5xl font-black text-green-500 mb-8">
                    정답: {currentQ.options[currentQ.answer]}
                  </div>
                  <Button size="lg" onClick={handleNext}>
                    {room.currentQuestion + 1 >= DUMMY_QUIZ.questions.length ? '최종 결과 보기' : '다음 문제로'}
                  </Button>
                </>
              )}

              {room.status === 'FINAL' && (
                <>
                  <h2 className="text-4xl font-bold mb-8">모든 퀴즈가 종료되었습니다!</h2>
                  <Button size="lg" onClick={() => navigate(`/room/${room.pin}/leaderboard`)}>
                    시상대 화면 열기
                  </Button>
                </>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6 h-full">
              <h3 className="text-xl font-bold mb-4">참여중인 학생 ({joinedStudents.length})</h3>
              <div className="grid grid-cols-4 gap-2">
                {joinedStudents.map(student => {
                  const emojiIndex = parseInt(student.iconId.split('_')[1], 10);
                  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪'];
                  return (
                    <div key={student.id} className="text-3xl text-center bg-slate-100 p-2 rounded-lg" title={`Score: ${student.score}`}>
                      {emojis[emojiIndex]}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
