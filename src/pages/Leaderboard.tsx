import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { useAnimals } from '../hooks/useAnimals';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { room, loading } = useRoom(pin);
  const { animals } = useAnimals(room?.id);

  if (loading || !room) return <div className="p-8 text-center">로딩중...</div>;

  const sortedAnimals = [...animals]
    .filter(a => a.isTaken)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪'];

  const getMedalColor = (index: number) => {
    if (index === 0) return 'bg-yellow-400 text-yellow-900 border-yellow-500'; // Gold
    if (index === 1) return 'bg-slate-300 text-slate-800 border-slate-400'; // Silver
    if (index === 2) return 'bg-amber-600 text-amber-100 border-amber-700'; // Bronze
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getPodiumHeight = (index: number) => {
    if (index === 0) return 'h-48 md:h-64';
    if (index === 1) return 'h-32 md:h-48';
    if (index === 2) return 'h-24 md:h-32';
    return 'h-16 md:h-24';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-indigo-50">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-black text-indigo-600 mb-12 drop-shadow-sm">
          🏆 최종 순위 발표 🏆
        </h1>

        <div className="flex items-end justify-center gap-2 md:gap-4 h-[60vh]">
          {sortedAnimals.map((animal, index) => {
            const emojiIndex = parseInt(animal.iconId.split('_')[1], 10);
            return (
              <motion.div 
                key={animal.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center justify-end w-24 md:w-32"
              >
                <div className="text-4xl md:text-6xl mb-4 animate-bounce">
                  {emojis[emojiIndex]}
                </div>
                <div className="text-xl font-bold mb-2">
                  {animal.score}점
                </div>
                <div className={`w-full rounded-t-lg border-t-4 border-l-4 border-r-4 shadow-lg flex items-start justify-center pt-4 text-2xl font-black ${getMedalColor(index)} ${getPodiumHeight(index)}`}>
                  {index + 1}등
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <button onClick={() => navigate('/')} className="text-indigo-500 font-bold underline text-xl">
            처음으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
