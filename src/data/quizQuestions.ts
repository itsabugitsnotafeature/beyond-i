/**
 * quizQuestions.ts -- The 7 onboarding questions for the Beyond I quiz.
 * Answers are collected by useQuiz and passed to OpenAI in Phase 3 to
 * generate a personalized transformation path for the user.
 */
import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Right now, how would you describe your inner state?',
    options: [
      { id: 'q1a', text: 'Anxious and restless' },
      { id: 'q1b', text: 'Numb and disconnected' },
      { id: 'q1c', text: 'Heavy but searching' },
      { id: 'q1d', text: 'Calm but curious' },
    ],
  },
  {
    id: 'q2',
    question: 'What are you most hoping to find?',
    options: [
      { id: 'q2a', text: 'Peace and stillness' },
      { id: 'q2b', text: 'Clarity and direction' },
      { id: 'q2c', text: 'Healing and release' },
      { id: 'q2d', text: 'Joy and aliveness' },
    ],
  },
  {
    id: 'q3',
    question: 'How do you usually process what\'s happening inside you?',
    options: [
      { id: 'q3a', text: 'I sit with it quietly' },
      { id: 'q3b', text: 'I need to talk it through' },
      { id: 'q3c', text: 'I move my body' },
      { id: 'q3d', text: 'I journal or create' },
    ],
  },
  {
    id: 'q4',
    question: 'What resonates with you most?',
    options: [
      { id: 'q4a', text: 'Science and psychology' },
      { id: 'q4b', text: 'Ancient wisdom and spirituality' },
      { id: 'q4c', text: 'Nature and the body' },
      { id: 'q4d', text: 'A blend of everything' },
    ],
  },
  {
    id: 'q5',
    question: 'How much time can you realistically give to yourself each day?',
    options: [
      { id: 'q5a', text: 'Just a few minutes' },
      { id: 'q5b', text: 'About 15 to 30 minutes' },
      { id: 'q5c', text: 'An hour or more' },
      { id: 'q5d', text: 'It varies day to day' },
    ],
  },
  {
    id: 'q6',
    question: 'What feels most like home to you?',
    options: [
      { id: 'q6a', text: 'Solitude and stillness' },
      { id: 'q6b', text: 'A gentle guided practice' },
      { id: 'q6c', text: 'Being in nature' },
      { id: 'q6d', text: 'Creative expression' },
    ],
  },
  {
    id: 'q7',
    question: 'What is the one thing you most want to change?',
    options: [
      { id: 'q7a', text: 'My relationship with myself' },
      { id: 'q7b', text: 'My relationship with others' },
      { id: 'q7c', text: 'How I handle stress' },
      { id: 'q7d', text: 'How I feel in my body' },
    ],
  },
];
