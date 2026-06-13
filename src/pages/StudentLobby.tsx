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

  const selectedAnimalId = room?.id ? getSelectedAnimal(room.id) : undefined;

  useEffect(() => {
    // If room status changes to QUESTION, navigate to quiz view
    if (room && room.status === 'QUESTION' && selectedAnimalId) {
      navigate(`/room/${pin || ''}/quiz`);
    }
  }, [room, selectedAnimalId, navigate, pin]);

  if (roomLoading || !studentId) {
    return <div className="flex min-h-screen items-center justify-center text-2xl font-bold font-pixel text-[var(--color-ink-soft)] uppercase">Loading...</div>;
  }

  if (!room) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-3xl font-bold text-[var(--color-error)]">ROOM NOT FOUND</h1>
        <button onClick={() => navigate('/')} className="text-[var(--color-ink-soft)] underline uppercase font-bold text-xs">GO BACK</button>
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
      <div className="mx-auto max-w-5xl text-center flex flex-col items-center">
        {!selectedAnimalId ? (
          <Card className="w-full bg-[var(--color-periwinkle)] p-6">
            <h1 className="mb-2 text-3xl nintendo-title tracking-tight text-white">내 동물을 골라주세요!</h1>
            <p className="mb-8 text-[12px] font-bold text-[var(--color-ink)] uppercase">원하는 동물을 터치하세요. 한 번 고르면 바꿀 수 없어요.</p>
            
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-10 md:gap-4 bg-[var(--color-platinum)] p-6 rounded-[6px] border border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]">
              {EMOJIS.map((emoji, index) => {
                const animalId = `emoji_${index}`;
                const takenData = animals.find(a => a.iconId === animalId);
                const isTaken = takenData?.isTaken;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={!isTaken && !selecting ? { scale: 1.05 } : {}}
                    whileTap={!isTaken && !selecting ? { scale: 0.95 } : {}}
                    onClick={() => handleSelect(emoji)}
                    disabled={isTaken || selecting}
                    className={`
                      flex aspect-square items-center justify-center rounded-[2px] text-4xl border border-[var(--color-chrome-indigo)] transition-all
                      ${isTaken 
                        ? 'bg-[var(--color-muted-indigo)] opacity-50 grayscale cursor-not-allowed shadow-[var(--shadow-bevel-pressed)]' 
                        : 'bg-[var(--color-surface)] shadow-[var(--shadow-bevel)] hover:bg-[var(--color-sky)] cursor-pointer'}
                    `}
                  >
                    {emoji}
                  </motion.button>
                );
              })}
            </div>
          </Card>
        ) : (
          <div className="flex h-[80vh] flex-col items-center justify-center w-full max-w-md">
            <Card className="flex flex-col items-center w-full p-0 bg-[var(--color-platinum)] overflow-hidden">
              <div className="bg-[var(--color-canvas)] text-white text-[11px] font-bold py-2 px-4 text-center uppercase w-full border-b border-[var(--color-chrome-indigo)] shadow-sm">
                ≡ STATUS: READY
              </div>
              <div className="p-12 flex flex-col items-center">
                <h2 className="mb-8 text-2xl font-bold text-[var(--color-ink)] uppercase">준비 완료!</h2>
                <div className="mb-8 text-[8rem] filter drop-shadow-md">
                  {EMOJIS[parseInt(selectedAnimalId.split('_')[1], 10)]}
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-chrome-indigo)] px-4 py-2 rounded-[2px] text-[11px] font-bold text-[var(--color-ink)] animate-pulse uppercase shadow-[var(--shadow-bevel)]">
                  WAITING FOR TEACHER...
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
