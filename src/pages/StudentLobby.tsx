import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRoom } from '../hooks/useRoom';
import { useAnimals } from '../hooks/useAnimals';
import { useStudentSession } from '../hooks/useStudentSession';
import { Card } from '../components/ui/Card';

const EMOJIS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
  '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋',
  '🐌', '🐞', '🐜', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑',
  '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈',
  '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪'
];

export default function StudentLobby() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { room, loading: roomLoading } = useRoom(pin);
  const { studentId, getSelectedAnimal, saveSelectedAnimal } = useStudentSession();
  const { animals, selectAnimal } = useAnimals(room?.id);
  const [selecting, setSelecting] = useState(false);

  const selectedAnimalId = room ? getSelectedAnimal(room.id) : undefined;

  useEffect(() => {
    // If room status changes to QUESTION, navigate to quiz view
    if (room && room.status === 'QUESTION' && selectedAnimalId) {
      navigate(`/room/${pin}/quiz`);
    }
  }, [room, selectedAnimalId, navigate, pin]);

  if (roomLoading || !studentId) {
    return <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-slate-400">불러오는 중...</div>;
  }

  if (!room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-3xl font-bold text-red-500">방을 찾을 수 없습니다 😢</h1>
        <button onClick={() => navigate('/')} className="text-blue-500 underline">처음으로 돌아가기</button>
      </div>
    );
  }

  const handleSelect = async (emoji: string) => {
    if (selecting || selectedAnimalId) return;
    setSelecting(true);
    
    // Convert emoji string to a unique ID (e.g. index)
    const animalId = `emoji_${EMOJIS.indexOf(emoji)}`;
    
    const success = await selectAnimal(room.id!, animalId, studentId);
    if (success) {
      saveSelectedAnimal(room.id!, animalId);
    } else {
      alert('다른 친구가 이미 선택했어요! 다른 동물을 골라주세요.');
    }
    setSelecting(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-5xl text-center">
        {!selectedAnimalId ? (
          <>
            <h1 className="mb-2 text-4xl font-extrabold text-blue-600">내 동물을 골라주세요!</h1>
            <p className="mb-8 text-xl font-medium text-slate-500">원하는 동물을 터치하세요. 한 번 고르면 바꿀 수 없어요.</p>
            
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-10 md:gap-4">
              {EMOJIS.map((emoji, index) => {
                const animalId = `emoji_${index}`;
                const takenData = animals.find(a => a.iconId === animalId);
                const isTaken = takenData?.isTaken;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!isTaken && !selecting ? { scale: 1.1 } : {}}
                    whileTap={!isTaken && !selecting ? { scale: 0.9 } : {}}
                    onClick={() => handleSelect(emoji)}
                    disabled={isTaken || selecting}
                    className={`
                      flex aspect-square items-center justify-center rounded-2xl text-4xl transition-all
                      ${isTaken 
                        ? 'bg-slate-200 opacity-40 grayscale cursor-not-allowed' 
                        : 'bg-white shadow-md hover:shadow-xl hover:bg-blue-50 cursor-pointer'}
                    `}
                  >
                    {emoji}
                  </motion.button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex h-[80vh] flex-col items-center justify-center">
            <Card className="flex flex-col items-center p-12 text-center">
              <h2 className="mb-8 text-3xl font-bold text-slate-700">준비 완료!</h2>
              <div className="mb-8 text-8xl">
                {EMOJIS[parseInt(selectedAnimalId.split('_')[1], 10)]}
              </div>
              <p className="text-xl font-medium text-slate-500 animate-pulse">
                선생님이 퀴즈를 시작할 때까지 기다려주세요...
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
