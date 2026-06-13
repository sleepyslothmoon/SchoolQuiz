export type RoomStatus = 'LOBBY' | 'QUESTION' | 'RESULT' | 'FINAL';

export interface Room {
  id?: string;
  pin: string;
  status: RoomStatus;
  currentQuestion: number;
  createdAt: number;
}

export interface Animal {
  id?: string;
  iconId: string;
  isTaken: boolean;
  studentId: string;
  score: number;
}

export interface Question {
  text: string;
  options: string[];
  answer: number; // index of options
  limitTime: number; // in seconds
}

export interface Quiz {
  id?: string;
  title: string;
  questions: Question[];
}
