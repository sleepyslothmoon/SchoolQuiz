import { useState, useEffect } from 'react';

export function useStudentSession() {
  const [studentId, setStudentId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem('quiz_student_id');
    if (!id) {
      id = 'student_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem('quiz_student_id', id);
    }
    setStudentId(id);
  }, []);

  const getSelectedAnimal = (roomId: string) => {
    const selections = JSON.parse(localStorage.getItem('quiz_animal_selections') || '{}');
    return selections[roomId] as string | undefined;
  };

  const saveSelectedAnimal = (roomId: string, animalId: string) => {
    const selections = JSON.parse(localStorage.getItem('quiz_animal_selections') || '{}');
    selections[roomId] = animalId;
    localStorage.setItem('quiz_animal_selections', JSON.stringify(selections));
  };

  return { studentId, getSelectedAnimal, saveSelectedAnimal };
}
