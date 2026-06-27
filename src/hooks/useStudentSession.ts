import { useState, useEffect } from 'react';

export function useStudentSession() {
  const [studentId, setStudentId] = useState<string>('');

  useEffect(() => {
    let id = sessionStorage.getItem('quiz_student_id');
    if (!id) {
      id = 'student_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      sessionStorage.setItem('quiz_student_id', id);
    }
    setStudentId(id);
  }, []);

  const getSelectedAnimal = (roomId: string) => {
    const selections = JSON.parse(sessionStorage.getItem('quiz_animal_selections') || '{}');
    return selections[roomId] as string | undefined;
  };

  const saveSelectedAnimal = (roomId: string, animalId: string) => {
    const selections = JSON.parse(sessionStorage.getItem('quiz_animal_selections') || '{}');
    selections[roomId] = animalId;
    sessionStorage.setItem('quiz_animal_selections', JSON.stringify(selections));
  };

  return { studentId, getSelectedAnimal, saveSelectedAnimal };
}
