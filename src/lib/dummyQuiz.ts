import type { Quiz } from '../types';

export const DUMMY_QUIZ: Quiz = {
  id: 'nonsense-101',
  title: '초등 넌센스 퀴즈 대회!',
  questions: [
    {
      text: '세상에서 가장 뜨거운 과일은?',
      options: ['천도복숭아', '파인애플', '사과', '바나나'],
      answer: 0,
      limitTime: 15
    },
    {
      text: '왕이 넘어지면 뭐가 될까?',
      options: ['킹콩', '아얏', '통키', '킹덤'],
      answer: 0,
      limitTime: 15
    },
    {
      text: '오리가 얼면 어떻게 될까?',
      options: ['냉동오리', '언덕', '백조', '얼음'],
      answer: 1,
      limitTime: 15
    },
    {
      text: '소가 웃는 소리를 세 글자로 하면?',
      options: ['음하하', '소웃음', '우하하', '카우보이'],
      answer: 2,
      limitTime: 15
    },
    {
      text: '세상에서 가장 추운 바다는?',
      options: ['북극해', '썰렁해', '남극해', '동해'],
      answer: 1,
      limitTime: 15
    },
    {
      text: '바나나가 웃으면?',
      options: ['바나나킥', '빙그레', '바나나우유', '노랑'],
      answer: 1,
      limitTime: 15
    },
    {
      text: '참기름이 법원에 간 이유는?',
      options: ['재판받으러', '판사만나러', '고소해서', '기름짜러'],
      answer: 2,
      limitTime: 15
    },
    {
      text: '신발이 화가 나면?',
      options: ['신발끈', '화난신발', '신발장', '신발끈풀림'],
      answer: 0,
      limitTime: 15
    },
    {
      text: '얼음이 죽으면?',
      options: ['물', '다이빙', '녹음', '얼음땡'],
      answer: 1,
      limitTime: 15
    },
    {
      text: '세상에서 가장 아름다운 개는?',
      options: ['무지개', '시바견', '푸들', '말티즈'],
      answer: 0,
      limitTime: 15
    }
  ]
};
