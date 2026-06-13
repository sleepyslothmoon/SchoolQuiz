import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoom } from '../hooks/useRoom';
import { useAnimals } from '../hooks/useAnimals';
import { useStudentSession } from '../hooks/useStudentSession';
import { DUMMY_QUIZ } from '../lib/dummyQuiz';
import { Card } from '../components/ui/Card';

export default function QuizView() {
  const { pin } = useParams();
  const navigate = useNavigate();
  const { room, loading } = useRoom(pin);
  const { getSelectedAnimal } = useStudentSession();
  const { submitScore } = useAnimals(room?.id);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (room?.status === 'FINAL') {
      navigate(`/room/${pin}/leaderboard`);
    }
  }, [room?.status, navigate, pin]);

  // Reset selected option when question changes
  useEffect(() => {
    if (room?.status === 'QUESTION') {
      setSelectedOption(null);
    }
  }, [room?.currentQuestion, room?.status]);

  if (loading || !room) return <div className="p-8 text-center">로딩중...</div>;

  const currentQ = DUMMY_QUIZ.questions[room.currentQuestion];
  const animalId = getSelectedAnimal(room.id!);

  if (!animalId) {
    navigate(`/room/${pin}`);
    return null;
  }

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || room.status !== 'QUESTION') return;
    setSelectedOption(index);
    
    // If correct, submit score (100 points)
    if (index === currentQ.answer) {
      submitScore(room.id!, animalId, 100);
    }
  };

  const isResult = room.status === 'RESULT';
  const isCorrect = selectedOption === currentQ.answer;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-blue-50">
      <div className="mx-auto max-w-4xl">
        <Card className="p-6 md:p-12 min-h-[60vh] flex flex-col relative overflow-hidden">
          
          <div className="mb-8 text-center">
            <h2 className="text-xl text-blue-500 font-bold mb-2">문제 {room.currentQuestion + 1}</h2>
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 break-keep leading-tight">
              {currentQ.text}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = isResult && index === currentQ.answer;
              
              let bgColor = 'bg-white hover:bg-blue-50';
              if (isSelected) bgColor = 'bg-blue-100 border-blue-500 border-4';
              if (isResult) {
                if (isCorrectOption) bgColor = 'bg-green-200 border-green-500 border-4';
                else if (isSelected) bgColor = 'bg-red-200 border-red-500 border-4 opacity-50';
                else bgColor = 'bg-slate-100 opacity-50';
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!isSelected && !isResult ? { scale: 1.02 } : {}}
                  whileTap={!isSelected && !isResult ? { scale: 0.98 } : {}}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedOption !== null || isResult}
                  className={`flex items-center justify-center rounded-3xl p-6 text-2xl md:text-4xl font-bold shadow-md transition-all ${bgColor}`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {isResult && selectedOption !== null && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10"
              >
                {isCorrect ? (
                  <div className="text-center">
                    <div className="text-[15rem] font-black text-green-500 leading-none">O</div>
                    <div className="text-4xl font-bold text-green-600 mt-4">정답이에요! +100점</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-[15rem] font-black text-red-500 leading-none">X</div>
                    <div className="text-4xl font-bold text-red-600 mt-4">틀렸어요...</div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
        </Card>
      </div>
    </div>
  );
}
