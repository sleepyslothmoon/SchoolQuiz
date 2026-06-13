import { useParams, useNavigate } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';
import { useAnimals } from '../hooks/useAnimals';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { room, loading } = useRoom(pin);
  const { animals } = useAnimals(room?.id);

  if (loading || !room) return <div className="p-8 text-center font-pixel text-[var(--color-ink-soft)] uppercase text-2xl">Loading...</div>;

  const sortedAnimals = [...animals]
    .filter(a => a.isTaken)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪'];

  const getMedalColor = (index: number) => {
    if (index === 0) return 'bg-[var(--color-nav-gold)] text-white border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]'; // Gold
    if (index === 1) return 'bg-[var(--color-platinum)] text-[var(--color-carbon)] border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]'; // Silver
    if (index === 2) return 'bg-[var(--color-amber)] text-[var(--color-carbon)] border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]'; // Bronze
    return 'bg-[var(--color-canvas)] text-white border-[var(--color-chrome-indigo)] shadow-[var(--shadow-bevel)]';
  };

  const getPodiumHeight = (index: number) => {
    if (index === 0) return 'h-48 md:h-64';
    if (index === 1) return 'h-32 md:h-48';
    if (index === 2) return 'h-24 md:h-32';
    return 'h-16 md:h-24';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[var(--color-canvas)]">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl mb-12 nintendo-title">
          🏆 최종 순위 발표 🏆
        </h1>

        <div className="flex items-end justify-center gap-2 md:gap-4 h-[60vh] border-b-2 border-[var(--color-chrome-indigo)] pb-0">
          {sortedAnimals.map((animal, index) => {
            const emojiIndex = parseInt(animal.iconId.split('_')[1], 10);
            return (
              <motion.div 
                key={animal.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center justify-end w-20 md:w-32"
              >
                <div className="text-4xl md:text-6xl mb-4 animate-bounce filter drop-shadow-md">
                  {emojis[emojiIndex]}
                </div>
                <div className="text-[12px] md:text-lg font-bold mb-2 text-[var(--color-ink)] bg-white px-2 py-1 rounded-[2px] border border-[var(--color-chrome-indigo)]">
                  {animal.score}점
                </div>
                <div className={`w-full border-t border-l border-r flex items-start justify-center pt-4 text-xl md:text-2xl font-black ${getMedalColor(index)} ${getPodiumHeight(index)}`}>
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-[var(--color-carbon)] p-4 border border-black inline-block">
          <button onClick={() => navigate('/')} className="text-[var(--color-canvas-soft)] font-bold text-[12px] uppercase tracking-wider hover:text-white transition-colors">
            &lt; GO BACK TO START
          </button>
        </div>
      </div>
    </div>
  );
}
